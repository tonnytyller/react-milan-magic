import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Story {
  id: string;
  user_id: string;
  media_url: string;
  media_type: string;
  expires_at: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

export const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load stories:', error);
    } else if (data) {
      // Fetch profiles separately
      const userIds = [...new Set(data.map(s => s.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      const storiesWithProfiles = data.map(story => ({
        ...story,
        profiles: profiles?.find(p => p.id === story.user_id) || { full_name: 'Unknown', avatar_url: '' }
      }));
      
      setStories(storiesWithProfiles as Story[]);
    }
  };

  const viewStory = async (story: Story) => {
    setSelectedStory(story);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase
        .from('story_views')
        .upsert({
          story_id: story.id,
          user_id: user.id,
        }, {
          onConflict: 'story_id,user_id',
        });
    }
  };

  if (stories.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => viewStory(story)}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-primary p-1">
              <div className="w-full h-full rounded-full bg-background p-1">
                <Avatar className="w-full h-full">
                  <img
                    src={story.profiles?.avatar_url || '/placeholder.svg'}
                    alt={story.profiles?.full_name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
              </div>
            </div>
            <p className="text-xs text-center mt-1 max-w-[80px] truncate">
              {story.profiles?.full_name}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-md p-0">
          {selectedStory && (
            <div className="relative">
              {selectedStory.media_type === 'video' ? (
                <video
                  src={selectedStory.media_url}
                  className="w-full max-h-[80vh] object-cover"
                  autoPlay
                  controls
                />
              ) : (
                <img
                  src={selectedStory.media_url}
                  alt="Story"
                  className="w-full max-h-[80vh] object-cover"
                />
              )}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <img
                    src={selectedStory.profiles?.avatar_url || '/placeholder.svg'}
                    alt={selectedStory.profiles?.full_name}
                  />
                </Avatar>
                <span className="text-white font-semibold drop-shadow-lg">
                  {selectedStory.profiles?.full_name}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};
