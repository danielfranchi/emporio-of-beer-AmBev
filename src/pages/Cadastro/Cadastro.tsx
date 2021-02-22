import React, { useRef } from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'

import '../../pages/Cadastro/Cadastro.scss'

const Cadastro = () => {

  const [estado, setEstado] = React.useState<any>(false)
  const [verifica, setVerifica] = React.useState<any>(false)

  const name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const age = useRef<HTMLInputElement>(null)

  const cadastrar = () => {
    const idade =  Number(age.current?.value)

    if(idade >= 18){

    const requisicao = {
      name: name.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      age: age.current?.value
    }

    axios.post('http://localhost:4000/register', requisicao)
      .then((resposta) => {
            localStorage.setItem("token", resposta.data.accessToken)
            
            if (resposta.status === 201) {
              setEstado(true)
            }
        }
      )}else{
        setVerifica(true)
      }
    }
    
      return(
        <div className='img'>

          <Helmet>
            <title>Empório da Cerveja</title>
          </Helmet>

          <div className='form'>


            <div>

              <p>Bem-vindo a loja oficial das maiores cervejarias do mundo. Antes de continuar</p>
              <p> <strong>Você tem 18 anos ou mais?</strong> </p>
              
              <input type="text" placeholder='nome' ref={name} /> <br/>
              
              <input type="email" placeholder='e-mail' ref={email} /> <br/>
          
              <input type="password" placeholder='senha' ref={password} /><br/>

              <input type="text" placeholder='idade' ref={age} /> <br/>
            
              <button onClick={cadastrar}>Cadastrar</button>

              <span>{ verifica  && 'Proibido a venda de bebidas alcoólicas para menores de 18 anos'}</span>
            </div>
            
        </div>
          
          { 
            estado ?
            <Redirect to="/home" />
            :
            null
          }

         
        </div> 
      )    
}

export default Cadastro;



