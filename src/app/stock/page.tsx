"use client"
import Drawer from '@/Components/Drawer/Drawer'
import React from 'react'
import StockContainer from './(stock_content)/StockContainer/StockContainer'

type Props = {}

const stock = (props: Props) => {
  return (
    <div>
      <Drawer>
        <div className='w-full'>
          <h1 className='text-4xl subpixel-antialiased font-sans font-thin m-5'>Stock</h1>
          <StockContainer/>
        </div>
      </Drawer>
    </div>
  )
}

export default stock