import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import Factura from '../components/Factura';
import { Reloj } from '../components/Reloj';
import Swal from 'sweetalert2'
import { URL_API } from '../config/URL';

function Facturas() {
    const [factura, setFactura] = useState({});
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    //FUNCIONES
    const cargarFacturas = async ()=>{
        const res = await fetch(URL_API+'facturas');
        const data = await res.json();
        setFacturas(data);
    }

    const eliminar = async(id)=> {
        const res =  await fetch(URL_API+`facturas/${id}`, {
            method: 'DELETE',
        });

        if(res.status === 500){
            toast.error('ERROR')  
        }
  
        if(res.status === 200){
            toast.success('factura eliminada')  
        }
        cargarFacturas()
    }

    const hadleChange = (e) =>{
        setFactura({...factura, [e.target.name]: e.target.value});
    }

    const hadleEliminar = (id) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "asegurese de que la factura este recien creada!",
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
        if (factura.nombre !== null && factura.apellidos !== null && factura.cedula !== null && factura.telefono !== null) {
            setLoading(true);
            e.preventDefault();
            
            const res = await fetch(URL_API+'facturas', {
                method: 'POST',
                body: JSON.stringify(factura),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 500) {
                toast.error('ERROR')
            }

            if (res.status === 200) {
                toast.success('factura agregada')
                e.target.reset()
                hadleLimpiar()
            }

            setLoading(false)
            cargarFacturas()
        }
        
    }

    const hadleLimpiar = () =>{
        setFactura({});
        setIsModif(false);
    }

    const hadleEditar = async(id) =>{
        setIsModif(true);
        const res = await fetch(URL_API+`facturas/${id}`);
        const data = await res.json();
        setFactura(data);
    }

    const hadleEditarForm = async() =>{
        setLoading(true);
        const res = await fetch(URL_API+`facturas/${factura.id}`, {
            method: 'PUT',
            body: JSON.stringify(factura),
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
        if(res.status === 200){
            toast.success('factura actualizada')  
            hadleLimpiar()
            setLoading(false)
        }

        cargarFacturas()
    }

    const hadlePagar = async() =>{
        setLoading(true);
        const res = await fetch(URL_API+`historial/${factura.id}`, {
            method: 'PUT',
            body: JSON.stringify(factura),
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
        if(res.status === 200){
            toast.success('pagado')  
            hadleLimpiar()
            setLoading(false)
        }

        cargarFacturas()
    }

    useEffect(()=>{
        cargarFacturas()
    }, []);

    return (
        <div className="row  mb-5">
            <h2 className="text-center mb-3">LISTADO DE FACTURAS</h2>
            <div className="col-lg-8 ms-2">
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">FECHA INGRESO</th>
                            <th scope="col">VALOR</th>
                            <th scope="col">TIEMPO</th>
                            <th scope="col">PLACA</th>
                            <th scope="col">CEDULA</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col" className="p-1 m-1">ACCION</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {
                        facturas.map( (factura, index) =>(
                            <Factura key={index} factura={factura} eliminar={hadleEliminar} editar={hadleEditar} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="col-lg-3 ms-1  mb-5">
                <h4 className="text-center">AGREGAR UNA FACTURA</h4>
                <form onSubmit={hadleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">PLACA</label>
                        <input type="text" className="form-control" autoComplete='off' required onChange={hadleChange}  value={factura.placa} name='placa' autoFocus/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">CEDULA</label>
                        <input type="text" className="form-control"  autoComplete='off' required onChange={hadleChange} value={factura.cedula} name='cedula'/>
                    </div>
                    
                    <div>
                    {
                            isModif ? (
                                <div>
                                <button type="reset" onClick={() => hadleEditarForm()} className={loading ? "btn btn-outline-info disable" : "btn btn-outline-info"}>
                                    {loading ?
                                        <div className="spinner-border text-info" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : "editar"
                                    }
                                </button>
                                
                                <button type="button" onClick={()=> hadlePagar()} className="btn btn-outline-success ms-1">pagar</button>
                                </div>
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
                <div className='mt-4'>
                    <Reloj/>
                </div>
            </div>
        </div>
    );
}

export default Facturas;