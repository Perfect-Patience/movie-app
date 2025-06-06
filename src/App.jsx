

import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'

function App() {
 
  return (
    <><div className='w-full h-screen bg-[url("src/assets/sample.jpg")] flex flex-col  bg-no-repeat bg-cover bg-center'>
     <NavBar />
    <HomePage />
    </div>
    </>
  )
}

export default App
