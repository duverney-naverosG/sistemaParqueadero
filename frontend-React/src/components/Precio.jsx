function Precio({precio, eliminar, editar}) {
    return (
        <tr>
            <th scope="row">{precio.id}</th>
            <td>{precio.nombre}</td>
            <td>{precio.primero}</td>
            <td>{precio.segundo}</td>
            <td>{precio.tercero}</td>
            <td>{precio.cuarto}</td>
            <td>{precio.quinto}</td>
            <td className="p-0 m-0 text-center">
                <button type="button" onClick={()=> editar(precio.id)} className="btn btn-warning">editar</button>
                <button type="button" onClick={()=> eliminar(precio.id)} className="btn btn-danger ms-1">eliminar</button>
            </td>
        </tr>
    );
}

export default Precio;