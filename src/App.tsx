import Navbar from '../src/components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
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
