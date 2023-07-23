import React, { useEffect, useRef, useState } from 'react'
import './StockTable.css'
import { url } from '@/config/backendConfig'

type Props = {}

const stockDetails = [
    {
        _id: '',
        name: "chatni",
        unit: ['packet', 'Pice', 'Bosta'],
        details: [
            {
                date: '7/3/23',
                unit: 'packet',
                quantity: 30,
                perUnitPrice: 55,
                _id: 'asg'
            }
        ],
        sold: [
            {
                unit: 'packet',
                qty: 2,
                singlePrice: 0
            },
            {
                unit: 'pice',
                qty: 4,
                singlePrice: 0
            },
            {
                unit: 'Bosta',
                qty: 8,
                singlePrice: 0
            }
        ],
    }
]

const icons = {
    edit: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Edit"><g><path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path><path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path></g></g></svg>,
    delete: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
}

const StockTable = (props: Props) => {
    const date = new Date();
    const defaultUnits = ["পিছ", "পাতা", "প্যাকেট", "কেজি", "কার্টুন", "বস্তা", "বান্ডেল", "ডজন", "মি.লি", "লিটার"]
    const [selectUnits, setSelectUnits] = useState<string[]>([])
    const [productName, setProductName] = useState<string>('')

    const [data, setData] = useState(stockDetails);
    const [addBtn, setAddBtn] = useState(false);
    const [refetch, setRe] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${url}stock?name=${search}`)
            .then((e) => e.json())
            .then(e => setData(e))
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }, [refetch, search]);

    const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(e?.target.value)
        setSelectUnits(prev => [...prev, e?.target?.value])
    }
    const removeIems = (e: string) => {
        setSelectUnits(() => selectUnits.filter((v) => v !== e))
    }

    const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e?.target.value);
    }

    const addToDB = (v: boolean) => {
        setAddBtn(v);

        if (!v && productName !== '' && selectUnits.length > 0) {
            let x = selectUnits.map((v, i) => ({ unit: v, qty: 0, singlePrice: 0 }));

            fetch(`${url}stock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: productName,
                        unit: [...new Set<string | undefined>(selectUnits)],
                        details: [],
                        available: x.filter(({ unit }, index) => !x.map(({ unit }) => unit).includes(unit, index + 1)),
                        sold: x.filter(({ unit }, index) => !x.map(({ unit }) => unit).includes(unit, index + 1)),
                    }
                )
            })
                .then(e => {
                    if (e.status === 200) {
                        //refetch
                        setRe(() => refetch + 1);
                    }
                })
                .catch(err => {
                    alert('Something went wrong, Contact developer')
                })

        }
        setProductName('');
        setSelectUnits(() => []);
    }

    const [editRecord, setEditRecord] = useState<boolean>(false);
    const [selectRecord, setSelectRecord] = useState<{ id: string | undefined, idx: number | undefined }>({ id: '', idx: -1 })

    const recordSelection = (id: string | undefined, idx: number | undefined) => {
        setSelectRecord({ id, idx })
        setEditRecord(!editRecord);
    }

    const resetSelection = () => {
        setEditRecord(!editRecord);
        setSelectRecord({ id: '', idx: -1 })
        setSelectUnits(() => [])
    }

    const handleUpdateRecord = (id: string | undefined) => {
        const data = selectUnits.map((v, i) => ({ unit: v, qty: 0 }));
        if (productName !== '' && selectUnits.length > 0) {
            fetch(`${url}stock/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productName, data })
            })
                .then(e => {
                    if (e.status === 200) {
                        //refetch
                        resetSelection();
                        setRe(() => refetch + 1);
                    }
                })
                .catch(err => {
                    alert('Something went wrong, Contact developer')
                })
        }
    }

    const handleDeleteRecord = (id: string | undefined) => {
        fetch(`${url}stock/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch
                    resetSelection();
                    setRe(() => refetch + 1);
                }
            })
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }


    //Details history update
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
                        setRe(() => refetch + 1);
                    }
                })
                .catch(err => {
                    alert('Something went wrong, Contact developer')
                })
            setUnit('');
            setPrice(0);
            setQty(0);
        }

    }

    //details history modification
    const [editDetails, setEditDetails] = useState<boolean>(false);
    const [selectDtl, setSelectDtl] = useState<{ _id: string | undefined, idx: number | undefined }>({ _id: '', idx: 0 })

    const selectionDetails = (idx: number | undefined, _id: string | undefined) => {
        setEditDetails(!editDetails)
        setSelectDtl({ _id, idx });
    }

    const handleUpdateDetails = (id: string | undefined) => {
        setEditDetails(!editDetails);
        const dateModify = getDate.split('-');

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
                    console.log(e);
                    setRe(() => refetch + 1);
                }
            })
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
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
                alert('Something went wrong, Contact developer')
            })
    }

    // console.log(data.map((vi, idx) => vi.details).map((v, i) => v.filter((a, b) => a.unit === 'bosta').map((v, i) => v.quantity).reduce((a, b) => a + b, 0))[0]);

    return (
        <div className='bg-base-100 text-sm shadow-xl mb-10 rounded-xl'>
            <div className='my-5 w-full rounded-xl'>
                <input type="text" placeholder="Search..." className="input input-bordered w-full shadow-xl" onChange={(e) => setSearch(e.target.value)} />
            </div>
            <table>
                <thead className='bg-neutral text-white'>
                    <th>SL</th>
                    <th>Product Name</th>
                    <th>Units</th>
                    <th>Details</th>
                    <th>Available</th>
                    <th>Sold</th>
                </thead>
                <tbody>
                    {
                        data.map((v, idx) => {
                            return (
                                <tr key={idx} className={`${selectRecord.idx === idx ? 'bg-red-100' : 'bg-base-100'}`}>
                                    <td>{idx + 1}</td>
                                    <td>{!editRecord ?
                                        <span>{v?.name}</span> :
                                        <>
                                            <input type="text" name="" defaultValue={v?.name} placeholder='Product Name' className={`m-0 p-0 text-center text-red-600 font-bold w-24 ${selectRecord.idx === idx ? 'visible bg-red-100' : 'hidden'}`} onChange={handleProductName} />
                                            <span className={`${selectRecord.idx === idx ? 'hidden' : 'visible'}`}>{v?.name}</span>
                                        </>
                                    }
                                    </td>
                                    <td>{!editRecord ?
                                        <span> {v?.unit?.map((d, ix) => <p key={ix}>{d}</p>)}  </span> :
                                        <>
                                            <>
                                                {selectUnits.map((v, i) => <p key={i} className={`${selectRecord.idx === idx ? 'visible' : 'hidden'} text-red-600 font-bold flex justify-between`}>
                                                    {v}
                                                    <button className='px-2 hover:text-red onHoverRed' onClick={() => removeIems(v)}>{icons.delete}</button>
                                                </p>)}
                                                <select name="" id="" onChange={handleSelection} className={`text-red-600 font-bold ${selectRecord.idx === idx ? 'visible' : 'hidden'} bg-red-100`}>
                                                    <option value="" disabled selected >Select</option>
                                                    {
                                                        defaultUnits?.map((v, i) => <option key={i} value={v}>{v}</option>)
                                                    }
                                                </select>
                                            </>
                                            <span className={`${selectRecord.idx === idx ? 'hidden' : 'visible'}`}> {v?.unit?.map((d, ix) => <p key={ix}>{d}</p>)}  </span>
                                        </>
                                    }
                                    </td>
                                    <td>
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
                                                                    {!editDetails ? item?.date : <input type="date" onChange={(e) => setDate(e.target.value)}
                                                                        defaultValue={date.toISOString().split('T')[0]} name="" id="" className={`m-0 p-0 w-full text-center`}
                                                                        style={{ visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }} />}</td>
                                                                <td>{!editDetails ?
                                                                    item?.quantity
                                                                    :
                                                                    <input type="number" onChange={(e) => setQty(Number(e.target.value))} defaultValue={Number(item?.quantity)}
                                                                        placeholder='Price per unit'
                                                                        className={`w-10 m-0 p-0 text-center`}
                                                                        style={{ borderWidth: '0', visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }} />
                                                                } {!editDetails ? item?.unit
                                                                    :
                                                                    <select name="" id="" onChange={(e) => setUnit(e.target.value)} defaultValue={item?.unit} style={{ visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }}>
                                                                        <option value="" disabled selected>Select</option>
                                                                        {
                                                                            v?.unit.map((dt, id) => <option value={dt} key={id}>{dt}</option>)
                                                                        }
                                                                    </select>

                                                                    }
                                                                </td>
                                                                <td className='flex justify-center border-e-0'>
                                                                    {
                                                                        !editDetails ?
                                                                            <div className='w-full py-1' >৳{item?.perUnitPrice}</div>
                                                                            :
                                                                            <input type="number" onChange={(e) => setPrice(Number(e.target.value))} defaultValue={Number(item?.perUnitPrice)}
                                                                                placeholder='Price per unit'
                                                                                className={`w-full py-1 border border-0 m-0 p-0 text-center `}
                                                                                style={{ borderWidth: '0', visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }} />
                                                                    }

                                                                    {!editDetails ?
                                                                        <button className='px-2 hover:text-red onHoverRed' onClick={() => selectionDetails(Number(idx), v?._id?.toString())}>{icons.edit}</button>
                                                                        :
                                                                        <div className={`flex`} style={{ visibility: selectDtl._id === v._id && selectDtl.idx === idx ? 'visible' : 'hidden' }}>
                                                                            <button className='px-2 mx-0 bg-[#22c55e] text-white hover:bg-neutral rounded' onClick={() => handleUpdateDetails(item?._id)}>✓</button>
                                                                            <button className='px-2 mx-1 bg-[#b91c1c] text-white hover:bg-neutral rounded' onClick={() => selectionDetails(Number(0), '')}>✕</button>
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
                                    </td>
                                    {/* <td>{v?.sold?.map((v, i) => <p key={i}>{v?.qty} {v?.unit}</p>)}</td> */}
                                    <td>
                                        {
                                            v?.sold?.map((x, id) => {
                                                return <p key={id}> {v?.details.filter((va, idx) => va.unit === x.unit).map((vb, idx) => vb.quantity).reduce((a, b) => a + b, 0) - x.qty} {x.unit}</p>
                                            })
                                        }
                                    </td>
                                    <td>
                                        {v?.sold?.map((v, i) => <p><span style={{ color: 'red', fontWeight: 'bold' }}>{v?.qty}</span> {v?.unit} </p>)}
                                    </td>{
                                        !editRecord ?
                                            <td className='absolute bg-base-100 hover:bg-black hover:text-white' onClick={() => recordSelection(v?._id, idx)}>{icons.edit}</td>
                                            :
                                            <>
                                                <td className='border-0 bg-base-100 absolute right-4 bg-transparent' >
                                                    <button className={`${selectRecord.idx === idx ? 'visible' : 'hidden'} bg-green-400 hover:bg-neutral text-white btn btn-circle btn-sm block p-2`} onClick={() => handleUpdateRecord(v?._id)}>✔</button>
                                                    <button className={`${selectRecord.idx === idx ? 'visible' : 'hidden'} bg-red-800 hover:bg-neutral text-white btn btn-circle btn-sm block p-2 my-2`} onClick={resetSelection}>✖</button>
                                                    <button className={`${selectRecord.idx === idx ? 'visible' : 'hidden'} px-2 mx-0 bg-[#f87171] text-white hover:bg-neutral btn btn-circle btn-sm block p-2 `} onClick={() => handleDeleteRecord(v?._id)}>{icons.delete}</button>
                                                </td>
                                                {/* <td style={{visibility:selectRecord.idx === idx ? 'hidden':'visible'}}></td> */}
                                            </>
                                    }
                                    {/* <td className='absolute h-16'>{'>'}</td> */}
                                </tr>)
                        })
                    }

                    {
                        addBtn && <tr>
                            <td>{data?.length + 1}</td>
                            <td><input type="text" name="" placeholder='Product Name' className='m-0 p-0 text-center w-24' onChange={handleProductName} /></td>
                            <td className='px-2'>
                                {selectUnits.map((v, i) => <p key={i} className='flex justify-between'>
                                    {v}
                                    <button className='px-2 hover:text-red onHoverRed' onClick={() => removeIems(v)}>{icons.delete}</button>
                                </p>)}
                                <select name="" id="" onChange={handleSelection}>
                                    <option value="" disabled selected>Select</option>
                                    {
                                        defaultUnits?.map((v, i) => <option key={i} value={v}>{v}</option>)
                                    }
                                </select>
                            </td>
                            <td>_</td>
                            <td>_</td>
                            <td>_</td>
                        </tr>
                    }

                </tbody>
                <tfoot>
                    {
                        addBtn ?
                            <th className='px-2 mx-0 bg-[#22c55e] text-white hover:bg-neutral' onClick={() => addToDB(!addBtn)}>✓</th>
                            :
                            <th className='px-2 mx-0 bg-error text-white hover:bg-neutral' onClick={() => addToDB(!addBtn)}>+</th>
                    }
                    <th>Product Name</th>
                    <th>Units</th>
                    <th>Details</th>
                    <th>Available</th>
                    <th>Sold</th>
                </tfoot>
            </table>
        </div>
    )
}

export default StockTable