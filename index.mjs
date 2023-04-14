import pdf from 'pdf-parse';
import fs from 'fs';

export const handler = async (event) => {
    const response = {
        statusCode: 200,
        body: "",
    };

    let pdfBuffer = await fs.promises.readFile('./pdfTask2.pdf');

    let result = await pdf(pdfBuffer);
    result = result.text.split('\n');


    let invoiceNumber = "";
    let invoiceDate = "";
    let tableContent = "";
    let indexSubtotal = 0;


    for (let i = 0; i < result.length; i++) {
        let currentRow = result[i];
        if (currentRow.toLowerCase().startsWith('invoice#')) {
            invoiceNumber = currentRow.substring(9);
        }
        else if (currentRow.toLowerCase().startsWith('date')) {
            invoiceDate = currentRow.substring(6);
        }
        else if (currentRow.toLowerCase().startsWith('subtotal')) {
            indexSubtotal = i;
        }
        else if (currentRow.toLowerCase().startsWith('quantitydescription')) {
            tableContent = result[i + 1];
        }
    }
    let subtotal = result[indexSubtotal + 4];
    let salestax = result[indexSubtotal + 5];
    let shippingAndHnadling = result[indexSubtotal + 5];
    let totalDue = result[indexSubtotal + 6];


    let data = { invoiceNumber, invoiceDate, tableContent, subtotal, salestax, shippingAndHnadling, totalDue }

    response.body = data ;
    return response;
};
