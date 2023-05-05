import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import Usuario from '../components/Usuario'
import { URL_API } from '../config/URL';

function Uusuarios() {
    const [usuario, setUsuario] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    //FUNCIONES
    const cargarUsuarios = async ()=>{
        const res = await fetch(URL_API+'clientes');
        const data = await res.json();
        setUsuarios(data);
    }

    const eliminar = async(cedula)=> {
        const res =  await fetch(URL_API+`clientes/${cedula}`, {
            method: 'DELETE',
        });

        if(res.status === 500){
            toast.error('ERROR')  
        }
  
        if(res.status === 200){
            toast.success('cliente eliminado')  
        }
        cargarUsuarios()
    }

    const hadleChange = (e) =>{
        setUsuario({...usuario, [e.target.name]: e.target.value});
    }

    const hadleEliminar = (cedula) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "asegurese de que el cliente este recien creado o no tenga facturas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, eliminar!'

          }).then((result) => {
            if (result.isConfirmed) {
                eliminar(cedula);
            }
        })
    }

    const hadleSubmit = async(e) =>{
        if (usuario.nombre !== null && usuario.apellidos !== null && usuario.cedula !== null && usuario.telefono !== null) {
            setLoading(true);
            e.preventDefault();
            
            const res = await fetch(URL_API+'clientes', {
                method: 'POST',
                body: JSON.stringify(usuario),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 500) {
                toast.error('ERROR')
            }

            if (res.status === 200) {
                toast.success('cliente agregado')
                e.target.reset()
                hadleLimpiar()
            }

            setLoading(false)
            cargarUsuarios()
        }
        
    }

    const hadleLimpiar = () =>{
        setUsuario({});
        setIsModif(false);
    }

    const hadleEditar = async(cedula) =>{
        setIsModif(true);
        const res = await fetch(URL_API+`clientes/${cedula}`);
        const data = await res.json();
        setUsuario(data[0]);
    }

    const hadleEditarForm = async() =>{
        setLoading(true);
        const res = await fetch(URL_API+`clientes/${usuario.id}`, {
            method: 'PUT',
            body: JSON.stringify(usuario),
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
        if(res.status === 200){
            toast.success('cliente actualizado')  
            hadleLimpiar()
            setLoading(false)
        }

        cargarUsuarios()
    }

    useEffect(()=>{
        cargarUsuarios()
    }, []);

    return (
        <div className="row mb-5">
            <h2 className="text-center mb-3">LISTADO DE CLIENTES</h2>
            <div className="col-lg-7 ms-2">
                <table className="table text-center" >
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">APELLIDOS</th>
                            <th scope="col">CEDULA</th>
                            <th scope="col">TELEFONO</th>
                            <th scope="col" className="p-1 m-1">ACCION</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {
                        usuarios.map( (usuario, index) =>(
                            <Usuario key={index} usuario={usuario} eliminar={hadleEliminar} editar={hadleEditar}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="col-lg-4 ms-1 mb-5">
                <h4 className="text-center">AGREGAR UN CLIENTE</h4>
                <form onSubmit={hadleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">NOMBRE</label>
                        <input type="text" className="form-control" autoComplete='off' required onChange={hadleChange} value={usuario.nombre} name='nombre' autoFocus />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">APELLIDOS</label>
                        <input type="text" className="form-control" autoComplete='off' required onChange={hadleChange} value={usuario.apellidos} name='apellidos'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">CEDULA</label>
                        <input type="number" className="form-control" autoComplete='off' required onChange={hadleChange} value={usuario.cedula} name='cedula' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">TELEFONO</label>
                        <input type="number" className="form-control" autoComplete='off' required onChange={hadleChange} value={usuario.telefono} name='telefono' />
                    </div>
                    <div >
                        {
                            isModif ? (
                                <button type="reset" onClick={() => hadleEditarForm()} className={loading ? "btn btn-outline-info disable" : "btn btn-outline-info"}>
                                    {loading ?
                                        <div className="spinner-border text-info" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : "editar"
                                    }
                                </button>
                            ) : (
                                <button type="submit" className={loading ? "btn btn-outline-success disable" : "btn btn-outline-success"}>
                                    {loading ?
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    :  "agregar"}
                                </button>
                            )
                        }
                        <button type="reset" onClick={() => hadleLimpiar()} className="btn btn-outline-warning" >Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Uusuarios;