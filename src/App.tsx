
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingSocial from './components/FloatingSocial';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import VilartProd from './pages/VilartProd';
import VilartEvents from './pages/VilartEvents';
import EventDetail from './pages/EventDetail';
import Digital from './pages/Digital';
import About from './pages/About';
import Contact from './pages/Contact';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <div className="min-h-screen bg-black text-white">
            <ScrollProgress />
            <Navbar />
            <FloatingSocial />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prod" element={<VilartProd />} />
                <Route path="/events" element={<VilartEvents />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/digital" element={<Digital />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failure" element={<PaymentFailure />} />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
