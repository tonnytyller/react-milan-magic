import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = isSignUp 
      ? await signUp(email, password, fullName)
      : await signIn(email, password);
    
    if (error) {
      alert(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <Header />
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '1rem' }}>
            {isSignUp && (
              <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} required />
            )}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} required />
            <button type="submit" className="btn btn-primary btn-full">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <a href="#" onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#f97316' }}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </a>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
