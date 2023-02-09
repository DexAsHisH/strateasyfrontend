import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Button} from '@mui/material'
import './App.scss'
import { Header } from './components/Header'
import { Home } from './views/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
     <Header/>
      <div className="content">
        <Home/>
      </div>
    </div>
  )
}

export default App
