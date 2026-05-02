import Navbar from './widgets/Navbar';
import Footer from './widgets/Footer';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
