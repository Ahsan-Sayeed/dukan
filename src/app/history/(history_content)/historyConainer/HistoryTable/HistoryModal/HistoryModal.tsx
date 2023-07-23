import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import PDFdrive from '../../../PDFdrive/PDFdrive'

type Props = {
    history: {
        _id:string
        products: [{
            productName: string,
            qu: [{
                unit: string,
                qty: number,
                price: number
            }],
            uid: string,
            _id: string
        }],
        date: string,
        customerName: string,
        phone: string,
        address: string,
        totalPrice: number,
        due: number,
        courier: boolean,
        courierData: string,
        sellerUID: string,
        sellerName: string,
        sellerEmail: string,
        time: number,
    }[],
    inx: number
}

const HistoryModal = ({ history, inx }: Props) => {
    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{history[inx]?.customerName===''? 'No Name':  history[inx]?.customerName} / {history[inx]?.phone}</h3>
                    <div className="py-4">
                        <PDFViewer width="450" height="420" className="app" >
                            <PDFdrive history={history} inx={inx} />
                        </PDFViewer>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-error text-white">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryModal;