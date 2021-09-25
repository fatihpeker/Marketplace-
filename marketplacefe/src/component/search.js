import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Icon, Grid, GridColumn, Table, Label,Header } from "semantic-ui-react";
import TopMenu from "../component/topMenu";
import product from '../userPages/product';


const Searching=(props)=> {
  const [products,setProducts]=useState();
    
   useEffect(()=>{
    const name="as";
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/user/searchLikeName?" + new URLSearchParams({name})  , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("Bir hata oluştu"));
        }
        return Promise.reject(new Error("Bilinmeyen bir hata oluştu"));
      })
      .then(async (r) => {
        const response = await r.json();
        setProducts({ products: response });
        toast.info(response);
        console.log(response)
        //toast.info(`${response.totalElements} fetched succes`);
      }).then(() => {
        
      })
      .catch((e) => {
        toast.error(e.message);
      });

  },[props])
    
    
    return (
      <div>
      <TopMenu></TopMenu>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
        columns="equal"
      >
        <GridColumn>
        <Header as='h2' icon textAlign='center'>
      <Icon name='like' circular />
      <Header.Content>Favorite Products</Header.Content>
    </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Index</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.content.map((value, index) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon> {(index + 1)}</Label>
                      </Table.Cell>
                      <Table.Cell>{value.name}</Table.Cell>
                      <Table.Cell>
                        {value.price}
                      </Table.Cell>
                      <Table.Cell>{value.category}</Table.Cell>
                      <Table.Cell>{value.description}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </GridColumn>
      </Grid>
    </div>
    )
};

export default withRouter(Searching);