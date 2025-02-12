import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencyExchangeForm from './components/ExchangeCurreny'
import CurrencySwap from './components/ExchangeCurrenyAnimaion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
   <CurrencyExchangeForm/>
   {/* <CurrencySwap/> */}
    </>
  )
}

export default App
