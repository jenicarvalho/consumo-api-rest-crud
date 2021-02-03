import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [usuarios, setUsuarios] = useState<any>([])

  const inputNome = useRef<HTMLInputElement>(null)
  const inputIdade = useRef<HTMLInputElement>(null)
  const inputEmpresa = useRef<HTMLInputElement>(null)
  const inputTelefone = useRef<HTMLInputElement>(null)

  const mostraUsuarios = () => {
    axios.get("http://localhost:4000/usuarios")
      .then(resposta => setUsuarios(resposta.data))
  }

  const enviarCadastro = () => {

    const requisicao = {
      name: inputNome.current?.value,
      age: inputIdade.current?.value,
      company: inputEmpresa.current?.value,
      phone: inputTelefone.current?.value
    }

    axios.post("http://localhost:4000/usuarios", requisicao)
    mostraUsuarios()
  }

  useEffect(() => {
    mostraUsuarios()
  }, [])

  const deletarUsuario = (id: any) => {
    axios.patch(`http://localhost:4000/usuarios/${id}`)
    mostraUsuarios()
  }

  return (
    <div className="App">
      <input type="password" placeholder="Nome" ref={inputNome} />
      <input type="text" placeholder="Idade" ref={inputIdade} />
      <input type="text" placeholder="Empresa" ref={inputEmpresa} />
      <input type="text" placeholder="Telefone" ref={inputTelefone} />
      <button onClick={enviarCadastro}>Cadastrar</button>

      <br/>

      <ul>
        
        { usuarios !== null && 
          usuarios.map((item: any) => (
            <li key={item.id}>{item.name}  <button onClick={() => deletarUsuario(item.id)}>X</button></li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
