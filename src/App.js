import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id,setId] = useState(0);

  const [editar,setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);
  const [showEmpleados, setShowEmpleados] = useState(false);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Registro exitoso</strong>',
        html:`<i>El empleado <strong> ${nombre} </strong>fue registrado con exito!!</i>`,
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:'No se logro registrar el empleado!',
        footer:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      })
    });
  }
 

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id:id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Actualizacion  exitosa</strong>',
        html:`<i>El empleado <strong> ${nombre} </strong>fue actualizado con exito!!</i>`,
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:'No se logro actualizar el empleado!',
        footer:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message,
        timer: 3000
      })
    });
  }
  const deleteEmple = (id, nombre) => {
    // Confirmación inicial de eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      html: `<i>¿Deseas eliminar al empleado <strong>${nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      // Si el usuario confirma, procede con la eliminación
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
          getEmpleados();       // Actualiza la lista de empleados
          limpiarCampos();       // Limpia los campos del formulario
          Swal.fire({
            title: "Eliminación exitosa",
            html: `<i>El empleado <strong>${nombre}</strong> fue eliminado con éxito.</i>`,
            icon: "success",
            timer: 3000
          });
        }).catch(function(error){
          Swal.fire({
            icon:'error',
            title:'Oops...',
            text:'No se logro eliminar el empleado!',
            footer:JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message,
            timer: 3000
          })
        })
      }
    });
  };
  
  const limpiarCampos= () => {
   setAnios("");
   setNombre("");
   setEdad("");
   setPais("");
   setCargo("");
   setEditar(false);
   
   
  }
  const editarEmpleado = (val)=>{
    setEditar(true);

   
    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnios(val.anios)
    setId(val.id)
  }
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }

  const toggleEmpleados = () => {
    setShowEmpleados(!showEmpleados);
    if (!showEmpleados) {
      getEmpleados(); // Cargar empleados solo si se están mostrando
    }
  }

  return (
    <div className="container">
    <div className="card text-center">
  <div className="card-header">
   GESTION DE EMPLEADOS
  </div>
  <div className="card-body">
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Nombre:</span>
      <input type="text"value={nombre}
       onChange={(event) => { setNombre(event.target.value); }} 
      className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Edad:</span>
      <input type="text"value={edad}
       onChange={(event) => { setEdad(event.target.value); }}
      className="form-control" placeholder="Ingresa tu edad" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Pais: </span>
      <input type="text"value={pais}
       onChange={(event) => { setPais(event.target.value); }}
      className="form-control" placeholder="Ingresa el pais" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Cargo: </span>
      <input type="text"value={cargo}
       onChange={(event) => { setCargo(event.target.value); }}
      className="form-control" placeholder="Ingresa el Cargo" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Años: </span>
      <input type="text"value={anios}
       onChange={(event) => { setAnios(event.target.value); }}
      className="form-control" placeholder="Ingresa años a Cargo" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
  </div>
    <div className="card-footer text-muted">
      {
        editar == true?
        <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
        </div>
        :<button className='btn btn-success' onClick={add}>Registrar</button>
      }
    </div>
  </div>
  <div className=" border border-info lista">
  <button className='btn btn-success bg-primary' onClick={toggleEmpleados}>
    {showEmpleados ? "Ocultar Empleados" : "Cargar Empleados"}
  </button>
      <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiemcia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {showEmpleados && ( // Usar showEmpleados para condicionar la lista
              empleadosList.map((val, key) => {
                return <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        onClick={() => {
                          editarEmpleado(val);
                        }}
                        className="btn btn-info"
                      >
                        Editar
                      </button>
                      <button type="button" onClick={()=>{
                       deleteEmple(val.id); 
                      }}className="btn btn-danger">Eliminar</button>
                    </div>

                    </td>
                </tr>
              })
            )}
          </tbody>
      </table>
    </div>
   </div>
  );
}

export default App;
