import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import Input from "../component/Input";
import { NewProduct } from "./adminRequest/addRequest"; 
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
  const [product,setProduct] = useState({id:null, name:"",price:null,category:"",stock:null,description:""});
  const [productError,setProductError] = useState({name:null,price:null,category:null})
 
  const handleChange = (event)=>{
    const { name,value } = event.target;
    setProduct({...product, [name]:value});
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault();
   // const { name, price,category,stock,description } = product; 

    if(product.name===""){
        setProductError({...productError,name:"name cannot be null"})
        return;
    }
    else{
        setProductError({...productError,name:""})
    }
    if(product.category===""){
        setProductError({...productError,category:"category cannot be null"})
        return;
    }
    else{
        setProductError({...productError,category:""})
    }
    if(product.price===null){
        setProductError({...productError,price:"price cannot be null"})
        return;
    }
    else{
        setProductError({...productError,price:null})
    }



    if(props.location.state!==undefined){
      const updateProduct = {...product,id:props.location.state.proid}
      setProduct({product:updateProduct});
      NewProduct(updateProduct);
    }
    else{
      NewProduct(product)
    }

  }


  return (
      <div>
          <TopMenuAdmin></TopMenuAdmin>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <GridColumn style={{ maxWidth: 450 }}>
        <Header as='h1' color="blue" textAlign='center'>
          Product
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked  >
            <Input type="text" name="name" label="Name" placeholder="name" required="true" value={product.name} onChange={handleChange} error={productError.name} />
            <Input type="text" name="price" label="Price" placeholder="price" required="true" value={product.price} onChange={handleChange} error={productError.price} />
            <Input type="text" name="category" label="Category" placeholder="category" required="true" value={product.category} onChange={handleChange} error={productError.category} />
            <Input type="text" name="stock" label="Stock" placeholder="stock" required="false" value={product.stock} onChange={handleChange} />
            <Input type="text" name="description" label="Description" placeholder="description" required="false" value={product.description} onChange={handleChange}  />
            <Button type="submit" color="blue" size="large" >Submit</Button>
          </Segment>
        </Form>
      </GridColumn>
    </Grid>
    </div>
  );
  
}

export default withRouter(AddProduct);
