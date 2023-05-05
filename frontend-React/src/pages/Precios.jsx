import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { URL_API } from '../config/URL';
import Precio from '../components/Precio';

function Precios() {
    const [precio, setPrecio] = useState({});
    const [precios, setVehiculos] = useState([]);
    const [tipovehiculos, setTipoVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    //FUNCIONES
    const cargarPrecios = async ()=>{
        const res = await fetch(URL_API+'tarifas');
        const data = await res.json();
        setVehiculos(data);
    }

    const cargarTipoVehiculos = async ()=>{
        const res = await fetch(URL_API+'tipoVehiculo');
        const data = await res.json();
        setTipoVehiculos(data);
    }

    const eliminar = async(id) =>{
        const res = await fetch(URL_API+`tarifas/${id}`, {
            method: 'DELETE',
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
          if(res.status === 200){
              toast.success('precio eliminado')  
          }
        cargarPrecios()
    }

    //HADLES 
    const hadleChange = (e) =>{
        setPrecio({...precio, [e.target.name]: e.target.value});
    }

    const hadleSubmit = async(e) =>{
        if (precio.primero !== null && precio.segundo !== null && precio.tecero !== null && precio.cuarto !== null && precio.quinto !== null  && precio.tipoVehiculo !== null) {
            setLoading(true);
            e.preventDefault();

            const res = await fetch(URL_API+'tarifas', {
                method: 'POST',
                body: JSON.stringify(precio),
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(res.data)

            if (res.status === 500) {
                toast.error('ERROR')
            }

            if (res.status === 200) {
                toast.success('tarifa agregada')
                e.target.reset()
                hadleLimpiar()
            }

            setLoading(false)
            cargarPrecios()
        }
        
    }

    const hadleEditar = async(id) =>{
        setIsModif(true);
        const res = await fetch(URL_API+`tarifas/${id}`);
        const data = await res.json();
        setPrecio(data[0]);
    }

    const hadleEditarForm = async() =>{
        setLoading(true);
        const res = await fetch(URL_API+`tarifas/${precio.id}`, {
            method: 'PUT',
            body: JSON.stringify(precio),
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 500){
            toast.error('ERROR')  
          }
  
        if(res.status === 200){
            toast.success('tarifa actualizada')  
            hadleLimpiar()
            setLoading(false)
        }

        cargarPrecios()
    }

    const hadleEliminar = async(id) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar?',
            text: "asegurese de que el precio este recien creado o no tenga facturas!",
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

    const hadleLimpiar = () =>{
        setPrecio({});
        setIsModif(false);
    }

    //USEEFECT
    useEffect(()=>{
        cargarTipoVehiculos()
        cargarPrecios()
    }, []);
    
    return (
        <div className="row  mb-5">
            <h2 className="text-center mb-3">LISTADO DE TARIFAS</h2>
            <div className="col-lg-8 ms-2">
                <table className="table text-center" >
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">TIPO DE VEHICULO</th>
                            <th scope="col">MENOS DE 30 MIN</th>
                            <th scope="col">MENOS DE 1 HORA</th>
                            <th scope="col">DE 1 A 4 HORAS</th>
                            <th scope="col">DE 1 A 15 DIAS</th>
                            <th scope="col">MENUSALIDAD</th>
                            <th scope="col" className="p-1 m-1">ACCION</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            precios.map( (precio, index) =>(
                               <Precio key={index} precio={precio} eliminar={hadleEliminar} editar={hadleEditar}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-lg-3 ms-1  mb-5">
                <h4 className="text-center">AGREGAR UNA TARIFA</h4>
                <form onSubmit={hadleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">MENOS DE 30 MIN</label>
                        <input type="number" className="form-control" autoComplete='off' autoFocus required onChange={hadleChange} value={precio.primero} name="primero"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">MENOS DE 1 HORA</label>
                        <input type="number" className="form-control" autoComplete='off' required onChange={hadleChange} value={precio.segundo} name="segundo"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">DE 1 A 4 HORAS</label>
                        <input type="number" className="form-control" autoComplete='off' required onChange={hadleChange} value={precio.tercero} name="tercero"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">DE 1 A 15 DIAS</label>
                        <input type="number" className="form-control" autoComplete='off' required onChange={hadleChange} value={precio.cuarto} name="cuarto"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">MENUSALIDAD</label>
                        <input type="number" className="form-control" required onChange={hadleChange} value={precio.quinto} name="quinto"/>
                    </div>
                    <select className="form-select form-select-lg mb-3" required onChange={hadleChange} name="tipoVehiculo" aria-label=".form-select-lg example">
                        <option >seleciona el tipo de vehiculo</option>
                        {tipovehiculos.map((tipo, index) =>(
                            tipo.id === precio.tipoVehiculo ? (
                                <option selected='selected' key={index} value={tipo.id}>{tipo.nombre}</option>) 
                            : ( 
                                <option key={index} value={tipo.id}>{tipo.nombre}</option>)
                            ))
                        }
                    </select>
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
                                    : "agregar"
                                    }
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

export default Precios;