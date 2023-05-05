import vehiculos from '../public/images/vehiculos.jpg'
import clientes from '../public/images/clientes.avif'
import facturas from '../public/images/factura.jpg'
import precios from '../public/images/tarifas.jpg'
import {Link} from "react-router-dom";

function Home() {
    return ( 
        <div className='d-flex justify-content-center row mb-2 mt-3 text-center mb-5'>
            
            <Link className="card me-2  mb-2 col-xl-3"  to="/vehiculos" style={{width: "18rem"}}>
                <img  className="card-img-top img-fluid"  src={vehiculos} alt="vehiculos"  />
                <div className="card-body">
                    <p className="card-text mt-5">VEHICULOS</p>
                </div>
            </Link>
            <Link className="card me-2  mb-2 col-xl-3"  to="/clientes" style={{width: "18rem"}}>
                <img  className="card-img-top img-fluid"  src={clientes} alt="vehiculos"  />
                <div className="card-body">
                    <p className="card-text">CLIENTES</p>
                </div>
            </Link>
            <Link className="card me-2  mb-2 col-xl-3"  to="/facturas" style={{width: "18rem"}}>
                <img  className="card-img-top img-fluid"  src={facturas} alt="vehiculos"  />
                <div className="card-body">
                    <p className="card-text">FACTURAS</p>
                </div>
            </Link>
            <Link className="card me-2 mb-2 col-xl-3" to="/tarifas" style={{width: "18rem"}}>
                <img  className="card-img-top img-fluid"  src={precios} alt="vehiculos"  />
                <div className="card-body">
                    <p className="card-text">TARIFAS</p>
                </div>
            </Link>
        </div>
);
}

export default Home;