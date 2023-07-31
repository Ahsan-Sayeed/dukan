import { url } from '@/config/backendConfig';
import React, { useState } from 'react';

const icons = {
    edit: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Edit"><g><path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path><path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path></g></g></svg>,
    delete: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
}

type Props = {
    setRe: any,
    refetch: number,
    v: {
        _id: string,
        details: {
            date: string,
            quantity: string | number,
            unit: string,
            perUnitPrice: string | number
            _id: string
        }[],
        unit: string[]
    },
}

const DetailsTable = ({ setRe, refetch, v }: Props) => {

    //Details history update
    const date = new Date();
    const [getDate, setDate] = useState(date.toISOString().split('T')[0]);
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState('');

    const updateDetails = (id: string | undefined) => {
        const dateModify = getDate.split('-');

        if (unit !== '' && qty !== 0 && price !== 0) {
            fetch(`${url}stockdetails/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        date: [dateModify[1], dateModify[2], dateModify[0]].join('/'),
                        unit: unit,
                        quantity: qty,
                        perUnitPrice: price,
                    }
                )
            })
                .then(e => {
                    if (e.status === 200) {
                        //refetch
                        setUnit('');
                        setPrice(0);
                        setQty(0);
                        setRe(() => refetch + 1);
                    }
                })
                .catch(err => {
                    //something went wrong('Something went wrong, Contact developer')
                })
        }

    }

    //details history modification
    const [editDetails, setEditDetails] = useState<boolean>(false);
    const [selectDtl, setSelectDtl] = useState<{ _id: string | undefined, idx: number | undefined }>({ _id: '', idx: 0 })

    const selectionDetails = (idx: number | undefined, _id: string | undefined,itemId:string) => {
        setEditDetails(!editDetails)
        setSelectDtl({ _id, idx });

        setQty(Number(v?.details?.find((vx,ix)=>vx._id===itemId)?.quantity));
        setPrice(Number(v?.details?.find((vx,ix)=>vx._id===itemId)?.perUnitPrice));
        setUnit(v?.details?.find((vx,ix)=>vx._id===itemId)?.unit+'');
    }

    const handleUpdateDetails = (id: string | undefined) => {
        setEditDetails(!editDetails);
        const dateModify = getDate.split('-');
        

        if (price !== 0 && qty !== 0 && unit !== "") {
            fetch(`${url}updatestockdetails/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        date: [dateModify[1], dateModify[2], dateModify[0]].join('/'),
                        unit: unit,
                        quantity: qty,
                        perUnitPrice: price,
                    }
                )
            })
                .then(e => {
                    if (e.status === 200) {
                        //refetch
                        setQty(0);
                        setPrice(0);
                        setUnit('');
                        setRe(() => refetch + 1);
                    }
                })
                .catch(err => {
                    //something went wrong('Something went wrong, Contact developer')
                })
        }
    }

    //details history deletation
    const detailsDelete = (id: string | undefined, itemId: string | undefined) => {
        setEditDetails(!editDetails);

        fetch(`${url}deletetockdetails/${id}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch
                    setRe(() => refetch + 1);
                }
            })
            .catch(err => {
                //something went wrong('Something went wrong, Contact developer')
            })
    }





    return (
        <div style={{ maxHeight: '115px', overflow: 'scroll', overflowX: 'hidden' }}>
            <table>
                <tr style={{ position: 'sticky', top: -1, borderWidth: 0 }} className='bg-base-300'>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>

                {
                    !editDetails &&
                    <tr>
                        <td className='border border-0 py-1 bg-orange-100'>
                            <input type="date" onChange={(e) => setDate(e.target.value)} defaultValue={date.toISOString().split('T')[0]} name="" id="" className='m-0 p-0 w-full text-center bg-orange-100' />
                        </td>
                        <td className='bg-orange-100  border border-0 border-s-2 border-e-2 px-1'>
                            <input type="number" name="" onChange={(e) => setQty(Number(e.target.value))} defaultValue={0} placeholder='Qty' className='m-0 p-0 text-center w-10 bg-orange-100' />
                            <select name="" id="" onChange={(e) => setUnit(e.target.value)} className='bg-orange-100'>
                                <option value="" disabled selected>Select</option>
                                {
                                    v?.unit.map((dt, id) => <option value={dt} key={id}>{dt}</option>)
                                }

                            </select>
                        </td>
                        <td className='flex items-center justify-center bg-orange-100' style={{ borderWidth: '0' }}>
                            <input type="number" onChange={(e) => setPrice(Number(e.target.value))} defaultValue={0} name="" placeholder='Price per unit'
                                className='text-center w-full pt-1 pb-1 bg-orange-100' style={{ borderWidth: '0' }} />
                            <button className='px-2 bg-error text-white hover:bg-neutral py-1' onClick={() => updateDetails(v?._id)}>+</button>
                        </td>
                    </tr>
                }


                {
                    v?.details.map((item, idx) => {
                        return (
                            <tr key={idx} >
                                <td className='border border-s-0'>
                                    {
                                        !editDetails ?
                                            item?.date :
                                            (
                                                selectDtl._id === v._id && selectDtl.idx === idx
                                                    ?
                                                    <input type="date" onChange={(e) => setDate(e.target.value)}
                                                        defaultValue={date.toISOString().split('T')[0]} name="" id="" className={`m-0 p-0 w-full text-center`} />
                                                    :
                                                    <>
                                                        {item?.date}
                                                    </>
                                            )
                                    }
                                </td>
                                <td>{
                                    !editDetails ?
                                        item?.quantity
                                        : (
                                            selectDtl._id === v._id && selectDtl.idx === idx
                                                ?
                                                <input type="number" onChange={(e) => setQty(Number(e.target.value))} defaultValue={Number(item?.quantity)}
                                                    placeholder='Price per unit'
                                                    className={`w-10 m-0 p-0 text-center`}
                                                    style={{ borderWidth: '0', visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }} />
                                                :
                                                <>
                                                    {item?.quantity}
                                                </>
                                        )
                                }

                                    {
                                        !editDetails ?
                                            item?.unit
                                            : (
                                                selectDtl._id === v._id && selectDtl.idx === idx
                                                    ?
                                                    <select name="" id="" onChange={(e) => setUnit(e.target.value)} defaultValue={item?.unit} style={{ visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }}>
                                                        <option value="" disabled selected>Select</option>
                                                        {
                                                            v?.unit.map((dt, id) => <option value={dt} key={id}>{dt}</option>)
                                                        }
                                                    </select>
                                                    :
                                                    <>
                                                        {item?.unit}
                                                    </>
                                            )

                                    }

                                </td>
                                <td className='flex justify-center border-e-0'>
                                    {
                                        !editDetails ?
                                            <div className='w-full py-1' >৳{item?.perUnitPrice}</div>
                                            : (selectDtl._id === v._id && selectDtl.idx === idx
                                                ?
                                                <input type="number" onChange={(e) => setPrice(Number(e.target.value))} defaultValue={Number(item?.perUnitPrice)}
                                                    placeholder='Price per unit'
                                                    className={`w-full py-1 border border-0 m-0 p-0 text-center `}
                                                    style={{ borderWidth: '0', visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }} />
                                                :
                                                <>
                                                    <div className='w-full py-1' >৳{item?.perUnitPrice}</div>
                                                </>
                                            )
                                    }

                                    {!editDetails ?
                                        <button className='px-2 hover:text-red onHoverRed' onClick={() => selectionDetails(Number(idx), v?._id?.toString(),item._id.toString())}>{icons.edit}</button>
                                        :
                                        <div className={`flex`} style={{ visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }}>
                                            <button className='px-2 mx-0 bg-[#22c55e] text-white hover:bg-neutral rounded' onClick={() => handleUpdateDetails(item?._id)}>✓</button>
                                            <button className='px-2 mx-1 bg-[#b91c1c] text-white hover:bg-neutral rounded' onClick={() => selectionDetails(Number(0), '','')}>✕</button>
                                            <button className='px-2 mx-0 bg-[#f87171] text-white hover:bg-neutral rounded' onClick={() => detailsDelete(v?._id, item?._id)}>{icons.delete}</button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        )
                    }).reverse()
                }

            </table>
        </div>
    )
}

export default DetailsTable;