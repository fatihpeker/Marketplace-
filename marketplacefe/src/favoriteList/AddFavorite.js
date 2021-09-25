import React from "react";
import { Button, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify';


 const addFavorite= (props) => {
    const {productId,callProducts,callFav} =props;

    const onClick = () => {
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/user/addProduct?" + new URLSearchParams({ productId: productId }), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((r) => {
              if (r.ok) {
                toast.info("Added");
                return r;
              }
              if (r.status === 401 || r.status === 403 || r.status === 500) {
                return Promise.reject(new Error("Bir hata oluştu"));
              }
              return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
            }).then(()=>{
              callFav();
            })
            .then(()=>{
              callProducts();
            })
            .catch((e) => {
              toast.error(e.message);
            });
    }

    return( 
        <Button icon iconPosition="left" positive  onClick={onClick} > <Icon name="like" ></Icon> Favorite</Button>  
    );
     
};
export default addFavorite;