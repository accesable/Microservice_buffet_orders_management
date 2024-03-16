import React from 'react'
import { Table } from 'flowbite-react'
function ServeOrderDetailsTable() {
  return (
      <Table hoverable>
        <Table.Head >
          <Table.HeadCell className='bg-green-700 text-green-300'>Ready to Serve</Table.HeadCell>
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

export default ServeOrderDetailsTable