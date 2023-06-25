import PiChart from '@/Components/PiChart/PiChart'
import Table from '@/Components/Table/Table'
import React from 'react'

type Props = {}

const SellsStatus = (props: Props) => {
  return (
    <div className='lg:flex text-black'>
      <Table />
      <PiChart />
    </div>

  )
}

export default SellsStatus