import { url } from '@/config/backendConfig'
import React, { useEffect, useState } from 'react'

type Props = {
    productName:string
}

const SoldItem = ({productName}: Props) => {
    const [data, setData] = useState<{unit:string, qty: number, price: number}[]>([{unit: '', qty: 0, price: 0}]);


    useEffect(() => {
        fetch(`${url}history/sold?name=${productName}`)
            .then((e) => e.json())
            .then(e => setData(e))
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }, [])
    


    return (
        <div>
            {data?.map((v,i)=>{
                return <>
                    <p>{v.qty} {v.unit} / ৳{v.price}</p>
                </>
            })}
        </div>
    )
}

export default SoldItem