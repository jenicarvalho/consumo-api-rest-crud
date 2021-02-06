import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [usuarios, setUsuarios] = useState<any>([])
  const [usuarioUpdate, setUsuarioUpdate] = useState<any>()

  const inputNome = useRef<HTMLInputElement>(null)

  const mostraUsuarios = () => {
    axios.get("http://localhost:4000/usuarios")
      .then(resposta => setUsuarios(resposta.data))
  }

  const enviarCadastro = () => {

    const requisicao = {
      name: inputNome.current?.value
    }
    axios.patch(`http://localhost:4000/usuarios/${usuarioUpdate}`, requisicao)
    mostraUsuarios()
  }

  useEffect(() => {
    mostraUsuarios()
  }, [])

  return (
    <div className="App">
      <p>id selecionado: {usuarioUpdate}</p>
      <input type="text" placeholder="Nome" ref={inputNome} />
      <button onClick={enviarCadastro}>Atualizar</button>

      <br/>

      <ul>
        
        { usuarios !== null && 
          usuarios.map((item: any) => (
            <li key={item.id}>{item.name} - {item.id}  <button onClick={() => setUsuarioUpdate(item.id)}>selecionar</button></li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
