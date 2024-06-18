import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Solicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [resumen, setResumen] = useState('');
  const [idEmpleado, setIdEmpleado] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/solicitud');
      setSolicitudes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSolicitud = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/solicitud', {
        codigo,
        descripcion,
        resumen,
        idEmpleado,
      });
      setSolicitudes([...solicitudes, response.data]);
      setCodigo('');
      setDescripcion('');
      setResumen('');
      setIdEmpleado(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSolicitud = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/solicitud/${id}`, {
        codigo,
        descripcion,
        resumen,
        idEmpleado,
      });
      const updatedSolicitudes = solicitudes.map((solicitud) =>
        solicitud.id === id ? response.data : solicitud
      );
      setSolicitudes(updatedSolicitudes);
      setId(null);
      setCodigo('');
      setDescripcion('');
      setResumen('');
      setIdEmpleado(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSolicitud = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/solicitud/${id}`);
      const updatedSolicitudes = solicitudes.filter((solicitud) => solicitud.id !== id);
      setSolicitudes(updatedSolicitudes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Solicitudes</h1>
      <form onSubmit={handleCreateSolicitud}>
        <label>
          Código:
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </label>
        <br />
        <label>
          Descripción:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <br />
        <label>
          Resumen:
          <input type="text" value={resumen} onChange={(e) => setResumen(e.target.value)} />
        </label>
        <br />
        <label>
          ID Empleado:
          <input type="number" value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} />
        </label>
        <br />
        <button type="submit">Crear Solicitud</button>
      </form>
      <ul>
        {solicitudes.map((solicitud) => (
          <li key={solicitud.id}>
            {solicitud.codigo} - {solicitud.descripcion} - {solicitud.resumen} - {solicitud.id_empleado}
            <button onClick={() => setId(solicitud.id)}>Editar</button>
            <button onClick={() => handleDeleteSolicitud(solicitud.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {id && (
        <form onSubmit={handleUpdateSolicitud}>
          <label>
            Código:
            <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          </label>
          <br />
          <label>
            Descripción:
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </label>
          <br />
          <label>
            Resumen:
            <input type="text" value={resumen} onChange={(e) => setResumen(e.target.value)} />
          </label>
          <br />
          <label>
            ID Empleado:
            <input type="number" value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} />
          </label>
          <br />
          <button type="submit">Actualizar Solicitud</button>
        </form>
      )}
    </div>
  );
};

export default Solicitud;