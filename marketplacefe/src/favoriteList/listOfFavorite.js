import fetch from 'isomorphic-unfetch';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

let favo = []

export const getFavorite=()=>{
  const token = window.localStorage.getItem("token");
  fetch("http://localhost:8080/api/1.0/user/favoriteList", {
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
      favo=response;
      //this.setState({ products: response });
      toast.info(response);
      toast.info(`${response} fetched succes`);
    })
    .catch((e) => {
      toast.error(e.message);
    });
}



export const isIn=(productId)=>{
  var flag=false;
  favo.forEach(element => {
    if(element.id===productId){
      flag=true;
    }
  });
  return flag;
}
