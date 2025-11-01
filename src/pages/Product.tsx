import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../integrations/supabase/client';
import { useCart } from '../contexts/CartContext';

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id]);

  const loadProduct = async (productId: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (!error && data) setProduct(data);
    setLoading(false);
  };

  if (loading) return <div><Header /><p style={{ padding: '3rem', textAlign: 'center' }}>Loading...</p><Footer /></div>;
  if (!product) return <div><Header /><p style={{ padding: '3rem', textAlign: 'center' }}>Product not found</p><Footer /></div>;

  return (
    <div>
      <Header />
      <section style={{ padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', borderRadius: '1rem' }} />
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
              <p style={{ fontSize: '2rem', color: '#f97316', fontWeight: 700, marginBottom: '1.5rem' }}>
                KSh {product.price.toLocaleString()}
              </p>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{product.description}</p>
              <button className="btn btn-primary btn-large btn-full" onClick={() => addToCart(product.id, 1)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
