import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, itemCount } = useCart();

  const subtotal = items.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + (price * item.quantity);
  }, 0);

  return (
    <div>
      <Header />

      <section style={{ padding: '3rem 0', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            Shopping <span className="gradient-text">Cart</span>
          </h1>

          {itemCount === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                Your cart is empty
              </p>
              <button className="btn btn-primary" onClick={() => window.location.href = '/shop'}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '2rem' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr auto',
                    gap: '1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={item.product?.image_url || '/placeholder-product.jpg'}
                    alt={item.product?.name}
                    style={{ width: '100%', borderRadius: '0.5rem' }}
                  />

                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                      {item.product?.name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {item.selected_size && `Size: ${item.selected_size} | `}
                      {item.selected_color && `Color: ${item.selected_color}`}
                    </p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f97316' }}>
                      KSh {(item.product?.price || 0).toLocaleString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.75rem' }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.75rem' }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '0.875rem' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.125rem' }}>Subtotal:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f97316' }}>
                    KSh {subtotal.toLocaleString()}
                  </span>
                </div>
                <button className="btn btn-primary btn-full btn-large">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
