import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Heart, Sparkles, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-muted/50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Milan Crochet</span>
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto text-lg mb-16">
              Handcrafted with love, one stitch at a time
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                <p className="text-muted-foreground">
                  Every piece is carefully crafted with attention to detail and genuine care
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unique Designs</h3>
                <p className="text-muted-foreground">
                  Each creation is one-of-a-kind, bringing uniqueness to your home
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Supporting local artisans and bringing joy to our customers
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-card p-8 rounded-lg shadow-card">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Milan Crochet began as a passion project, transforming yarn into beautiful, 
                  handcrafted creations. What started in a small corner of our home has grown 
                  into a thriving business, bringing warmth and beauty to homes around the world.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every stitch tells a story of dedication, creativity, and love. We believe 
                  that handmade items carry a special energy that mass-produced goods simply 
                  cannot match. When you purchase from Milan Crochet, you're not just buying 
                  a product – you're supporting a craft, a dream, and a tradition.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-card">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create beautiful, sustainable, and meaningful handcrafted items that bring 
                  joy and warmth to every home. We're committed to using quality materials, 
                  ethical practices, and timeless designs that you'll treasure for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
