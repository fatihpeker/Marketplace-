import React from "react";
import { withRouter } from "react-router-dom";
import { Icon, Grid, GridColumn, Table, Label,Header } from "semantic-ui-react";
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import TopMenu from "../component/topMenu";
import DelFavorite from "../favoriteList/DelFavorite";


class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  

  getProducts = () => {
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/user/favoriteList" , {
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
        this.setState({ products: response });
        toast.info(response);
        //toast.info(`${response.totalElements} fetched succes`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  render() {
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
              {this.state.products &&
                this.state.products.map((value, index) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon> {(index + 1)}</Label>
                        <DelFavorite  callback={this.getProducts}  productId={value.id} ></DelFavorite>
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
    );
  }
}

export default withRouter(Favorite);
