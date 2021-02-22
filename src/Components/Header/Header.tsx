import React, { useState } from 'react';
import axios from 'axios'
import { Helmet } from 'react-helmet'

import { useSelector } from 'react-redux'
import { Beer } from '../../store/ducks/ItenBeer/types'

import '../Header/Header.scss'
import Logo from '../../images/logo-img.svg'
import Logo1 from '../../images/logo.svg'
import { BiCartAlt } from "react-icons/bi";


const Header = () => {
  const price2 = useSelector((state: Beer) => state.itemBeer.itensBerrs.filter((item) => {
    return item.qtd >= 0
  }))

  console.log(price2)

  const price = price2.reduce((a, b) => {
    return a + (b.qtd * (Number(b.price.replace('R$ ', '').replace(',', '.'))))
  }, 0)

  const [produtos, setProduto] = React.useState<string[]>([])
  const token = localStorage.getItem("token")

  const headers = {
    'Authorization': `Bearer ${token}`
  }
  
  React.useEffect(() => {
    axios.get('http://localhost:4000/categories', {headers: headers})
     .then(resposta => setProduto(resposta.data))
  }, [])
  
  return (
    <div className='header'>
      <Helmet>
        <title>Produtos</title>
      </Helmet>

      <header className='menus'>
        <img src={Logo} alt='logo' className='img'/>
        <img src={Logo1} alt='logo' />

        <ul>
          {produtos.map((item, i) => (
            <li key={i}> {item} |</li>
          ))}
        </ul>

        <div>
          <BiCartAlt />
          <p>{price >= 0 && price.toFixed(2)}</p>
        </div>
      </header>
    </div>
  );
}

export default Header;
