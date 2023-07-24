import React, { useState } from 'react'
import StockTable from './StockTable/StockTable'
import StockSearch from './StockSearch/StockSearch'

type Props = {}

const StockContainer = (props: Props) => {

  return (
    <div className='md:mx-5 mt-5'>
        {/* <StockSearch/> */}
        <StockTable />
    </div>
  )
}

export default StockContainer