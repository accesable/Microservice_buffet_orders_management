import { Button, Modal,List } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { clearCart } from '../redux/cartReducer';
function OrderDetailsConfirmModal({ openModal, setOpenModal }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const handleClearCart = () => {
        // Dispatch the clearCart action
        dispatch(clearCart());
        // Close the modal
        setOpenModal(false);
      };
  return (
    <>
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Order Cart</Modal.Header>
      <Modal.Body>
      {cartItems.length > 0 ? (
                        <List>
                            {cartItems.map((item, index) => (
                                <List.Item key={index}>
                                   Dish name : <span className='font-bold'>{item.itemName}</span> - Price $<span className='font-bold'>{item.itemPrice}</span> x {item.quantity} <span className='font-bold'>(Total: ${item.totalPrice.toFixed(2)})</span>
                                </List.Item>
                            ))}
                        </List>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Confirm All Details</Button>
          <Button color='failure' onClick={() => handleClearCart()}>Decline All Details</Button>
        </Modal.Footer>
    </Modal>
  </>
  )
}

export default OrderDetailsConfirmModal