import React from 'react'
import axios from 'axios'

import Header from '../../Components/Header/Header'

import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { useDispatch, useSelector}  from 'react-redux'
import { itensBeer } from '../../store/ducks/ItenBeer/action'
import { Redirect } from 'react-router-dom'

import { AiOutlineArrowRight } from "react-icons/ai";
import { Beer, ItemBeer } from '../../store/ducks/ItenBeer/types'

import '../../Components/Carrinho/Carrinho.scss'

const Carrinhos = () => {

  const [concluir, setConcluir] = React.useState<Boolean>(false)
  const [voltar, setVoltar] = React.useState<Boolean>(false)


  const concluido = () => {
    setConcluir(true)
    dispatch({type: 'ZERA_CARRINHO'})
  }

  const home = () => {
    setVoltar(true)
    dispatch({type: 'CLEAR_CART'})

  }

  const dispatch = useDispatch()

  const aa  = useSelector((state: Beer) => state.itemBeer.itensBerrs.filter((item) =>{
    return item.qtd >= 0
    })
  )


  const total2 = useSelector((state: Beer) => state.itemBeer.itensBerrs.filter((item) => {
    return item.qtd >= 0
  }))

  const total  = total2.reduce((acc,cur) =>{
    return acc + cur.qtd
  }, 0)

  const params = useParams<any>()
  const token = localStorage.getItem("token")

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  React.useEffect(() => {
    axios.get(`http://localhost:4000/beers/${params.id}`, {headers: headers} )
     .then(resposta => dispatch(itensBeer(resposta.data)))
  }, [])

  return (
    <div className='carrinho'>
      <Helmet>
        <title>Comprar</title>
      </Helmet>

      <Provider store={store}>
        <Header />
      </Provider>

      <div>
        <button onClick={home}><strong>Voltar</strong></button>
      </div>

      <div>
        <strong>Meu Carrinho </strong>
        <button onClick={concluido}> <AiOutlineArrowRight /> </button>
        <hr/>
      </div>

      {aa.map((item: ItemBeer , i:any) => (
        <div className='item' key={i}>
          <img src={item.image} alt={item.title}/>
          <h3>{item.description}</h3>
          <span>{item.title}</span>
          <small>{item.price}</small>
          <div>
            <button onClick={() => dispatch({type: 'ADD_CART', id: item.id})}>+</button>
              {item.qtd} 
            <button onClick={() => dispatch({type: 'REMOVE_CART', id: item.id})}>-</button> 
          </div>         
        </div>
        ))
      }

      { 
        voltar ?
        <Redirect to="/home" />
        :
        null
      }

      {      
        concluir ?
        <h1>Seu pedido foi finalizado</h1>
        :
        null
      }

      <span>{total >= 0 && <p>total: {total}</p>}</span>
      
    </div>
  );
}

export default Carrinhos;