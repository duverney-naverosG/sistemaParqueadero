function Factura({factura, eliminar, editar}) {
    return (
        <tr>
            <th scope="row">{factura.id}</th>
            <td>{factura.fecha_ingreso}</td>
            <td>{factura.valor}</td>
            <td>{factura.tiempo}</td>
            <td>{factura.placa}</td>
            <td>{factura.cliente}</td>
            <td>{factura.nombre}</td>
            <td className="p-0 m-0 text-center">
                <button type="button" onClick={()=> editar(factura.id)} className="btn btn-warning">editar</button>
                <button type="button" onClick={()=> eliminar(factura.id)} className="btn btn-danger ms-1">eliminar</button>
            </td>
        </tr>
    );
}

export default Factura;