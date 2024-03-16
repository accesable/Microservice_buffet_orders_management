import { Button, Modal,List, Alert } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { clearCart,setError,setLoading } from "../../redux/cartReducer";
function OrderDetailsConfirmModal({ openModal, setOpenModal ,orderId }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isLoading = useSelector((state) => state.cart.loading);
    const [message,setMessage] = useState('');
    const [status ,setStatus] = useState('');


    const handleConfirmDetails = async () => {
      dispatch(setLoading(true));
      try {
          const response = await fetch(`http://localhost:8085/api/orders/append-details/${orderId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                  cartItems
                  // You can add other order-related fields here
              ),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          // Handle the response data as needed
          const data = await response.json();
          console.log('Order confirmed:', data);

          // Optionally clear the cart after successful confirmation
          dispatch(clearCart());
          dispatch(setError(null));
          setStatus('success');
          setMessage('Order Details confirmed successfully');

      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          dispatch(setError('There was a problem with the fetch operation'));
          setStatus('failure');
          setMessage('There was a problem with the fetch operation');
      } finally {
        dispatch(setLoading(false));
      }
  };
    const handleClearCart = () => {
        // Dispatch the clearCart action
        dispatch(clearCart());
        // Close the modal
        setOpenModal(false);
      };
      const resetStatus= () =>{
        setStatus('')
      }
  return (
    <>
    <Modal dismissible show={openModal} onClose={() => {setOpenModal(false);resetStatus()}}>
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
          <Button disabled={cartItems.length ===0} isProcessing={isLoading} onClick={() => handleConfirmDetails()}>Confirm All Details</Button>
          <Button disabled={cartItems.length ===0} color='failure' onClick={() => handleClearCart()}>Decline All Details</Button>
        </Modal.Footer>
        {status === 'success' && (
                <Alert color="success">{message}</Alert>
            )}
            {status === 'failure' && (
                <Alert color="failure">{message}</Alert>
            )}
    </Modal>
  </>
  )
}

export default OrderDetailsConfirmModal