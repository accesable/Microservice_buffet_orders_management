import React,{useState,useEffect} from 'react'
import { Table,Badge } from 'flowbite-react'
import { Link } from 'react-router-dom';
function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedRows, setExpandedRows] = useState(new Set());
    useEffect(() => {
        const fetchOrders = async () => {
          setIsLoading(true);
          setError(null); // Reset previous errors
    
          try {
            const response = await fetch('http://localhost:8085/api/orders');
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
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      const statusBadgeMap = {
        'pending': { color: 'warning', text: 'Pending' },
        'confirmed': { color: 'success', text: 'Confirmed by the chief staff' },
        'declined': { color: 'failure', text: 'Declined by the chief staff' },
        'out': { color: 'failure', text: 'This Food Item is out of ingredients' },
      };
  return (
    <div className='flex justify-center'>
        <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Table ID</Table.HeadCell>
          <Table.HeadCell>Open At</Table.HeadCell>
          <Table.HeadCell>Closed At</Table.HeadCell>
          <Table.HeadCell>Number of Order Details</Table.HeadCell>
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
              <Table.Cell>
                <Link to={`/menu/${order._id}`}>Add Details</Link>
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
                            Item ID: {detail.itemId}, Quantity: {detail.quantity}, Status : <Badge className='inline font-bold ' color={statusBadgeMap[detail.status].color}>{statusBadgeMap[detail.status].text}</Badge>
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