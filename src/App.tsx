import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Mesas } from './components/mesas/Mesas';
import { AdminScreen, Cocina, Menu, Mesero } from './screens';
import { useSocketStore } from './store/useSocketStore';
import { MeseroContainer } from './views/meseroView/MeseroContainer';

function App() {

  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);


  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/mesero" element={<Mesero />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/mesa/:id" element={<MeseroContainer />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </Router>
  );
}

export default App;
