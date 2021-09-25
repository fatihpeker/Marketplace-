import React  from "react";
import {withRouter} from "react-router-dom";
import { Button } from 'semantic-ui-react'
import { deleteProduct } from "../adminRequest/deleteRequest";

 const DelProduct= (props) => {
    const {productId, callback} = props;
    


    const onClick = () => {
        deleteProduct(productId,callback);
    }

    return( 
        <Button negative onClick={onClick} >delete</Button>  
    );
     
}

export default withRouter(DelProduct);