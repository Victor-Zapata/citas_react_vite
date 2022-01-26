import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const [pacientes, setPacientes] = useState([]);

  //creo un estado que luedo me servirá para editar la info
  //de un solo paciente...ese estado lo paso nivel a nivel, es decir
  //de App hacia ListadoPacientes y desde allí a Paciente
  const [paciente, setPaciente] = useState({});

  //almacenar en LS

  useEffect(() => {
    const obtenerLocalStorage = () => {
      const pacientesLs = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLs)
    }
    obtenerLocalStorage();
  }, [])

  //sincronizando el state

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  //para eliminar un paciente creo una función

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        />
        <ListadoPacientes 
        pacientes={pacientes} 
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
