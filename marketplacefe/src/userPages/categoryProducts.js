import React from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Grid, GridColumn, Table, Label } from "semantic-ui-react";
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import AddFavorite from "../favoriteList/AddFavorite";
import DelFavorite from "../favoriteList/DelFavorite";


class CategoryProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const pageSize = 5
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/user/category?" + new URLSearchParams({category:this.state.props, pageNumber: this.state.currentPage,pageSize: pageSize }), {
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
        toast.info(`${response.totalElements} fetched succes`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getProducts);
  };

  render() {
    const { products } = this.state;
    const pageArray = [...Array(products.totalPages).keys()];
    const username = window.localStorage.getItem("username")
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
        columns="equal"
      >
        <GridColumn>
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
              {products &&
                products.content &&
                products.content.map((value, index) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>{products.size * products.number + (index + 1)}</Label>
                        <AddFavorite username={username} productId={value.id} ></AddFavorite>
                        <DelFavorite username={username} productId={value.id} ></DelFavorite>
                      </Table.Cell>
                      <Table.Cell>{value.name}</Table.Cell>
                      <Table.Cell>{value.price}</Table.Cell>
                      <Table.Cell>{value.category}</Table.Cell>
                      <Table.Cell>{value.description}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5">
                  <Menu floated="right" pagination>
                    <Menu.Item
                      onClick={() => {
                        this.changePageTo(this.state.currentPage - 1);
                      }}
                      as="a"
                      disabled={products.first}
                      icon
                    >
                      <Icon name="chevron left" />
                    </Menu.Item>
                    {pageArray.map((value, index) => {
                      return (
                        <Menu.Item
                          onClick={() => {
                            this.changePageTo(index);
                          }}
                          active={products.number === value}
                          as="a"
                        >
                          {value+1}
                        </Menu.Item>
                      );
                    })}
                    <Menu.Item
                      onClick={() => {
                        this.changePageTo(this.state.currentPage + 1);
                      }}
                      as="a"
                      disabled={products.last}
                      icon
                    >
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </GridColumn>
      </Grid>
    );
  }
}

export default withRouter(CategoryProducts);
