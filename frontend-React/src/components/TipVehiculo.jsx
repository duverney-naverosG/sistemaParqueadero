function TipVehiculo({tipo, eliminar}) {
    return (
        <tr>
            <th scope="row">{tipo.id}</th>
            <td>{tipo.nombre}</td>
            <td className="p-0 m-0 text-center">
                <button type="button" onClick={()=> eliminar(tipo.id)} className="btn btn-danger ms-1">eliminar</button>
            </td>
        </tr>
    );
}

export default TipVehiculo;