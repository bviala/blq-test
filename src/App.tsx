import { useState } from 'react'
import classes from './App.module.css'
import Header from './Header'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className={classes.h1}>Vite + React</h1>
      <Header />
      <div className={classes.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
