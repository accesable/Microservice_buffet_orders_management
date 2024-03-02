import { useState } from 'react'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu/Menu';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import TableOrder from './components/TableOrders/TableOrder';
import OrderDetails from './components/OrderDetails/OrderDetails';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
    <TableOrder/>
    </>
  )
}

export default App
