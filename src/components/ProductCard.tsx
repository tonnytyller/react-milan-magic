import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images?: string[];
  category: string;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addToCart(product.id, 1);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const imageUrl = product.image_url || (product.images && product.images[0]);

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image">
        <img src={imageUrl || '/placeholder-product.jpg'} alt={product.name} />
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
            <span>4.8</span>
          </div>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-price-category">
          <span className="product-price">KSh {product.price.toLocaleString()}</span>
          <span className="product-category">{product.category}</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
