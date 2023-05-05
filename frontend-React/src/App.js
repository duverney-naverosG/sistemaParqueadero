import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home.jsx'

import Vehiculo from './pages/Vehiculos.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Facturas from './pages/Facturas.jsx'
import Precios from './pages/Precios.jsx'
import TipoVehiculo from './pages/TipoVehiculo.jsx'
import NotFound from "./pages/NotFound.jsx";
import Historial from "./pages/Historial.jsx";

function App() {
  return (
    <div className="App ">
      <Menu/>
      <Footer/>

      <Toaster  position="bottom-left" reverseOrder={false}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/vehiculos' element={<Vehiculo/>}/>
        <Route path='/clientes' element={<Usuarios/>}/>
        <Route path='/facturas' element={<Facturas/>}/>
        <Route path='/historialFacturas' element={<Historial/>}/>
        <Route path='/tarifas' element={<Precios/>}/>
        <Route path='/TipoVehiculo' element={<TipoVehiculo/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
