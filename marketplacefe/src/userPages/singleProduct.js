
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import product from './product';
import { toast } from 'react-toastify';


const SingleProduct=(props) =>{

    const productId = props;
    const [product,setProduct]=useState();


    useEffect(()=>{
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/user/byId" + new URLSearchParams({ productId: productId }) , {
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
            setProduct(response)
          })
          .catch((e) => {
            toast.error(e.message);
          });
    })
    

    

    return(
        <div>
            {product.name}
        </div>
        )

};

export default withRouter(SingleProduct);