import { User } from 'firebase/auth'
import React, { useState, useEffect, useContext } from 'react'
import Modal, { MyDocument } from './Modal/Modal';
import { AuthContext } from '@/app/Context/store';
import { url } from '@/config/backendConfig';
import './Sheet.css'

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
    courierService: string
}

type NewData = {
    productName: string,
    qu: {
        unit: string,
        qty: number,
        price: number
    }[],
    uid: string,
    _v?: number,
    _id: string

}[]

const newData1 = [
    {
        productName: "",
        qu: [{ unit: '', qty: 0, price: 0, _id: '' }],
        uid: '',
        _id: '',
        _v: 0
    }
]

const data1 = [
    {
        _id: '',
        details: [{ date: '', perUnitPrice: 0, quantity: 0, unit: "", _id: '' }],
        name: '',
        sold: [{ qty: 0, singlePrice: 0, unit: "", _id: "" }],
        unit: ['']
    }
]

type Data1 = {
    _id: string,
    details: { date: string, perUnitPrice: number, quantity: number, unit: string, _id: string }[],
    name: string,
    sold: { qty: number, singlePrice: number, unit: string, _id: string }[],
    unit: string[]
}[]


const icons = {
    edit: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Edit"><g><path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path><path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path></g></g></svg>,
    delete: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
}

const Sheet = (props: Props) => {
    const [refetch, setRe] = useState(0);
    const [data, setData] = useState<Data1>(data1);
    const [newData, setNewData] = useState<NewData>(newData1);
    const newTab = new Array(1);
    const modifyTab = newTab.fill(0);
    const [newTabData, setNewTabData] = useState(modifyTab);
    const { users } = useContext(AuthContext);
    const date = new Date();
    const [getDate, setDate] = useState(date.toISOString().split('T')[0]);
    // console.log(users.displayName);
    const [units, setUnits] = useState<string[] | undefined>([]);
    const [productDisable, setDisable] = useState<boolean>(false);
    const [selectUnits, setSelectUnits] = useState<string[]>([])
    const [productName, setProductName] = useState<string>('')
    const [state, setState] = useState({});

    const getItemsDetails = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        // setState({ ...state, [e.target.name]: e.target.value });
        // console.log(e.target.name);

        if (e.target.name === 'productName') {
            setDisable(!productDisable);
            setProductName(e.target.value);
            const ff = data?.find((d, idx) => d.name === e.target.value)?.unit
            setUnits(() => ([...(ff || [])]))
        }
        if (e.target.name === 'units') {
            setSelectUnits((prev) => [...prev, e.target.value])
        }
    }
    const setItemsDetails = ({ unit, qty }: { unit: string, qty: string }) => {
        setState({ ...state, [unit]: qty });
    }

    const removeIems = (d: string) => {
        setSelectUnits((prev) => prev.filter((v) => v !== d))
    }

    useEffect(() => {
        fetch(`${url}stock?name=`)
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

        fetch(`${url}courier`)
            .then((e) => e.json())
            .then(e => setCourierData(e))
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })

        // console.log(newData);
    }, [refetch])
    // console.log(newData);

    const handleSubmit = () => {
        // setNewData((prev) => [...prev, state])
        // console.log(Object.entries(state);

        // console.log({
        //     productName, qu: Object.entries(state).map((v, i) => ({
        //         unit: v[0],
        //         qty: v[1],
        //         price: data.find((v, i) => v.name === productName).sold.find((va, idx) => va.unit === v[0]).singlePrice * v[1]
        //     })), uid: users?.uid
        // });

        // console.log(
        //     Object.entries(state).map((v, i) => {
        //         return Number((data?.find((v, i) => v?.name === productName))?.sold.find((va, idx) => va?.unit === v[0])?.singlePrice) * Number(v[1])
        //     })
        // )

        fetch(`${url}spreadsheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName, qu: Object.entries(state).map((v, i) => ({
                    unit: v[0],
                    qty: v[1],
                    price: Number((data?.find((v, i) => v?.name === productName))?.sold.find((va, idx) => va?.unit === v[0])?.singlePrice) * Number(v[1])
                })), uid: users?.uid
            })
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch setNewData
                    ///====>>>>
                    reset()
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
    const [courier, setCourier] = useState(false);
    const [courierData, setCourierData] = useState<{ _id: string, courier: string, __v: number }[]>([{ _id: '', courier: '', __v: 0 }]);
    const [selectedCourierData, setSelectedCourierData] = useState<string>('');


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
                                alert('saved to database');
                                reset();
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

    const reset = () => {
        setState({});
        setUnits([]);
        setProductName('');
        setDisable(!productDisable);
        setSelectUnits([]);
        setRe(() => refetch + 1);
    }

    return (
        <div className="overflow-x-auto min-w-screen border rounded-xl ms-5 bg-base-100">

            <form className='flex justify-around pb-2 pt-4 text-xs text-black border-b-2'>
                <label htmlFor="">Customer:
                    <input className='w-32 ms-1' type="text" placeholder="Type here..." name='customer' onChange={handleCustomer} />
                </label>
                <label htmlFor="">Phone:
                    <input className='w-32 ms-1' type="number" placeholder="Type here..." name='phone' onChange={handleCustomer} />
                </label>
                <label htmlFor=""> Address:
                    <input className='w-32 ms-1' type="text" placeholder="Type here..." name='address' onChange={handleCustomer} />
                </label>
                <label htmlFor=""> Date:
                    <input className='w-32 ms-1' type="date" defaultValue={getDate} name='date' onChange={(e) => setDate(e.target.value)} />
                </label>

                <div className='flex items-center justify-center'>
                    <input type="radio" id="ck" name="radio" value='paid' onChange={() => setIsDue(true)} />
                    <label htmlFor="ck" className='me-1'>Full Paid</label>
                    <input type="radio" id="ck2" name="radio" value="due" onChange={() => setIsDue(false)} />
                    <label htmlFor="ck2" className='me-1'>Due</label>
                    <input className={`${isDue && 'hidden'} w-32 ms-1`} min={0} type="number" placeholder="Amount" disabled={isDue} onChange={(e) => setDue(Number(e.target.value))} />
                </div>
                {/* <label htmlFor="my_modal_6" className="btn btn-xs" typeof='submit'>Export</label> */}
                <div>
                    <label htmlFor="checkbox" className='flex items-center justify-center'>
                        <input type="checkbox" id="checkbox" name="checkbox" value="courier " onChange={() => setCourier(!courier)} />
                        Courier:
                        <select name="" id="" className='w-24' disabled={!courier} onChange={(e) => setSelectedCourierData(e.target.value)}>
                        <option selected disabled>select one</option>
                            {
                                courierData?.map((v, i) => <option key={v._id} value={v?.courier}>{v?.courier}</option>)
                            }
                        </select>
                    </label>
                </div>
            </form>

            <table className="table table-xs">
                <thead className='bg-neutral text-white text-center'>
                    <tr>
                        <th>SL</th>
                        <th>Product</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody className='text-center'>

                    {
                        newData.map((v, idx) => {
                            return (<tr key={idx} className='bg-base-100 text-black'>
                                <th>{idx + 1}</th>
                                <td>{v.productName}</td>
                                <td>
                                    {
                                        v?.qu?.map((vx, idx) => <p key={idx}>{vx.unit}</p>)
                                    }
                                </td>
                                <td>
                                    {
                                        v?.qu?.map((vx, idx) => <p key={idx}>{vx?.qty.toString()} {vx?.unit}</p>)
                                    }
                                </td>
                                <td>
                                    {
                                        v?.qu?.map((vx, idx) => <p key={idx}>৳{vx?.price.toString()}</p>)
                                    }
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
                                            name="productName" id="pet-select" className='block border mx-auto' onChange={getItemsDetails} disabled={productDisable}>
                                            <option selected={productName === ''} disabled>select one</option>
                                            {data?.map((v, idx) => <option key={v._id} value={v.name}>{v.name}</option>)}
                                        </select>

                                    </td>
                                    <td>
                                        {selectUnits.map((v, i) => <p key={i}>
                                            {v}
                                            <button className='px-2 hover:text-red onHoverRed' onClick={() => removeIems(v)}>{icons.delete}</button>
                                        </p>)}

                                        <select
                                            name="units" id="pet-select" className='block border mx-auto' onChange={getItemsDetails}>
                                            <option selected={units?.length!==0} disabled>select one</option>
                                            {units?.map((v, idx) => <option key={idx} value={v}>{v}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        {
                                            selectUnits?.map((vx, i) =>
                                                <input type='number' key={i} placeholder={`Qty`} onChange={(e) => setItemsDetails({ unit: vx, qty: e.target.value })}
                                                    name="quantity" className='border border-primary block mx-auto w-12 my-1' defaultValue={0} />)
                                        }
                                    </td>
                                    <td>
                                        {
                                            Object.entries(state).map((v, i) => {
                                                return Number((data?.find((v, i) => v?.name === productName))?.sold.find((va, idx) => va?.unit === v[0])?.singlePrice) * Number(v[1])
                                            }).map((v, i) => <p key={i}>৳ {v}</p>)
                                        }

                                    </td>
                                    <td><button className='btn btn-xs btn-primary'
                                        onClick={handleSubmit}>Add item</button>
                                        {productDisable && <input type='reset' value='reset' className='btn btn-secondary btn-xs mx-2' onClick={reset} />}
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
                <tfoot>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tfoot>
            </table>
            <Modal handleSaveToDB={handleSaveToDB} newData={newData} due={due} customerDetails={customerDetails} displayName={users?.displayName} courier={courier} courierData={selectedCourierData} getDate={getDate.toString()} />
        </div>
    )
}

export default Sheet