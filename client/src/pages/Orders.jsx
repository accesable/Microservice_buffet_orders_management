import React,{useState,useEffect} from 'react'
import { Table,Badge, Button,TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom';
import {statusBadgeMap} from '../components/statusBadgeMap';
import LoadingSpinner from '../components/LoadingSpinner';
import { IoIosAddCircleOutline } from "react-icons/io";
import PaymentModal from '../components/PaymentModal';
import fetchWithAuth from '../services/fetchWithAuth';
import { useSelector } from 'react-redux';
function Orders() {
  const [table, setTable] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const {currentUser} = useSelector(state => state.user)
  if(currentUser.roles.includes('Chief Staff')){
    return <h1>Unauthorized Route</h1>
  }

  const handlePaymentButtonClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };


    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null); // Reset previous errors

      try {
        const response = await fetchWithAuth('/api/orders/orderstatus/occupied');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };



    useEffect(() => {
    
        fetchOrders();
      }, []);
      const toggleRowExpansion = (orderId) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(orderId)) {
          newExpandedRows.delete(orderId);
        } else {
          newExpandedRows.add(orderId);
        }
        setExpandedRows(newExpandedRows);
      };
      const handleCreateOrder = async () => {
        try {
          const response = await fetchWithAuth(`/api/orders/create-order/${table}/people/${numberOfPeople}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              table: parseInt(table),
              numberOfPeople: parseInt(numberOfPeople),
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // Handle the response data as needed
          const data = await response.json();
          console.log('Order created:', data);
    
          // Optionally do something after the order is created, such as showing a success message or redirecting
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          // Optionally handle errors, e.g., display an error message to the user
        }finally{
          setIsAdding(false);
          fetchOrders();
        }
      };
      if (isLoading) {
        return <div><LoadingSpinner/></div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }



  return (

    <div className='flex justify-center'>
        <PaymentModal order={selectedOrder} showModal={showModal} fetchOrders={fetchOrders} setShowModal={setShowModal}  />

        <Table hoverable>
        <Table.Head>
          <Table.HeadCell colSpan={4}>
        {isAdding ? (<div className='flex gap-2'>
          <TextInput id="table" onChange={(e) => setTable(e.target.value)} type="number" placeholder="table  : 1 ,2 ,3" required />
          <TextInput id="numberOfPeople" onChange={(e) => setNumberOfPeople(e.target.value)} type="number" placeholder="number or people  : 1 ,2 ,3" required />
          <Button color='failure'  onClick={()=>setIsAdding(false)}>Cancel</Button>
          <Button color='success'  onClick={()=>handleCreateOrder()}>Create</Button>
        </div>) : <Button color='blue' onClick={()=>setIsAdding(true)}>
            <IoIosAddCircleOutline/>  Add Order
          </Button>}
          </Table.HeadCell>
        </Table.Head>
        <Table.Head>
          <Table.HeadCell>Table ID</Table.HeadCell>
          <Table.HeadCell>Open At</Table.HeadCell>
          <Table.HeadCell>Closed At</Table.HeadCell>
          <Table.HeadCell>Number of Order Details</Table.HeadCell>
          <Table.HeadCell>Number of People</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.map((order) => (
            <React.Fragment key={order._id}>
            <Table.Row  className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={() => toggleRowExpansion(order._id)}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order.table}
              </Table.Cell>
              <Table.Cell>{new Date(order.created_at).toLocaleString()}</Table.Cell>
              <Table.Cell>{order.end_at ? new Date(order.end_at).toLocaleString() : 'Not yet'}</Table.Cell>
              <Table.Cell>{order.orderdetails.length}</Table.Cell>
              <Table.Cell>{order.numberOfPeople}</Table.Cell>
              <Table.Cell>
                <Link to={`/menu/${order._id}`}>Add Details</Link>
              </Table.Cell>
              <Table.Cell>
              <Button onClick={() => handlePaymentButtonClick(order)}>
                Create Payment
              </Button>
              </Table.Cell>
              <Table.Cell>
                  <button>
                    {expandedRows.has(order._id) ? 'Collapse' : 'Expand'}
                  </button>
                </Table.Cell>
            </Table.Row>
            {expandedRows.has(order._id) && (
                <Table.Row className="bg-gray-100 dark:bg-gray-700">
                  <Table.Cell colSpan="5">
                    <div>
                      <h3>Order Details:</h3>
                      <ul>
                        {order.orderdetails.map((detail) => (
                          <li key={detail._id}>
                            Item Name : {detail.itemName}, Quantity: {detail.quantity}, Table : {detail.table}, Status : <Badge className='inline font-bold ' color={statusBadgeMap[detail.status].color}>{statusBadgeMap[detail.status].text}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Orders