// let API = "http://localhost:3002";
//let API = "http://172.16.20.39:3001";
//let API = "http://20.204.144.125:3001";

let API = process.env.REACT_APP_API_KEY;
export default {
  // Customer
  getCustomers: async (response) => {
    const rawResponse = await fetch(`${API}/customers/allcustomers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await rawResponse.json();
    response(content);
  },
  // getting Existing Customer Details
  /* getCustomerdets: async (data, response) => {
        const rawResponse = await fetch(`${API}/customers/getcustomer`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await rawResponse.json();
        response(content);
    },
    saveQuotationItems: async (data, response) => {
        const rawResponse = await fetch(`${API}/quotation/quotationitemslist`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await rawResponse.json();
        response(content);
    },
    dxfupload: async (files, response) => {
        const data = new FormData();
        console.log(files)
        for(let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        const rawResponse = await fetch(`${API}/file/uploaddxf`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                // 'Content-Type': 'multipart/form-data'
            },
            body: data
        });
        const content = await rawResponse.json();
        response(content);
    }*/
};
