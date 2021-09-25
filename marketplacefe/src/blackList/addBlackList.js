import React from "react";
import { Button, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify';



 const addBlackList= (props) => {
    const {sellerId,callSeller,callBlack} =props;

    const onClick = () => {
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/user/addSeller?" + new URLSearchParams({  sellerId: sellerId }), {
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
              callBlack();
            })
            .then(()=>{
              callSeller();
            })
            .catch((e) => {
              toast.error(e.message);
            });
    }

    
    return( 
        <Button icon iconPosition="left" negative   onClick={onClick} > <Icon name="thumbs down" ></Icon> Disslike</Button>  
    );
     
};
export default addBlackList;