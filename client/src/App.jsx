import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import FooterCom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Test from './pages/Test';
const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/menu/:orderId" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orderdetails" element={<OrderDetails />} />
        <Route path="/test" element={<Test />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  );
}

export default App;
