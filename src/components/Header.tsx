import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

export default function Header() {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">M</div>
          <span className="logo-text">Milan Crochet</span>
        </Link>

        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>
            Shop
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          <button className="action-btn" onClick={() => window.location.href = '/cart'}>
            <i className="fas fa-shopping-cart"></i>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
          
          {user ? (
            <button className="action-btn" onClick={() => window.location.href = '/profile'}>
              <i className="fas fa-user"></i>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => window.location.href = '/auth'}>
              Sign In
            </button>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu open">
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
