function HistorialP({factura, eliminar, editar}) {
    return (
        <tr>
            <th scope="row">{factura.id}</th>
            <td>{factura.fecha.toLocaleString()}</td>
            <td>{factura.fechaSalida.toLocaleString()}</td>
            <td>{factura.valor}</td>
            <td>{factura.tiempo}</td>
            <td className="p-0 m-0 text-center">
                <button type="button" onClick={()=> eliminar(factura.id)} className="btn btn-danger ms-1">eliminar</button>
                <button type="button" onClick={()=> editar(factura.id)} className="btn btn-warning ms-1">volver</button>
            </td>
        </tr>
    );
}

export default HistorialP;