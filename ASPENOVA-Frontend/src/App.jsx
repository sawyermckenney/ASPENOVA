import React from 'react'
import HamburgerMenu from './componenets/hamburgerMenu'
import "./App.css"
import Background from './componenets/backGround.jsx'
import Hero from './componenets/hero.jsx'
const App = () => {
  return (
    <div>
      <Background/>
      <HamburgerMenu/>
      <Hero/>
    </div>
  )
}

export default App
