import Card from '@/Components/Card/Card'
import LineChart from '@/Components/LineChart/LineChart'
import React from 'react'

type Props = {}

const ProductStatus = (props: Props) => {
    return (
        <div className='lg:flex justify-center'>
            <div className='mt-4'>
                <div className='w-full sm:flex mb-2'>
                    <Card></Card>
                    <Card></Card>
                </div>
                <div className='w-full sm:flex mt-4'>
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>
            <div className='bg-base-100 w-full card mx-2 mt-4 shadow-xl'>
                <LineChart />
            </div>
        </div>
    )
}

export default ProductStatus