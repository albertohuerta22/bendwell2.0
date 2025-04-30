import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <Navbar menuOpen={false} setMenuOpen={() => {}} />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
