import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import TipVehiculo from '../components/TipVehiculo'; 
import { URL_API } from '../config/URL';

function TipoVehiculo() {
    const [tipovehiculo, setTipovehiculo] = useState({});
    const [tiposVehiculos, setTiposVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);

    //FUNCIONES
    const cargarTipoVehiculos = async ()=>{
        const res = await fetch(URL_API+'tipoVehiculo');
        const data = await res.json();
        setTiposVehiculos(data);
    }

    const eliminar = async(id)=> {
        const res =  await fetch(URL_API+`tipoVehiculo/${id}`, {
            method: 'DELETE',
        });

        if(res.status === 500){
            toast.error('ERROR')  
        }
  
        if(res.status === 200){
            toast.success('tipo vehiculo eliminado')  
        }
        cargarTipoVehiculos()
    }

    const hadleChange = (e) =>{
        setTipovehiculo({...tipovehiculo, [e.target.name]: e.target.value});
    }

    const hadleEliminar = (id) =>{
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
                eliminar(id);
            }
        })
    }

    const hadleSubmit = async(e) =>{
        if (tipovehiculo.nombre !== null && tipovehiculo.apellidos !== null && tipovehiculo.cedula !== null && tipovehiculo.telefono !== null) {
            setLoading(true);
            e.preventDefault();
            
            const res = await fetch(URL_API+'tipoVehiculo', {
                method: 'POST',
                body: JSON.stringify(tipovehiculo),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 500) {
                toast.error('ERROR')
            }

            if (res.status === 200) {
                toast.success('tipo vehiculo agregado')
                e.target.reset()
                hadleLimpiar()
            }

            setLoading(false)
            cargarTipoVehiculos()
        }
        
    }

    const hadleLimpiar = () =>{
        setTipovehiculo({});
    }

    useEffect(()=>{
        cargarTipoVehiculos()
    }, []);

    return ( 
        <div className="row  mb-5">
        <h2 className="text-center mb-3">TIPOS DE VEHICULOS</h2>
        <div className="col-lg-7 ms-2">
            <table className="table text-center">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col" className="p-1 m-1">ACCION</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {
                    tiposVehiculos.map( (tipo, index) =>(
                            <TipVehiculo key={index} tipo={tipo} eliminar={hadleEliminar}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
        <div className="col-lg-4 ms-1  mb-5">
            <h4 className="text-center">AGREGAR TIPO VEHICULO</h4>
            <form onSubmit={hadleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">NOMBRE</label>
                    <input type="text" className="form-control" autoComplete='off' required onChange={hadleChange}  name='nombre' autoFocus/>
                </div>
                
                <div >
                    {

                        <button type="submit" className={loading ? "btn btn-outline-success disable" : "btn btn-outline-success"}>{loading ?
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : "agregar"}
                        </button>

                    }
                    <button type="reset" onClick={() => hadleLimpiar()} className="btn btn-outline-warning" >Limpiar</button>
                </div>
            </form>
        </div>
    </div> );
}

export default TipoVehiculo;