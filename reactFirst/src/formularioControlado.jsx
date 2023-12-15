
import { useState } from "react"
import Swal from "sweetalert2"
import TodoList from "./todoList.jsx"

const FormularioControlado = () => {
    const initialState = {
        id: Date.now(),
        title: "todo 01",
        descripcion: "Descripcion 01",
        state: "pendiente",
        priority: false,
    }

    //Estado para tener un por defecto
    const [todo, setTodo] = useState(initialState)
    //Estado para agregar tareas a una lista
    const [tareasAgregadas, setTareasAgregadas] = useState([])
    //Estado para activar el modo edicion
    const [modoEdicion, setModoEdicion] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        //Alerta vacio
        if (todo.title.trim() === "" || todo.descripcion.trim() === "") {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo va mal",
          })
        }
        
        if (modoEdicion !== false) {
          const tareasActualizadas = tareasAgregadas.map((tarea) =>
            tarea.id === todo.id ? { ...todo, state: tarea.state } : tarea
          )
          setTareasAgregadas(tareasActualizadas)
          setModoEdicion(false)
        } else {
          setTareasAgregadas([...tareasAgregadas, { ...todo, id: Date.now() }])
        }
      
        setTodo(initialState);
    }

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        })
    }


    // Funcion Borrar tarea
    const borrar = (id) => {
        const borradoTarea = tareasAgregadas.filter((tarea) => tarea.id !== id)
        setTareasAgregadas(borradoTarea)
    }

    // Editar la tarea
    const editar = (id) => {
        const tareaEditada = tareasAgregadas.find((tarea) => tarea.id === id)
        setTodo({ ...tareaEditada })
        setModoEdicion(id)
    }

    // Actualizar la tarea tachando cuando lo pulsas
    const actualizarCompletado = (id) => {
        const tareasActualizadas = tareasAgregadas.map((tarea) =>
        tarea.id === id ? { ...tarea, state: tarea.state === "pendiente" ? "completado" : "pendiente" } : tarea
        )
        setTareasAgregadas(tareasActualizadas)
    }


    
    //Sort para ordenar la tarea por completado o pendeinte y si son iguales por prioridad
    const sortedTareas = [...tareasAgregadas].sort((a, b) => {
        if (a.state === "pendiente" && b.state !== "pendiente") {
          return -1 // a esta pendiente y b no entonces a va antes que b
        } else if (a.state !== "pendiente" && b.state === "pendiente") {
          return 1 // a no esta pendiente y b si entonces a va después que b
        } else {
          // Si los estados son iguales se ordenar por prioridad
          return a.priority && !b.priority ? -1 : !a.priority && b.priority ? 1 : 0
        }
      });     

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Nombre de la tarea"
                    type="text"
                    className="form-control mb-2"
                    value={todo.title}
                    onChange={handleChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Introduce la descripción de la tarea"
                    className="form-control mb-2"
                    value={todo.descripcion}
                    onChange={handleChange}
                />
                <select
                    name="state"
                    className="form-control mb-2"
                    value={todo.state}
                    onChange={handleChange}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                </select>
                
                <div>
                    <label htmlFor="inputchecked">Check</label>
                    <input
                        className="form-checked-input mb-2"
                        name="priority"
                        type="checkbox"
                        id="inputchecked"
                        checked={todo.priority}
                        onChange={handleChange}
                    />
                </div>
        
                <button type="submit" className="btn btn-primary">
                    {modoEdicion !== false ? "Guardar Cambios" : "Submit"}
                </button>

            </form>
            
            <TodoList
                tareasAgregadas={sortedTareas}
                borrar={borrar}
                editar={editar}
                actualizarCompletado={actualizarCompletado}
            />
        </div>
    ) 
}

export default FormularioControlado
