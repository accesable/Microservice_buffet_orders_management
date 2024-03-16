import React from 'react'
import { Table } from 'flowbite-react'
function PreparingOrderDetailsTable() {
  return (
    <Table hoverable>
        <Table.Head >
          <Table.HeadCell className='bg-blue-400'>Is Preparing</Table.HeadCell>
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

export default PreparingOrderDetailsTable