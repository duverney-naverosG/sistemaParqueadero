import { NavLink} from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow p-3 mb-2 rounded">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white" to="/">
          <i className="fa-solid fa-warehouse fa-2xl"></i> SISTEMA PARQUEADERO
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="dropdown-toggle nav-link text-white" href="/vehiculos" data-bs-toggle="dropdown">
                vehiculos <i className="fa-solid fa-car"></i>
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item nav-link text-black" to="/vehiculos">vehiculos</NavLink></li>
                <li><NavLink className="dropdown-item nav-link text-black" to="/TipoVehiculo">tipo vehiculo</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/clientes">
                clientes <i className="fa-solid fa-users"></i>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="dropdown-toggle nav-link text-white" href="/facturas" data-bs-toggle="dropdown">
                facturas <i className="fa-solid fa-cash-register"></i>
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item nav-link text-black" to="/facturas">facturas</NavLink></li>
                <li><NavLink className="dropdown-item nav-link text-black" to="/historialFacturas">historial Facturas</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="/tarifas">
                tarifas <i className="fa-solid fa-coins"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;