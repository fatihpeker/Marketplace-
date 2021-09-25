import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';

export const UpProduct=(id,name, price,category,description)=>{
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/admin/updateProduct",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({id,name, price,category,description}),
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
      toast.success(`Product with name ${response.name} updated.`);

    })
    .catch((e)=>{
      toast.error(e.message)
    });

}