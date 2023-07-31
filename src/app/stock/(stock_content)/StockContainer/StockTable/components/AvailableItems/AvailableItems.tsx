import { url } from '@/config/backendConfig';
import React, { useEffect, useState } from 'react'

type Props = {
    productName: string,
    setRe:(args:any)=>void,
    refetch:number
}

const AvailableItems = ({ productName,setRe,refetch }: Props) => {
    const [data, setData] = useState<{unit:string, qty: number, price: number}[]>([{unit: '', qty: 0, price: 0}]);

    useEffect(() => {
        fetch(`${url}history/available?name=${productName}`)
            .then((e) => e.json())
            .then(e => {
                setRe(()=>refetch+1);
                return setData(e);
            })
            .catch(err => {
                // //something went wrong('Something went wrong, Contact developer')
            })
    }, [productName])
  
    return (
        <div>
             {data?.map((v, i) => {
                if(v===undefined){
                    return <>Loading...</>
                }
                return <>
                    <p>{v.qty} {v.unit}</p>
                </>
            })} 
        </div>
    )
}

export default AvailableItems