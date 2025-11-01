import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { supabase } from '../integrations/supabase/client';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query;

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            Our <span className="gradient-text">Shop</span>
          </h1>

          {/* Category Filter */}
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            <button
              className={`btn ${selectedCategory === 'clothing' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('clothing')}
            >
              Clothing
            </button>
            <button
              className={`btn ${selectedCategory === 'accessories' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('accessories')}
            >
              Accessories
            </button>
            <button
              className={`btn ${selectedCategory === 'home-decor' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('home-decor')}
            >
              Home Décor
            </button>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                No products found in this category. Check back soon!
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
