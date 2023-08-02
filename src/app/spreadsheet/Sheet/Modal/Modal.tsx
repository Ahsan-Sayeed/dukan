import React, { useContext, useEffect, useState } from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer, Image, Font } from '@react-pdf/renderer';


type Props = {
    newData: {
        productName: string,
        qu: {
            unit: string,
            qty: number,
            price: number
        }[],
        uid: String,
        _v?: number
    }[],
    due: number,
    customerDetails: {
        customer: string,
        phone: string,
        address: string
    },
    displayName: string | null | undefined,
    courier: boolean,
    handleSaveToDB: (args: any) => void,
    courierData: string,
    getDate: string
}

type Data = {
    products: {
        productName: string,
        qu: {
            unit: string,
            qty: number,
            price: number
        }[],
        uid: string,
        _v?: number,
        _id: string
    }[],
    date: string | undefined,
    customerName: string | undefined,
    due: number | undefined,
    phone: string | undefined,
    address: string | undefined,
    totalPrice: number | undefined,
    courier: boolean | undefined,
    courierData: string
}

const Modal = ({ newData, due, customerDetails, displayName, courier, courierData, getDate, handleSaveToDB }: Props) => {

    const data:Data = {
        products: newData as [],
        date: getDate,
        customerName: customerDetails.customer,
        phone: customerDetails.phone,
        address: customerDetails.address,
        totalPrice: newData?.map((v, i) => v.qu.map((vc, id) => vc.price).reduce((a, b) => a + b, 0)).reduce((x, y) => x + y, 0),
        due,
        courier,
        courierData
    };

    return (
        <div className='w-full flex justify-center'>
            <div>
                <div className="py-4 border">
                    <PDFViewer width="1300" height="600" className="app" >
                        <MyDocument handleSaveToDB={handleSaveToDB} getDate={getDate} courierData={courierData} newData={newData} due={due} customerDetails={customerDetails} displayName={displayName} courier={courier} />
                    </PDFViewer>
                </div>
                <PDFDownloadLink document={<MyDocument handleSaveToDB={handleSaveToDB} getDate={getDate} courierData={courierData} newData={newData} due={due} customerDetails={customerDetails} displayName={displayName} courier={courier} />} fileName='Form'
                    onClick={() => handleSaveToDB(data)}>
                    <div className='btn btn-error text-white flex mb-20'>Save & Download</div>
                </PDFDownloadLink>
            </div>
        </div>
    )
}


Font.register({
    family: 'Tiro Bangla, serif',
    src: 'https://cdn.jsdelivr.net/gh/Ahsan-Sayeed/banglaFont@d18e50db13819bccaeb2c47081773953fee0abfa/unicode.ttf'
    //   'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

const styles = StyleSheet.create({
    // body:{
    //     marginRight:60
    // },
    korean: {
        fontFamily: 'Tiro Bangla, serif',
    },
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
        width: "20%",
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
        fontFamily: 'Tiro Bangla, serif',
    }
});

export const MyDocument = ({ newData, due, courierData, getDate, customerDetails, displayName, courier }: Props) => {

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
                                <Text style={{ fontSize: 10, borderWidth: 1, borderStyle: 'solid', padding: 2 }}>Date: {getDate}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[{ fontSize: 10 }, { marginLeft: 45, marginBottom: 6, fontFamily: 'Tiro Bangla, serif' }]}>Customer: {customerDetails.customer}      Phone: {customerDetails.phone}      Address: {customerDetails.address}     salesman: {displayName ? displayName : 'N/A'}</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={{ width: "5%", borderStyle: "solid", borderWidth: 1 }}>
                            <Text style={styles.tableCell}>SL</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>পণ্যের নাম</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>পরিমাণ</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>একক মূল্য</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>মূল্য</Text>
                        </View>
                    </View>

                    {newData.map((v, idx) => {
                        return (<View style={styles.tableRow} key={idx}>
                            <View style={{ width: "5%", borderStyle: "solid", borderWidth: 1 }}>
                                <Text style={styles.tableCell}>{idx + 1}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{v.productName}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    v?.qu?.map((vc, idx) => <Text style={styles.tableCell}>{vc?.qty.toString()} {vc?.unit.toString()}</Text>)
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    v?.qu?.map((vc, idx) => <Text style={styles.tableCell}>{Number(vc.price) / Number(vc.qty)}</Text>)
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    v?.qu?.map((vc, idx) => <Text style={styles.tableCell}>{vc?.price.toString()}</Text>)
                                }
                            </View>
                        </View>)
                    })}

                    <View style={{ width: "auto", marginLeft: 45 }}>
                        <View style={{ width: '92%', borderStyle: "solid", borderWidth: 1, paddingRight: 60, height: 60, display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'right', fontSize: 10, fontFamily: 'Tiro Bangla, serif' }}>মোট টাকার পরিমাণ: {newData.map((v, i) => v.qu.map((vc, id) => vc.price).reduce((a, b) => a + b, 0)).reduce((x, y) => x + y, 0).toString()}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right', fontSize: 10, marginRight: 50, marginTop: 6 }}> Paid: {newData?.map((v, i) => v?.qu?.map((vc, id) => vc.price).reduce((a, b) => a + b, 0)).reduce((x, y) => x + y, 0) - due} Due: {due}</Text>
                        <Text style={{ textAlign: 'right', fontSize: 10, marginRight: 50, marginTop: 6 , fontFamily: 'Tiro Bangla, serif'}}>{courier && 'Courier Service: ' + courierData+']'}</Text>
                    </View>

                    <View>
                        <Text style={{
                            fontSize: 10, marginTop: 60, marginLeft: 45, borderWidth: 1, borderStyle: 'solid', width: '18%', textAlign: 'center',
                            paddingTop: 4, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0
                        }}>Customer Signeture</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 10, marginTop: 60, marginLeft: 45, borderWidth: 1, borderStyle: 'solid', width: '85%', textAlign: 'center',
                            paddingTop: 4, fontFamily: 'Tiro Bangla, serif',
                        }}>{"বি:দ্র: ভুল ত্রুটি সংশোধন যোগ্য। বিক্রি কৃত পণ্য শর্ত সাপেক্ষে ফেরত নেওয়া হয়]]"}</Text>
                    </View>
                </View>
            </Page>
        </Document>)
}

export default Modal