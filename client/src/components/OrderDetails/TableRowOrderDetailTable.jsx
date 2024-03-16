import React,{useState} from 'react'
import { Table,Badge, Button } from 'flowbite-react'
import {statusBadgeMap} from '../statusBadgeMap';
function TableRowOrderDetailTable({detail}) {
    const [status, setStatus] = useState(detail.status);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStatusChange = async (newStatus) => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/orders/detail-status/${detail._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // Handle successful response
          const data = await response.json();
          console.log('Status updated:', data);
          setStatus(newStatus);
          // Optionally, refresh the data or update the UI to reflect the change
    
        } catch (error) {
          console.error('Error updating status:', error);
          // Optionally, handle the error, e.g., show an error message to the user
        }finally{
            setIsLoading(false);
        }
      };


  return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {detail.itemName}
            </Table.Cell>
            <Table.Cell>{detail.quantity}</Table.Cell>
            <Table.Cell>{detail.table}</Table.Cell>
            <Table.Cell><Badge className='inline font-bold ' color={statusBadgeMap[status].color}>{statusBadgeMap[status].text}</Badge></Table.Cell>
            <Table.Cell>
                <Button
                isProcessing={isloading}
                color='success'
                    className="font-medium  hover:underline dark:text-cyan-500"
                    onClick={() => handleStatusChange('confirmed')}>
                    Confirm
                </Button>
            </Table.Cell>
            <Table.Cell>
                <Button
                isProcessing={isloading}
                color='failure'
            className="font-medium  hover:underline dark:text-cyan-500"
            onClick={() => handleStatusChange('declined')}
            >
                Decline
            </Button>
            </Table.Cell>
        </Table.Row>
  )
}

export default TableRowOrderDetailTable