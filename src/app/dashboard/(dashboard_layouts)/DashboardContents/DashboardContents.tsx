import React from 'react'
import ProductStatus from '../ProductStatus/ProductStatus'
import SellsStatus from '../SellsStatus/SellsStatus'

type Props = {}

const DashboardContents = (props: Props) => {
    return (
        <div className='mx-5 my-2'>
            <div className='my-2'>
                <ProductStatus />
            </div>
            <div className='my-2'>
                <SellsStatus />
            </div>
        </div>
    )
}

export default DashboardContents