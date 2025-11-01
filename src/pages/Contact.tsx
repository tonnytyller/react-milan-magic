import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div>
      <Header />

      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <span className="gradient-text">Contact</span> Us
          </h1>

          <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Milan Crochet — Official Contact Information</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>🏠 Business Name:</h3>
              <p>Milan Crochet</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>🧵 Description:</h3>
              <p>Handmade crochet fashion and décor — made-to-order, crafted with love in Kenya.</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>📍 Location:</h3>
              <p>Ngong Town, Kajiado County, Kenya</p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>(Serving customers across Kenya and worldwide)</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>📞 Phone / WhatsApp:</h3>
              <p>📱 +254 791 174 063</p>
              <a href="https://wa.me/254791174063" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                <i className="fab fa-whatsapp" style={{ marginRight: '0.5rem' }}></i>
                Chat on WhatsApp
              </a>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>📧 Email:</h3>
              <p>✉️ milanscrotchetworld@gmail.com</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>🌐 Social Media:</h3>
              <ul style={{ listStyle: 'none' }}>
                <li>Instagram: <a href="https://instagram.com/milans_crotchet_wrld" target="_blank" rel="noopener noreferrer">@milans_crotchet_wrld</a></li>
                <li>Twitter (X): <a href="https://twitter.com/millancrotchet" target="_blank" rel="noopener noreferrer">@millancrotchet</a></li>
                <li>TikTok: @milans_crotchet_wrld</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>🕐 Business Hours:</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.5rem 0' }}>Monday – Friday</td>
                    <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>8:00 AM – 6:00 PM</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.5rem 0' }}>Saturday</td>
                    <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>9:00 AM – 5:00 PM</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem 0' }}>Sunday</td>
                    <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
