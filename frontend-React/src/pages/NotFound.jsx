import { Link} from "react-router-dom";

function NotFound() {
    return ( <>
        <h1>PAGINA NO ENCONTRADA 404</h1>
        <Link to="/">PAGINA PRINCIPAL</Link>
    </> );
}

export default NotFound;