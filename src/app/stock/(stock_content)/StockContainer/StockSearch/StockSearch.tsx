import React, { useEffect } from 'react'

type Props = {}

const StockSearch = (Props: Props) => {

    return (
        <div className='my-5 w-full rounded-xl'>
            <input type="text" placeholder="Search..." className="input input-bordered w-full shadow-xl" />
        </div>
    )
}

export default StockSearch