import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState('');
  const [salario, setSalario] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/empleado');
      setEmpleados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/empleado', {
        nombre,
        salario,
        fechaIngreso,
      });
      setEmpleados([...empleados, response.data]);
      setNombre('');
      setSalario('');
      setFechaIngreso('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEmpleado = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/empleado/${id}`, {
        nombre,
        salario,
        fechaIngreso,
      });
      const updatedEmpleados = empleados.map((empleado) =>
        empleado.id === id ? response.data : empleado
      );
      setEmpleados(updatedEmpleados);
      setId(null);
      setNombre('');
      setSalario('');
      setFechaIngreso('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEmpleado = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/empleado/${id}`);
      const updatedEmpleados = empleados.filter((empleado) => empleado.id !== id);
      setEmpleados(updatedEmpleados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Empleados</h1>
      <form onSubmit={handleCreateEmpleado}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          Salario:
          <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} />
        </label>
        <br />
        <label>
          Fecha de Ingreso:
          <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
        </label>
        <br />
        <button type="submit">Crear Empleado</button>
      </form>
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado.id}>
            {empleado.nombre} - {empleado.salario} - {empleado.fecha_ingreso}
            <button onClick={() => setId(empleado.id)}>Editar</button>
            <button onClick={() => handleDeleteEmpleado(empleado.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {id && (
        <form onSubmit={handleUpdateEmpleado}>
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
          <br />
          <label>
            Salario:
            <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} />
          </label>
          <br />
          <label>
            Fecha de Ingreso:
            <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
          </label>
          <br />
          <button type="submit">Actualizar Empleado</button>
        </form>
      )}
    </div>
  );
};

export default Empleado;