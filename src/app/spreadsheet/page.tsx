"use client"
import Drawer from '@/Components/Drawer/Drawer'
import React from 'react'
import Sheet from './Sheet/Sheet'

type Props = {}

const spreadsheet = (props: Props) => {
  return (
    <div>
      <Drawer>
        <div className='w-full'>
          <h1 className='text-4xl subpixel-antialiased font-sans font-thin m-5'>Spreadsheet</h1>
          <Sheet/>
        </div>
      </Drawer>
    </div>
  )
}

export default spreadsheet