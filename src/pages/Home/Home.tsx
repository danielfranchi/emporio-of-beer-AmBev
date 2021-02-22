import React from 'react';
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header/Header'

import { Provider } from 'react-redux'
import { store } from '../../store/store'

import '../Home/Home.scss'

import { useSelector } from 'react-redux'
import { Beer } from '../../store/ducks/ItenBeer/types'


const Home = () => {

  interface Bebidas{
    description: string,
    id: number,
    image: string,
    price: string
    title: string
  }

  const [bebidas, setBebidas] = React.useState<Bebidas[]>([])
  const token = localStorage.getItem("token")

  const headers = {
    'Authorization': `Bearer ${token}`
  }
  
  React.useEffect(() => {
    axios.get('http://localhost:4000/beers', {headers: headers})
     .then(resposta => setBebidas(resposta.data))
  }, [])

  return (
    <div className='home'>
      <Helmet>
        <title>Produtos</title>
      </Helmet>

      <Provider store={store}>
          <Header />
      </Provider>
      

      
      <div className='beers-list'>

      
      {bebidas !== null && bebidas.map((item: Bebidas) => (
        <div key={item.id} className='beer'>
          <img src={item.image} alt={item.title} />
          <h3>{item.description}</h3>
          <span>{item.title}</span>
          <small>{item.price}</small><br/>
          <Link to={`carrinho/${item.id}`}>Comprar</Link>
        </div>
      ))} 
      </div>
    </div>
  );
}

export default Home;
