import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full mb-6 shadow-card">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Handcrafted with Love</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Crochet Creations<br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Made Just For You
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover unique, handmade crochet pieces that bring warmth and beauty to your home. 
                Each item is crafted with care and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button size="lg" className="bg-gradient-primary hover:bg-gradient-primary-hover shadow-elegant">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Learn Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Handmade with Care</h3>
                <p className="text-muted-foreground">
                  Every piece is lovingly crafted by skilled artisans
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Using only the finest materials for lasting beauty
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unique Designs</h3>
                <p className="text-muted-foreground">
                  One-of-a-kind pieces you won't find anywhere else
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Products</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our handpicked selection of beautiful crochet creations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" variant="outline">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Bring Handmade Beauty Home?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Browse our collection and find the perfect handcrafted piece for your space
            </p>
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
