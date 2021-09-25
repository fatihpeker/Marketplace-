import React from "react";
import { Button, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify';

 const DelBlackList= (props) => {
    const {sellerId, callback, callBlack} =props;

    const onClick = () => {
        const token = window.localStorage.getItem("token");
        fetch("http://localhost:8080/api/1.0/user/removeSeller?" + new URLSearchParams({ sellerId: sellerId }), {
            method: "Post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((r) => {
              if (r.ok) {
                toast.info("Removed your Blacklist");
                return r;
              }
              if (r.status === 401 || r.status === 403 || r.status === 500) {
                return Promise.reject(new Error("Bir hata oluştu"));
              }
              return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
            }).then((r)=>r.json())
            .then(()=>{ 
              if(callBlack!==null&&callBlack!==undefined){
                callBlack();
              }
            })
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
        <Button icon iconPosition="left" primary onClick={onClick} > <Icon name="handshake outline" ></Icon> Forgive</Button>  
    );
     
};
export default DelBlackList;