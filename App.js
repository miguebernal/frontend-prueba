import React from 'react';
import Empleado from './Empleado';
import Solicitud from './Solicitud';

const App = () => {
  return (
    <div>
      <h1>CRUD App</h1>
      <Empleado />
      <Solicitud />
    </div>
  );
};

export default App;