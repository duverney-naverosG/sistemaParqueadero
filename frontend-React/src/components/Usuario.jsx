function Usuario({usuario, eliminar, editar}) {
    return (
        <tr>
            <th scope="row">{usuario.id}</th>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellidos}</td>
            <td>{usuario.cedula}</td>
            <td>{usuario.telefono}</td>
            <td className="p-0 m-0 text-center">
                <button type="button" onClick={()=> editar(usuario.cedula)} className="btn btn-warning">editar</button>
                <button type="button" onClick={()=> eliminar(usuario.id)} className="btn btn-danger ms-1">eliminar</button>
            </td>
        </tr>
    );
}

export default Usuario;