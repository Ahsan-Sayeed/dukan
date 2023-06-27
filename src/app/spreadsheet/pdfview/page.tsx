import React from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

type Props = {}

const styles = StyleSheet.create({
    table: {
        // display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});


const page = (props: Props) => {
    return (
        <div>
            {/* <PDFViewer width="1000" height="600" className="app" > */}
                <MyDocument />
            {/* </PDFViewer> */}
            {/* <PDFDownloadLink document={<MyDocument />} fileName='Form'>
                download
            </PDFDownloadLink> */}
            
        </div>
    )
}

const MyDocument = () => {
    return (
        <Document>
            <Page>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Type</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Period</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Price</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>React-PDF</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>3 User </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>5€</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>)
}


export default page