import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from "../../assets/R.jpg"
import api from '../../utils/api';
import "../../styling/MenuItem.css"
function MenuItem(props) {
    const { id, name, description } = props;

    const [quantity,setQuantity] = useState(0);

    const handleChangeQuantity = (event) => {
      setQuantity(event.target.value);
    };


  return (
    <Card id={id} > 
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
            {description}
        </Card.Text>
        <Button variant="primary">Add To Food Cart</Button>
        <div style={{display:'inline-block', marginLeft : '5px'}} className='quantity'>
        <input type="number" name="quantity" min={0} max={10} id="quantity" defaultValue={0} onChange={handleChangeQuantity} />
        </div>

      </Card.Body>
    </Card>
  )
}

export default MenuItem