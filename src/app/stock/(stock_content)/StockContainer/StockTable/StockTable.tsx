import React, { useEffect, useRef, useState } from 'react'
import './StockTable.css'
import { url } from '@/config/backendConfig'
import DetailsTable from './components/DetailsTable/DetailsTable'
import ProductName from './components/ProductName/ProductName'
import UnitsItem from './components/UnitsItem/UnitsItem'
import SoldItem from './components/SoldItems/SoldItem'
import AvailableItems from './components/AvailableItems/AvailableItems'

type Props = {}

const stockDetails = [
    {
        _id: '',
        name: "Loading..",
        unit: ['Loading..'],
        details: [
            {
                date: '',
                unit: 'Loading..',
                quantity: 'N/A',
                perUnitPrice: 'N/A',
                _id: 'asg'
            }
        ],
        sold: [
            {
                unit: 'Loading..',
                qty: "N/A",
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
    const defaultUnits = ["পিছ", "পাতা", "প্যাকেট", "কেজি", "কার্টুন", "বস্তা", "বান্ডেল", "ডজন", "বোতল"]
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
                //something went wrong('Something went wrong, Contact developer')
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
                        alert("Record Added");
                        setSearch('');
                        setRe(() => refetch + 1);
                    }
                })
                .catch(err => {
                    //something went wrong('Something went wrong, Contact developer')
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
                    //something went wrong('Something went wrong, Contact developer')
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
                    alert("Record deleted");
                    setRe(() => refetch + 1);
                    setSearch('');
                }
            })
            .catch(err => {
                //something went wrong('Something went wrong, Contact developer')
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
                                    <td>
                                        <ProductName
                                            editRecord={editRecord}
                                            v={v}
                                            idx={idx}
                                            selectRecord={selectRecord}
                                            handleProductName={handleProductName}
                                        />
                                    </td>
                                    <td>
                                        <UnitsItem 
                                        editRecord={editRecord}
                                        v={v}
                                        selectUnits={selectUnits}
                                        selectRecord={selectRecord}
                                        handleSelection={handleSelection}
                                        removeIems={removeIems}
                                        defaultUnits={defaultUnits}
                                        idx={idx}
                                        />
                                    </td>
                                    <td>
                                        <DetailsTable
                                            v={v} 
                                            setRe={setRe}
                                            refetch={refetch}
                                        />
                                    </td>

                                    <td>
                                      <AvailableItems productName={v.name} setRe={setRe} refetch={refetch}/>
                                    </td>

                                    <td>
                                        {/* {v?.sold?.map((v, i) => <p><span style={{ color: 'red', fontWeight: 'bold' }}>{v?.qty}</span> {v?.unit} </p>)} */}
                                        <SoldItem productName={v.name}/>
                                    </td>
                                    
                                    {
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