import { useRef } from "react"
import { useState } from 'react';


const FormNoControlado = () => {
    const [parrafo, setParrafo] = useState(null);

    const formulario = useRef(null)

    const handleSubmit = (e) => {
        console.log("click")
        e.preventDefault()
        console.log(formulario.current)
        const datos = new FormData(formulario.current) 
        console.log(...datos.entries()) // Da filas del formulario

        const objetoDatos = Object.fromEntries([...datos.entries()]) // convierte las filas en un objeto
        console.log(objetoDatos)

        const {Descripcion,Estado ,nombre_tarea} = objetoDatos

        if (!Descripcion.trim()) {
            setParrafo("Error en la descripcion");
        } else if (!Estado.trim()) {
            setParrafo("Error en el estado");
        } else if (!nombre_tarea.trim()) {
            setParrafo("Error en el nombre de la tarea");
        } 
        else {
            setParrafo("Todo correcto")
            console.log("Enviando objetos al server...")
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} ref={formulario}>
            <input name = "nombre_tarea" placeholder = "Nombre de la tarea" type="text" className="form-control mb-2" defaultValue = "Tarea 1"/>
            <textarea 
                name="Descripcion"
                placeholder="Introduce la descripcion de la tarea"
                className="form-control mb-2"
                defaultValue = "Descripcion de la tarea"
            />
            <select 
                name="Estado"
                className="form-control mb-2"
                defaultValue= "Pendiente"

            >
               <option value="pendiente">Pendiente</option> 
               <option value="completado">Completado</option> 
            </select>
            <button
                type="submit"
                className="btn btn-primary"
            >
            Añadir
            </button>
            <p>{parrafo !== null ? parrafo : "No hay error"}</p>
        </form>
        </>
    )
}

export default FormNoControlado