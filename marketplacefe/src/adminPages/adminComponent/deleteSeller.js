import React  from "react";
import {withRouter} from "react-router-dom";
import { Button } from 'semantic-ui-react'
import { deleteSeller } from "../adminRequest/deleteRequest";

 const DelSeller= (props) => {
    const {sellerId, callback} = props;
    


    const onClick = () => {
        deleteSeller(sellerId,callback);
    }

    return( 
        <Button negative onClick={onClick} >delete</Button>  
    );
     
}

export default withRouter(DelSeller);