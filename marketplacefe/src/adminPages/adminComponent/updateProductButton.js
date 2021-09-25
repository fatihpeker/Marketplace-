import React  from "react";
import {withRouter} from "react-router-dom";
import { Button } from 'semantic-ui-react'


 const UpdateProduct= (props) => {
    const {id} = props;
    const {history} = props;
    const {push} = history;


    const onClick = () => {
        //push(`./addProduct/`,id)
        push({
            pathname:"/adminPages/addProduct",
            state: {proid: id}
        })
    }

    return( 
        <Button primary onClick={onClick} >update</Button>  
    );
     
}

export default withRouter(UpdateProduct);