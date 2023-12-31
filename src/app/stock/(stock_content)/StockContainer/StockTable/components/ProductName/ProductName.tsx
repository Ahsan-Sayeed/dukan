import React, { useEffect } from 'react'

type Props = {
    editRecord: boolean,
    v: any
    selectRecord: any,
    idx: number,
    handleProductName: any,
    setProductName: (args: any) => any
}

const ProductName = ({ editRecord, v, selectRecord, idx, handleProductName, setProductName }: Props) => {
   useEffect(()=>{
    if(v._id===selectRecord.id){
        setProductName(v.name)
    }
   },[selectRecord])

    return (
        <div>{!editRecord ?
            <span>{v?.name}</span> :
            <>
                <input type="text" name="" defaultValue={v?.name} placeholder='Product Name' className={`m-0 p-0 text-center text-red-600 font-bold w-24 ${selectRecord.idx === idx ? 'visible bg-red-100' : 'hidden'}`}
                    onChange={handleProductName} />
                <span className={`${selectRecord.idx === idx ? 'hidden' : 'visible'}`}>{v?.name}</span>
            </>
        }</div>
    )
}

export default ProductName