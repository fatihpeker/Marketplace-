import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';

let black = []

export const getBlack=()=>{
  const token = window.localStorage.getItem("token");
  fetch("http://localhost:8080/api/1.0/user/blackList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((r) => {
      if (r.ok) {
        return r;
      }
      if (r.status === 401 || r.status === 403 || r.status === 500) {
        return Promise.reject(new Error("Bir hata oluştu"));
      }
      return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
    })
    .then(async (r) => {
      const response = await r.json();
      black=response;
      toast.info(response);
      toast.info(`${response} fetched succes`);
    })
    .catch((e) => {
      toast.error(e.message);
    });
}



export const isInBlack=(sellerId)=>{
  var flag=false;
  black.forEach(element => {
    if(element.id===sellerId){
      flag=true;
    }
  });
  return flag;
}
