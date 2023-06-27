import React, { useContext, useEffect, useState } from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer, Image } from '@react-pdf/renderer';

type Props = {
    newData: {
        productId: string,
        productName: string,
        quantity: number,
        totalPrice: number
        unit: string,
        __v: number,
        _id: string
    }[],
    due: number,
    customerDetails: {
        customer: string,
        phone: string,
        address: string
    },
    displayName: string | null | undefined,
    courier: boolean,
    handleSaveToDB: (args:Data) => void
}

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
    date:string,
    customerName:string,
    due: number,
    phone:string,
    address: string,
    totalPrice:number,
    courier: boolean,
}

const Modal = ({ newData, due, customerDetails, displayName, courier, handleSaveToDB }: Props) => {
    const Dt = new Date();
    const data = { products: newData, date: Dt.toLocaleDateString(), customerName: customerDetails.customer, phone: customerDetails.phone, address: customerDetails.address, totalPrice: newData.map((v, i) => v.totalPrice).reduce((accumulator, currentValue) => accumulator + currentValue, 0), due, courier, };
    
    return (
        <div className='w-full flex justify-center'>
            <div className="">
                <div className="py-4 border">
                    <PDFViewer width="1300" height="600" className="app" >
                        <MyDocument handleSaveToDB={handleSaveToDB} newData={newData} due={due} customerDetails={customerDetails} displayName={displayName} courier={courier} />
                    </PDFViewer>
                </div>
                <PDFDownloadLink document={<MyDocument handleSaveToDB={handleSaveToDB} newData={newData} due={due} customerDetails={customerDetails} displayName={displayName} courier={courier} />} fileName='Form'
                    onClick={() => handleSaveToDB(data)}>
                    <div className='btn btn-error text-white flex mb-20'>Save & Download</div>
                </PDFDownloadLink>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    // body:{
    //     marginRight:60
    // },
    table: {
        // display: "table",
        width: "auto",
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderRightWidth: 0,
        // borderBottomWidth: 0,
        marginTop: 20,
        borderCollapse: 'collapse'
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",

    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        // borderLeftWidth: 0,
        // borderTopWidth: 0

    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
    }
});

export const MyDocument = ({ newData, due, customerDetails, displayName, courier }: Props) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(newData.map((v, i) => v.totalPrice).reduce((accumulator, currentValue) => accumulator + currentValue, 0))
    }, [newData]);

    const date = new Date();

    return (
        <Document>
            <Page>
                <View style={styles.table}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src='https://i.ibb.co/Qb94CWc/monin1234.png' style={{ height: 75, width: 500 }}></Image>
                    </View>

                    <View style={{ display: 'flex', marginBottom: 5 }}>
                        <View style={{ marginLeft: 45 }}>
                            <Text style={{ fontSize: 11 }}>Momin Food Product</Text>
                            <Text style={{ fontSize: 10 }}>Kacharighat, Sadar, Mymensingh</Text>
                            <Text style={{ fontSize: 10 }}>Mymensingh, Bangladesh</Text>
                            <Text style={{ fontSize: 10 }}>Contact : 01710-298892, 01798-967576</Text>
                            <Text style={{ fontSize: 10 }}>Email: mominfood22@gmail.com</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 45, top: 5, display: 'flex', alignItems: 'center' }}>
                            {/* <Text style={{ fontSize: 10 }}>Invoive/Bill</Text> */}
                            <View style={{ borderWidth: 1, borderStyle: 'solid' }}>
                                {/* <Text style={{ fontSize: 10, borderWidth: 1, borderStyle: 'solid', padding:2 }}>NO: 857461654</Text> */}
                                <Text style={{ fontSize: 10, borderWidth: 1, borderStyle: 'solid', padding: 2 }}>Date: {date.toLocaleDateString()}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[{ fontSize: 10}, {marginLeft: 45, marginBottom: 6 }]}>Customer: {customerDetails.customer}      Phone: {customerDetails.phone}      Address: {customerDetails.address}     salesman: {displayName ? displayName : 'N/A'}</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={{ width: "10%", borderStyle: "solid", borderWidth: 1 }}>
                            <Text style={styles.tableCell}>SL NO.</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>ITEM</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>QUANTITY</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>PRICE</Text>
                        </View>
                    </View>

                    {newData.map((v, idx) => {
                        return (<View style={styles.tableRow} key={idx}>
                            <View style={{ width: "10%", borderStyle: "solid", borderWidth: 1 }}>
                                <Text style={styles.tableCell}>{idx + 1}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{v.productName}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{v.quantity} {v.unit}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{v.totalPrice}</Text>
                            </View>
                        </View>)
                    })}

                    <View style={{ width: "auto", marginLeft: 45 }}>
                        <View style={{ width: '92%', borderStyle: "solid", borderWidth: 1, paddingRight: 60, height: 60, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'right', fontSize: 10 }}>Total Price:   {total}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right', fontSize: 10, marginRight: 50, marginTop: 6 }}>{courier && "Courier"} Paid: {total - due} Due: {due}</Text>
                    </View>

                    <View>
                        <Text style={{
                            fontSize: 10, marginTop: 60, marginLeft: 45, borderWidth: 1, borderStyle: 'solid', width: '18%', textAlign: 'center',
                            paddingTop: 4, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0
                        }}>Customer Signeture</Text>
                    </View>
                </View>
            </Page>
        </Document>)
}

export default Modal