import React  from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Grid, GridColumn, Table, Label, Header } from "semantic-ui-react";
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import TopMenuAdmin from "../component/topMenuAdmin";
import DeleteUser from "./adminComponent/deleteUser";



class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const pageSize = 5
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/admin/getAllUser?" + new URLSearchParams({ pageNumber: this.state.currentPage,pageSize: pageSize }), {
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
    this.setState({ currentPage: i }, this.getUsers);
  };

  render() {
    const { products } = this.state;
    const pageArray = [...Array(products.totalPages).keys()];
    return (
      <div>
        <TopMenuAdmin></TopMenuAdmin>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
        columns="equal"
      >
        <GridColumn>
        <Header as='h2' icon textAlign='center'>
      <Icon name='user circle' circular />
      <Header.Content>Users</Header.Content>
    </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Index</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Surname</Table.HeaderCell>
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
                        <DeleteUser callback={this.getUsers} userId={value.id} ></DeleteUser>
                      </Table.Cell>
                      <Table.Cell>{value.username}</Table.Cell>
                      <Table.Cell>{value.name}</Table.Cell>
                      <Table.Cell>{value.surname}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
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
      </div>
    );
  }
}

export default withRouter(Users);
