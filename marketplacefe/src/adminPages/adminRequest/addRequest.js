import fetch from 'isomorphic-unfetch';
import React, {useState} from "react";
import { toast } from 'react-toastify';

export const NewProduct=(product)=>{
    const token = window.localStorage.getItem("token");
    var url="";
    console.log("addRequestte : "+product.id)
    if(product.id===null){
      url="http://localhost:8080/api/1.0/admin/addProduct";
    }
    else{
      url="http://localhost:8080/api/1.0/admin/updateProduct";
    }
    fetch(url,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
      credentials: "include",
    })
    .then((r)=>{
      if(r.ok){
        return r;
      }
      if(r.status===401||r.status===403||r.status===500){
        return Promise.reject(new Error("Bir hata oluştu"));
      }
      return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
    }).then((r)=>r.json())
    .then((response)=>{ 
      toast.success(`Product with id ${response.id}`);

    })
    .catch((e)=>{
      toast.error(e.message)
    });

}

export const addNewSeller=(seller)=>{
    const token = window.localStorage.getItem("token");
    var url="";
    if(seller.id===null){
      url="http://localhost:8080/api/1.0/admin/addSeller";
    }
    else{
      url="http://localhost:8080/api/1.0/admin/updateSeller";
    }
    fetch(url,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(seller),
      credentials: "include",
    })
    .then((r)=>{
      if(r.ok){
        return r;
      }
      if(r.status===401||r.status===403||r.status===500){
        return Promise.reject(new Error("Bir hata oluştu"));
      }
      return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
    }).then((r)=>r.json())
    .then((response)=>{ 
      toast.success(`Seller with id ${response.id}`);

    })
    .catch((e)=>{
      toast.error(e.message)
    });
}