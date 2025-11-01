import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div>
      <Header />
      <section style={{ padding: '3rem 0', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Profile</h1>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem' }}>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={signOut}>Sign Out</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
