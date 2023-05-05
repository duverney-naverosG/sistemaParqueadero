import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import HistorialP from '../components/HistorialP';
import Swal from 'sweetalert2'
import { URL_API } from '../config/URL';

function Historial() {
    const [facturas, setFacturas] = useState([]);

    //FUNCIONES
    const cargarFacturas = async ()=>{
        const res = await fetch(URL_API+'historial');
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

    const hadleEliminar = (id) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "si es asi, oprime si!",
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

    const hadleEditarVolver = async(id) =>{
        const data = {fechaSalida: 0}
        const res = await fetch(URL_API+`historial/volver/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
        if(res.status === 200){
            toast.success('factura actualizada')  
        }

        cargarFacturas()
    }

    useEffect(()=>{
        cargarFacturas()
    }, []);

    return (
        <div className="row container justify-content-center mb-5">
            <h2 className="text-center mb-3">HISTORIAL DE FACTURAS</h2>
            <div className="col-lg-8 ms-2 col-center">
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">FECHA INGRESO</th>
                            <th scope="col">FECHA SALIDA</th>
                            <th scope="col">VALOR</th>
                            <th scope="col">TIEMPO</th>
                            <th scope="col" className="p-1 m-1">ACCION</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {
                        facturas.map( (factura, index) =>(
                            <HistorialP key={index} factura={factura} eliminar={hadleEliminar} editar={hadleEditarVolver}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Historial;