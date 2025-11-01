import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Milan Crochet</h3>
            <p>Handmade crochet fashion and décor — made-to-order, crafted with love in Kenya.</p>
            <p style={{ marginTop: '1rem' }}>
              📍 Ngong Town, Kajiado County, Kenya
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/auth">My Account</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>📱 +254 791 174 063</li>
              <li>✉️ milanscrotchetworld@gmail.com</li>
              <li>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href="https://instagram.com/milans_crotchet_wrld" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://twitter.com/millancrotchet" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://wa.me/254791174063" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Business Hours</h3>
            <ul>
              <li>Monday – Friday: 8:00 AM – 6:00 PM</li>
              <li>Saturday: 9:00 AM – 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Milan Crochet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
