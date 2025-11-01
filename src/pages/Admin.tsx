import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <div>
      <Header />
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Admin functionality coming soon...</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
