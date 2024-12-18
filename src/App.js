import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pedidos from './components/pages/Pedidos'; 
import Reservas from './components/pages/Reservas';
import HistoricoReservas from './components/pages/HistoricoReservas';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reservas/historico" element={<HistoricoReservas />} />
            {/* Rota padrão ou página 404 */}
            <Route path="*" element={<Pedidos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;