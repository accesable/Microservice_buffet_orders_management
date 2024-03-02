import React, { useEffect, useState } from 'react'
// import "../styling/Menu.css"
import MenuItem from './MenuItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { fetchMenuItems,getAllOrders } from './menuService';
function Menu() {

    const [menuItems, setMenuItems] = useState([]);
    const [orders,setOrders] = useState([]);

    useEffect(() => {
      const fetchItems = async () => {
        const items = await fetchMenuItems();
        setMenuItems(items);
      };

      const fetchOrders = async () => {
        const orders = await getAllOrders();
        console.log(orders)
        setOrders(orders)
      }
  
      fetchItems();
      fetchOrders();
    }, []);


  return (
<div className="container-fluid">
  <div className="row">
  <div className="col-10">
            <div className="row">
            <Container fluid>
    <Row>
    {menuItems.map((item, itemIndex) => (
      <div key={item.id} className='col-3'>
        <MenuItem    id = {item.id}  name = {item.name} description = {item.description} />
      </div>
    ))}
    </Row>
  </Container>
            </div>
        </div>
        <div className="col-2">
            <div className="p-3 border bg-light">Sidebar</div>
        </div>
  </div>
</div>

  )
}

export default Menu