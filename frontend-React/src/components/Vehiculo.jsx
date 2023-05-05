function Vehiculo({vehiculo, eliminar, editar}) {
    return (
        <tr>
            <th scope="row">{vehiculo.id}</th>
            <td>{vehiculo.placa}</td>
            <td>{vehiculo.modelo}</td>
            <td>{vehiculo.marca}</td>
            <td>{vehiculo.tipoVehiculo}</td>
            <td className="p-0 m-0 text-center">
                <button type="button" onClick={()=> editar(vehiculo.placa)} className="btn btn-warning">editar</button>
                <button type="button" onClick={()=> eliminar(vehiculo.placa)} className="btn btn-danger ms-1">eliminar</button>
            </td>
        </tr>
    );
}

export default Vehiculo;