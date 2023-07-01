"use client"
import Drawer from '@/Components/Drawer/Drawer'
import React, { useState } from 'react'
import AnalysisTable from './AnalysisTable/AnalysisTable'

type Props = {}

const analysis = (props: Props) => {

  return (
    <div>
      <Drawer>
        <div className='w-full'>
          <h1 className='text-4xl subpixel-antialiased font-sans font-thin m-5'>Analysis</h1>
          <AnalysisTable/>
        </div>
      </Drawer>
    </div>
  )
}

export default analysis