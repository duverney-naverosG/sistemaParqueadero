import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import Vehiculo from '../components/Vehiculo'
import { URL_API } from '../config/URL';
function Vehiculos() {
    
    //ESTADOS - VARIABLES
    const [vehiculo, setVehiculo] = useState({});
    const [vehiculos, setVehiculos] = useState([]);
    const [tipovehiculos, setTipoVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    //FUNCIONES
    const cargarVehiculos = async ()=>{
        const res = await fetch(URL_API+'vehiculos');
        const data = await res.json();
        setVehiculos(data);
    }

    const cargarTipoVehiculos = async ()=>{
        const res = await fetch(URL_API+'tipoVehiculo');
        const data = await res.json();
        setTipoVehiculos(data);
    }

    const eliminar = async(placa) =>{
        const res = await fetch(URL_API+`vehiculos/${placa}`, {
            method: 'DELETE',
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
          if(res.status === 200){
              toast.success('vehiculo eliminado')  
          }
        cargarVehiculos()
    }

    //HADLES 
    const hadleChange = (e) =>{
        setVehiculo({...vehiculo, [e.target.name]: e.target.value});
    }

    const hadleSubmit = async(e) =>{
        if (vehiculo.placa !== null && vehiculo.modelo !== null && vehiculo.marca !== null && vehiculo.tipoVehiculo !== null) {
            setLoading(true);
            e.preventDefault();

            const res = await fetch(URL_API+'vehiculos', {
                method: 'POST',
                body: JSON.stringify(vehiculo),
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(res.data)

            if (res.status === 500) {
                toast.error('ERROR')
            }

            if (res.status === 200) {
                toast.success('vehiculo agregado')
                e.target.reset()
                hadleLimpiar()
            }

            setLoading(false)
            cargarVehiculos()
        }
        
    }

    const hadleEditar = async(placa) =>{
        setIsModif(true);
        const res = await fetch(URL_API+`vehiculos/${placa}`);
        const data = await res.json();
        setVehiculo(data[0]);
    }

    const hadleEditarForm = async() =>{
        setLoading(true);
        const res = await fetch(URL_API+`vehiculos/${vehiculo.id}`, {
            method: 'PUT',
            body: JSON.stringify(vehiculo),
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
        if(res.status === 200){
            toast.success('vehiculo actualizado')  
            hadleLimpiar()
            setLoading(false)
        }

        cargarVehiculos()
    }

    const hadleEliminar = async(placa) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "asegurese de que el vehiculo este recien creado o no tenga facturas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, eliminar!'

          }).then((result) => {
            if (result.isConfirmed) {
                eliminar(placa);
            }
        })
    }

    const hadleLimpiar = () =>{
        setVehiculo({});
        setIsModif(false);
    }

    //USEEFECT
    useEffect(()=>{
        cargarTipoVehiculos()
        cargarVehiculos()
    }, []);

    return ( 
        <div className="row  mb-5">
            <h2 className="text-center mb-3">LISTADO DE VEHICULOS</h2>
            <div className="col-lg-7 ms-2">
                <table className="table text-center">
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">PLACA</th>
                            <th scope="col">MODELO</th>
                            <th scope="col">MARCA</th>
                            <th scope="col">TIPO VEHICULO</th>
                            <th scope="col" className="p-1 m-1">ACCION</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            vehiculos.map( (vehiculo, index) =>(
                               <Vehiculo key={index} vehiculo={vehiculo} eliminar={hadleEliminar} editar={hadleEditar}/>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <div className="col-lg-4 ms-1  mb-5">
                <h4 className="text-center">AGREGAR UN VEHICULO</h4>
                <form onSubmit={hadleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">PLACA</label>
                        <input type="text" className="form-control" autoComplete='off' required onChange={hadleChange} value={vehiculo.placa} name="placa"  autoFocus aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">MODELO</label>
                        <input type="number" className="form-control" autoComplete='off' required onChange={hadleChange} value={vehiculo.modelo} name="modelo" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">MARCA</label>
                        <input type="text" className="form-control" autoComplete='off' required onChange={hadleChange} name="marca" value={vehiculo.marca} />
                    </div>
                    <select className="form-select form-select-lg mb-3" required onChange={hadleChange} name="tipoVehiculo" aria-label=".form-select-lg example">
                        <option >seleciona el tipo de vehiculo</option>
                        {tipovehiculos.map((tipo, index) =>(
                            tipo.id === vehiculo.tipoVehiculo ? (
                                <option selected='selected' key={index} value={tipo.id}>{tipo.nombre}</option>) 
                            :( 
                                <option key={index} value={tipo.id}>{tipo.nombre}</option>)
                            
                            ))
                        }
                    </select>
                    <div className="">
                        {
                            isModif ? (
                                <button type="reset" onClick={()=>hadleEditarForm()} className={loading ? "btn btn-outline-info disable" : "btn btn-outline-info"}>
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
                                    : "agregar"
                                    }
                                </button>
                            )
                        }
                        <button type="reset" onClick={()=> hadleLimpiar()} className="btn btn-outline-warning" >Limpiar</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Vehiculos;