import React from 'react'
import { Table } from 'flowbite-react'
function ConfirmedOrderDetailsTable() {
  return (
    <Table hoverable>
        <Table.Head>
            <Table.HeadCell className='bg-green-400'>Confirmed Orders</Table.HeadCell>
        </Table.Head>
        <Table.Head >
        <Table.HeadCell>Dish Name</Table.HeadCell>
        <Table.HeadCell>Confirmed Orders</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row>
            <Table.Cell>
              Mala Hotpot
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Mala Hotpot
            </Table.Cell>
          </Table.Row>
            
        </Table.Body>
    </Table>
  )
}

export default ConfirmedOrderDetailsTable