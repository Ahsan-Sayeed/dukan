import { url } from '@/config/backendConfig';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getAllData } from './requestApi';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';

const icons = {
    edit: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>,
    delete: <svg style={{ color: "red" }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
}

type Props = {}

const data1 = [
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
                sellingPrice: 0,
                _id: 'asg'
            }
        ],
        sold: [
            {
                unit: 'packet',
                qty: 2,
                singlePrice: 0,
                _id: ''
            },
            {
                unit: 'pice',
                qty: 4,
                singlePrice: 0,
                _id: ''
            },
            {
                unit: 'Bosta',
                qty: 8,
                singlePrice: 0,
                _id: ''
            }
        ],
    }
]


const AnalysisTable = (props: Props) => {
    const [refetch, setRe] = useState(0);
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState(data1);

    const [edit, setEdit] = useState<boolean>(false);
    const [price, setPrice] = useState(0);
    const [selectItem, setSelectItem] = useState<{ id: string | undefined, idx: number | undefined }>({ id: '', idx: 0 })


    // const {data} = useQuery({ 
    //     queryKey: ['search',search], 
    //     queryFn: async()=> (await getAllData(search)).data,
    //     initialData: data1,
    // });

    useEffect(() => {
        fetch(`${url}stock?name=${search}`)
            .then((e) => e.json())
            .then(e => setData(e))
            .catch(err => {
                //something went wrong('Something went wrong, Contact developer')
            })

        axios.get(`${url}courier`)
            .then(({ data }) => {
                setRe((prev) => prev + 1)
                return setCourierData(data);
            })
            .catch(err => {
                setRe((prev) => prev + 1)
            })

    }, [refetch])


    const handleEdit = (id: string | undefined, idx: number | undefined) => {
        setEdit(!edit);
        setSelectItem({ id, idx });
    }

    const handleAddPrice = (e: React.FormEvent<HTMLFormElement>, idp: string, idc: string) => {
        e.preventDefault();
        setEdit(!edit);

        fetch(`${url}updatesellprice/${idp}/${idc}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sellingPrice: e.currentTarget?.sellingPrice?.value })
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

        // console.log(e.currentTarget?.sellingPrice.value)
        // console.log(idp,idc)
        setPrice(0);
    }

    // if(query.isLoading) return <Loading/>

    //courier service 
    const [courier, setCourier] = useState<string>('');
    const [courierData, setCourierData] = useState<{ _id: string, courier: string }[]>([{ _id: '', courier: '' }]);
    const handleUpdateCourier = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${url}courier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courier })
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
        setCourier('')
    }

    const handleDeleteCourier = async (id: string) => {
        const result = await axios.delete(`${url}courier/${id}`);
        if (result.status == 200) {
            setRe(refetch + 1);
        }
    }

    return (
        <div className="overflow-x-auto min-w-screen border rounded-xl ms-5 bg-base-100">

            <div className='my-5 w-full rounded-xl'>
                <input type="text" placeholder="Search..." className="input input-bordered w-full shadow-xl" onChange={(e) => setSearch(e.target.value)} />

                <div className='my-5 px-5 text-xs mx-1'>
                    <form onSubmit={handleUpdateCourier} className='inline-block'>
                        <label>Courier Service:
                            <input type="text" placeholder='Type here...' value={courier} className='bg-transparent' onChange={(e) => setCourier(e.target.value)} />
                        </label>
                    </form>
                    <label className='mx-1 inline-block'>
                        Sort By:
                        <select name="" id="" className='bg-transparent'>
                            <option value="Name" selected>Name</option>
                            <option value="Date">Date</option>
                            <option value="Price">Price</option>
                        </select>
                    </label>
                </div>

                <div className='text-xs mx-2'>
                    {courierData?.map((v, i) => <div className='border shadow rounded-xl inline-block mx-1 my-1 bg-[#ddd6fe]' key={i}>
                        <span className='mx-2'>{v?.courier}</span>
                        <button className='me-2 hover:text-red-500 hover:font-bold' onClick={() => handleDeleteCourier(v?._id)}>✕</button>
                    </div>)}
                </div>
            </div>

            <table className="table table-xs">
                <thead className='bg-neutral text-white text-center'>
                    <tr>
                        <th>SL</th>
                        <th>Product Name</th>
                        <th>Quantity in</th>
                        <th>Selling price</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        data?.map((v, idx: number) => {
                            return (<tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{v?.name}</td>
                                <td>
                                    {v?.sold?.map((v, i) => <p key={i}>{v?.unit}</p>)}
                                </td>
                                <td>
                                    {edit ?
                                        v?.sold?.map((vx, i) => vx._id === selectItem.id && idx === selectItem.idx ?
                                            <form onSubmit={(e) => handleAddPrice(e, v?._id, vx?._id)}>
                                                <input type="number" step="any" placeholder={`প্রতি ${v?.unit}র মূল্য`} className={`inline border rounded w-28 py-1 text-center`}
                                                    name="sellingPrice" id="" defaultValue={vx?.singlePrice} onChange={(e) => setPrice(Number(e.target.value))} required />
                                                {
                                                    price !== 0
                                                        ?
                                                        <input className='px-2 mx-0 bg-[#22c55e] text-white hover:bg-neutral rounded py-1' type='submit' value='✓' />
                                                        :
                                                        <input className='px-2 mx-0 bg-[#ef4444] text-white hover:bg-neutral rounded py-1' onClick={() => setEdit(!edit)} type='button' value='𐤕' />
                                                }
                                            </form>
                                            : <p key={i} className='text-black'>৳{vx?.singlePrice}</p>
                                        )
                                        :
                                        v?.sold?.map((v, i) => <div className='flex items-center justify-center text-white hover:text-red-500'>
                                            <p key={i} className='text-black'>৳{v?.singlePrice}</p>
                                            <button className='px-2 mx-0  text-md rounded' onClick={() => handleEdit(v?._id, idx)} type='button'>{icons.edit}</button>
                                        </div>)

                                    }
                                </td>
                            </tr>)
                        })
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default AnalysisTable