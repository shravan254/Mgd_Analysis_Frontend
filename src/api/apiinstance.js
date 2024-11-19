export const getRequest = async (url, callback) => {
  //console.log("In getRequest url  = ", url);
  let response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let content = await response.json();
  callback(content);
};

export const postRequest = async (url, body, callback) => {
  //console.log("url = ", url);
  //console.log("body = ", body);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  //console.log("response = ", response);
  let content = await response.json();
  callback(content);
};

export const postRequestFormData = async (url, data, callback) => {
  console.log("Url = ", url);
  console.log("data = ", data);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      // 'Content-Type': 'multipart/form-data'
    },
    body: data,
  });
  callback(response);
};
