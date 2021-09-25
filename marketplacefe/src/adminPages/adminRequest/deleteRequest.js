import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';

export const deleteProduct=(productId,callback)=>{
  const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/admin/deleteProduct?" + new URLSearchParams({ id: productId }), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((r) => {
              if (r.ok) {
                toast.info("Removed Product");
                return r;
              }
              if (r.status === 401 || r.status === 403 || r.status === 500) {
                return Promise.reject(new Error("Bir hata oluştu"));
              }
              return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
            }).then((r)=>r.json())
            .then((response)=>{ 
              if(callback!==null){
                callback();
              }
            })
            .catch((e) => {
              toast.error(e.message);
            });

}


export const deleteSeller=(sellerId,callback)=>{
  const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/admin/deleteSeller?" + new URLSearchParams({ id: sellerId }), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((r) => {
              if (r.ok) {
                toast.info("Removed Seller");
                return r;
              }
              if (r.status === 401 || r.status === 403 || r.status === 500) {
                return Promise.reject(new Error("Bir hata oluştu"));
              }
              return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
            }).then((r)=>r.json())
            .then((response)=>{ 
              if(callback!==null){
                callback();
              }
            })
            .catch((e) => {
              toast.error(e.message);
            });

}



export const deleteUser=(userId)=>{
  const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/admin/deleteUser?" + new URLSearchParams({ id: userId }), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((r) => {
              if (r.ok) {
                toast.info("Removed User");
                return r;
              }
              if (r.status === 401 || r.status === 403 || r.status === 500) {
                return Promise.reject(new Error("Bir hata oluştu"));
              }
              return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
            })
            .catch((e) => {
              toast.error(e.message);
            });

}