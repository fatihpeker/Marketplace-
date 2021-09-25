import React  from "react";
import {withRouter} from "react-router-dom";
import { Button } from 'semantic-ui-react'
import { deleteUser } from "../adminRequest/deleteRequest";

 const DelUser= (props) => {
    const {userId, callback} = props;
    


    const onClick = () => {
        deleteUser(userId);
        callback();
    }

    return( 
        <Button negative onClick={onClick} >delete</Button>  
    );
     
}

export default withRouter(DelUser);