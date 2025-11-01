import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { supabase } from '../integrations/supabase/client';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(6);

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div>
              <h1 className="hero-title">
                Handcrafted <span className="gradient-text">Crochet</span> Fashion
              </h1>
              <p className="hero-description">
                Made-to-order, crafted with love in Kenya. Each piece is uniquely designed
                to bring warmth and style to your life.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-large" onClick={() => window.location.href = '/shop'}>
                  Shop Now
                </button>
                <button className="btn btn-secondary btn-large" onClick={() => window.location.href = '/contact'}>
                  Contact Us
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600"
                alt="Crochet products"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              Discover our handpicked collection of beautiful crochet creations
            </p>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading products...</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280' }}>
              No products available yet. Check back soon!
            </p>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-primary btn-large" onClick={() => window.location.href = '/shop'}>
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ background: 'linear-gradient(135deg, #fef3f2 0%, #fdf2f8 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Stay <span className="gradient-text">Updated</span>
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Subscribe to our newsletter for exclusive offers and new product updates
          </p>
          <form style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
              }}
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
