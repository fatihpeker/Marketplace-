import React from "react";
import { Button, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify';

 const DelFavorite= (props) => {
    const {productId, callback} =props;

    const onClick = () => {
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/user/removeProduct?" + new URLSearchParams({ productId: productId }), {
            method: "Post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((r) => {
              if (r.ok) {
                toast.info("Removed your favorite list");
                return r;
              }
              if (r.status === 401 || r.status === 403 || r.status === 500) {
                return Promise.reject(new Error("Bir hata oluştu"));
              }
              return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
            }).then((r)=>r.json())
            .then(()=>{ 
              if(callback!==null){
                callback();
              }
            })
            .catch((e) => {
              toast.error(e.message);
            });
    }

    return( 
        <Button icon iconPosition="left" negative onClick={onClick} > <Icon name="thumbs down outline" ></Icon> dislike</Button>  
    );
     
};
export default DelFavorite;