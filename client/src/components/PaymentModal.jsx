import React,{useState} from 'react';
import { Button, Modal,Alert } from 'flowbite-react';

const PaymentModal = ({fetchOrders, order, showModal,setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status ,setStatus] = useState('');
  const [message,setMessage] = useState('');
  const handleConfirmPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/Payments?numberOfPeople=${order.numberOfPeople}&pricePerPerson=40`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify({
          "orderId": order._id
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response data as needed
      const response2 = await fetch(`/api/orders/update-order-status/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify({
          "status": "finished"
        }),
      });

      if (!response2.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      const data1 = await response2.text();
      console.log('Payment confirmed:', data);
      console.log('Payment confirmed:', data1);

      setStatus('success');
      setMessage('Payment confirmed successfully');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('There was a problem with the fetch operation');
      setStatus('failure');
      setMessage('There was a problem with the fetch operation');
    } finally {
      setLoading(false);
      // Close the modal after payment confirmation
      setShowModal(false);
      fetchOrders();
    }
  };
  if (!order) {
    return null;
  }
  return (
    <Modal dismissible show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Order Details</Modal.Header>
      <Modal.Body>
        <h3>Table ID: {order.table}</h3>
        <p>Number Of People : {order.numberOfPeople}</p>  
        <p>Open At: {new Date(order.created_at).toLocaleString()}</p>
        <p>Closed At: {order.end_at ? new Date(order.end_at).toLocaleString() : 'Not yet'}</p>
        <h4>Order Details:</h4>
        <ul>
          {order.orderdetails.map((detail) => (
            <li key={detail._id}>
              Item Name: {detail.itemName}, Quantity: {detail.quantity}, Table: {detail.table}, Status: {detail.status}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer className='flex justify-between'>
          <div className="">
            <h1>Total Price : $ {order.numberOfPeople * 40} </h1>
          </div>
          <div className="flex gap-2">
            <Button  onClick={() => setShowModal(false)}>Close</Button>
            <Button color='success' onClick={() => handleConfirmPayment()}>Confirm Payment</Button>
          </div>
      </Modal.Footer>
      {status === 'success' && (
                <Alert color="success">{message}</Alert>
            )}
            {status === 'failure' && (
                <Alert color="failure">{message}</Alert>
            )}
    </Modal>
  );
};

export default PaymentModal;
