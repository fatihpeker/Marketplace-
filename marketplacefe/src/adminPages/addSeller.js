import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import Input from "../component/Input";
import { addNewSeller } from "./adminRequest/addRequest"; 
import TopMenuAdmin from "../component/topMenuAdmin";
import {
  Form,
  Button,
  Header,
  Grid,
  GridColumn,
  Segment
} from "semantic-ui-react";

const AddProduct = (props) => {
  const [seller,setSeller] = useState({id:null,name:"",surname:"",salary:null});
  const [sellerError,setSellerError] = useState({name:null,surname:null,salary:null})

  const handleChange = (event)=>{
    const { name,value } = event.target;
    setSeller({...seller, [name]:value});
  }

  
  const handleSubmit = (event) =>{
    event.preventDefault();
    //const { name, surname,salary } = seller; 

    if(seller.name===""){
        setSellerError({...sellerError,name:"name cannot be null"})
        return;
    }
    else{
        setSellerError({...sellerError,name:""})
    }
    if(seller.surname===""){
        setSellerError({...sellerError,surname:"name cannot be null"})
        return;
    }
    else{
        setSellerError({...sellerError,surname:""})
    }
    if(seller.salary===null){
        setSellerError({...sellerError,salary:"name cannot be null"})
        return;
    }
    else{
        setSellerError({...sellerError,salary:null})
    }


   if(props.location.state){
     const updateSeller = {...seller,id:props.location.state.selId};
     setSeller({seller:updateSeller});
     addNewSeller(updateSeller);
   }
   else{
    addNewSeller(seller)
   }
    
    
  }

  return (
    <div>
      <TopMenuAdmin></TopMenuAdmin>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <GridColumn style={{ maxWidth: 450 }}>
        <Header as='h1' color="blue" textAlign='center'>
          Seller
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked  >
            <Input type="text" name="name" label="Name" placeholder="name" required="true" value={seller.name} onChange={handleChange} error={sellerError.name} />
            <Input type="text" name="surname" label="Surname" placeholder="surname" required="true" value={seller.surname} onChange={handleChange} error={sellerError.surname} />
            <Input type="text" name="salary" label="Salary" placeholder="salary" required="true" value={seller.salary} onChange={handleChange} error={sellerError.salary} />
            <Button type="submit" color="blue" size="large" >Submit</Button>
          </Segment>
        </Form>
      </GridColumn>
    </Grid>
    </div>
  );
  
}

export default withRouter(AddProduct);
