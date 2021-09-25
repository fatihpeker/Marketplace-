import React  from "react";
import {withRouter} from "react-router-dom";
import { Button } from 'semantic-ui-react'


 const UpdateSeller= (props) => {
    const {id} = props;
    const {history} = props;
    const {push} = history;


    const onClick = () => {
        //push(`./addProduct/`,id)
        push({
            pathname:"../adminPages/addSeller",
            state: {selId: id}
        })
    }

    return( 
        <Button primary onClick={onClick} >update</Button>  
    );
     
}

export default withRouter(UpdateSeller);