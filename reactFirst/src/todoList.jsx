


const TodoList = ({ tareasAgregadas, borrar, editar, actualizarCompletado }) => {
  return (
    <div>
      <h2>Tareas Añadidas:</h2>
      {tareasAgregadas.length > 0 ? (
        <ul className="list-group">
          {tareasAgregadas.map((tarea) => (
            <li key={tarea.id}>
              <h5 style={{ textDecoration: tarea.state === "completado" ? "line-through" : "none" }}>
                {tarea.title}
              </h5>
              <p>{`${tarea.descripcion}`}</p>
              <button
                type="button"
                className="btn btn-danger mr-2 btn-sm"
                onClick={() => borrar(tarea.id)}
              >
                Borrar
              </button>
              <button
                type="button"
                className="btn btn-warning mr-2 btn-sm"
                onClick={() => editar(tarea.id)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => actualizarCompletado(tarea.id)}
              >
                Actualizar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tareas añadidas</p>
      )}
    </div>
  );
};

export default TodoList;
