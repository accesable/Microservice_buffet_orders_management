import React, { useState } from 'react';
import { Table, Badge, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";

const OrderTableRow = ({ order, toggleRowExpansion }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={() => toggleRowExpansion(order._id)}>
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
            <Link to={`/payment/${order._id}`}>
                <Button>
                Create Payment
                </Button>
            </Link>
        </Table.Cell>
        <Table.Cell>
          <button>
            {expanded ? 'Collapse' : 'Expand'}
          </button>
        </Table.Cell>
      </Table.Row>
      {expanded && (
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
    </>
  );
};

export default OrderTableRow;
