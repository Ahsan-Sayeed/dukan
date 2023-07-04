import { User } from 'firebase/auth'
import React, { useState, useEffect, useContext } from 'react'
import Modal, { MyDocument } from './Modal/Modal';
import { AuthContext } from '@/app/Context/store';
import { url } from '@/config/backendConfig';

type Props = {}

type Data = {
    products: {
        productId: string,
        productName: string,
        quantity: number,
        totalPrice: number
        unit: string,
        __v: number,
        _id: string
    }[],
    date: string,
    customerName: string,
    due: number,
    phone: string,
    address: string,
    totalPrice: number,
    courier: boolean,
}
type NewData = {
    productId: string,
    productName: string,
    quantity: number,
    totalPrice: number
    unit: string,
    __v: number,
    _id: string
}[]


const data1 = [
    {
        _id: '',
        productName: "",
        unit: "",
        perUnitPrice: 0
    }
]


const Sheet = (props: Props) => {
    const [refetch, setRe] = useState(0);
    const [data, setData] = useState(data1);
    const [newData, setNewData] = useState<NewData>([]);
    const newTab = new Array(1);
    const modifyTab = newTab.fill(0);
    const [newTabData, setNewTabData] = useState(modifyTab);
    const { users } = useContext(AuthContext);
    // console.log(users.displayName);

    const [state, setState] = useState({
        productId: '',
        quantity: 1,
        totalPrice: 0
    });

    const getItemsDetails = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        state.totalPrice = (data.find((v, i) => v._id === state.productId)?.perUnitPrice || 0) * state.quantity;
    }, [state])

    useEffect(() => {
        fetch(`${url}analytics`)
            .then((e) => e.json())
            .then(e => setData(e))
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
        fetch(`${url}spreadsheet?uid=${users?.uid}`)
            .then((e) => e.json())
            .then(e => setNewData(e))
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
        // console.log(newData);
    }, [refetch])

    const handleSubmit = () => {
        // setNewData((prev) => [...prev, state])
        fetch(`${url}spreadsheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...state,uid:users?.uid})
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch setNewData
                    setRe(() => refetch + 1);
                    // console.log("ok")
                }
            })
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }

    const handleDelete = (id: string) => {
        // setData((prev) => prev.filter((v) => v._id !== id));
        fetch(`${url}spreadsheet/${id}`, {
            method: 'DELETE',
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

    const [isDue, setIsDue] = useState(true);
    const [due, setDue] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({
        customer: '',
        phone: '+880',
        address: ''
    })
    const [courier, setCourier] = useState(false)


    const handleCustomer = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        // console.log({[e.target.name]:e.target.value});
        setCustomerDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSaveToDB = (data: Data) => {
        const concatData = { ...data, sellerUID: users?.uid, sellerName: users?.displayName, sellerEmail: users?.email }

        fetch(`${url}history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(concatData)
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch
                    fetch(`${url}spreadsheet`, {
                        method: 'DELETE',
                    })
                        .then(e => {
                            if (e.status === 200) {
                                //refetch
                                console.log('deleted')
                                alert('saved to database');
                                setRe(() => refetch + 1);
                            }
                        })
                        .catch(err => {
                            alert('Something went wrong, Contact developer')
                        })
                }
            })
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })

    }


    return (
        <div className="overflow-x-auto min-w-screen border rounded-xl ms-5 bg-base-100">

            <form className='flex justify-around pb-2 pt-4 text-white text-xs bg-neutral border-b-2'>
                <label htmlFor="">Customer:
                    <input className='w-32 ms-1 border-b-2 bg-neutral' type="text" placeholder="Type here..." name='customer' onChange={handleCustomer} />
                </label>
                <label htmlFor="">Phone:
                    <input className='w-32 ms-1 border-b-2 bg-neutral' type="number" placeholder="Type here..." name='phone' onChange={handleCustomer} />
                </label>
                <label htmlFor=""> Address:
                    <input className='w-32 ms-1 border-b-2 bg-neutral' type="text" placeholder="Type here..." name='address' onChange={handleCustomer} />
                </label>

                <div className='flex items-center'>
                    <input type="radio" id="ck" name="radio" value='paid' onChange={() => setIsDue(true)} />
                    <label htmlFor="ck" className='me-1'>Paid</label>
                    <input type="radio" id="ck2" name="radio" value="due" onChange={() => setIsDue(false)} />
                    <label htmlFor="ck2" className='me-1'>Due</label>
                    <input className={`${isDue && 'hidden'} w-32 ms-1 border-b-2 bg-neutral`} type="number" placeholder="Amount" disabled={isDue} onChange={(e) => setDue(Number(e.target.value))} />
                </div>
                {/* <label htmlFor="my_modal_6" className="btn btn-xs" typeof='submit'>Export</label> */}
                <div className='flex items-center'>
                    <input type="checkbox" id="checkbox" name="checkbox" value="courier " onChange={() => setCourier(!courier)} />
                    <label htmlFor="checkbox"> Courier </label>
                </div>
            </form>

            <table className="table table-xs">
                <thead className='bg-neutral text-white'>
                    <tr>
                        <th></th>
                        <th>Name/Unit</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>

                    {
                        newData.map((v, idx) => {
                            return (<tr key={idx} className='bg-base-100 text-black'>
                                <th>{idx + 1}</th>
                                <td>{v.productName}</td>
                                <td>
                                    <p>{v.quantity} {v.unit}</p>
                                </td>
                                <td>
                                    <p key={idx}>৳{v.totalPrice}</p>
                                </td>
                                <td>
                                    <button className='btn btn-xs btn-error text-white' onClick={() => handleDelete(v._id)}>Delete</button>
                                </td>

                            </tr>)
                        })
                    }

                    {
                        newTabData.map((v, idx) => {
                            return (
                                <tr key={idx} className='bg-base-100 text-black'>
                                    <th>{newData.length + 1}</th>
                                    <td>
                                        <select
                                            name="productId" id="pet-select" className='block border' onChange={getItemsDetails}>
                                            <option selected disabled>select one</option>
                                            {data.map((v, idx) => <option key={v._id} value={v._id}>{v.productName}/{v.unit}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <input type='number' placeholder='type here' onChange={getItemsDetails}
                                            name="quantity" className='border border-primary block' defaultValue={1}></input>
                                    </td>
                                    <td>
                                        <input type='number' placeholder='type here' onChange={getItemsDetails}
                                            name="totalPrice" value={(data.find((v, i) => v._id === state.productId)?.perUnitPrice || 0) * state.quantity}
                                            className='border border-primary block' readOnly></input>
                                    </td>
                                </tr>)
                        })
                    }

                    <th></th>
                    <th><button className='btn btn-xs w-full btn-primary my-2'
                        onClick={handleSubmit}>Add item</button></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                </tbody>
            </table>
            <Modal handleSaveToDB={handleSaveToDB} newData={newData} due={due} customerDetails={customerDetails} displayName={users?.displayName} courier={courier} />
        </div>
    )
}

export default Sheet