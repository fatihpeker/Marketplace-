import React  from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Grid, GridColumn, Table, Label,Header } from "semantic-ui-react";
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import AddBlackList from "../blackList/addBlackList";
import DelBlackList from "../blackList/delBlackList";
import TopMenu from "../component/topMenu";
import {getBlack, isInBlack} from "../blackList/listOfBlackSeller"



class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      currentPage: 0,
    };
  }

  componentDidMount() {
    getBlack();
    this.getSeller();
  }

  getSeller = () => {
    const pageSize = 5
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/user/getAllSeller?" + new URLSearchParams({ pageNumber: this.state.currentPage,pageSize: pageSize }), {
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
        this.setState({ seller: response });
        toast.info(`${response.totalElements} fetched succes`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  changePageTo = (i) => {
    this.setState({ currentPage: i }, this.getSeller);
  };

  render() {
    const { seller } = this.state;
    const pageArray = [...Array(seller.totalPages).keys()];
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
      <Icon name='user outline' circular />
      <Header.Content>Sellers</Header.Content>
    </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Index</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Surname</Table.HeaderCell>
                <Table.HeaderCell>Salary</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {seller &&
                seller.content &&
                seller.content.map((value, index) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>{seller.size * seller.number + (index + 1)}</Label>
                       {isInBlack(value.id) ? <Icon color="black" name="x">Bad</Icon> : <AddBlackList callBlack={getBlack} callSeller={this.getSeller} sellerId={value.id} ></AddBlackList>}
                        {/* <DelBlackList callBlack={getBlack} callback={[this.getSeller]} sellerId={value.id} ></DelBlackList> */}
                      </Table.Cell>
                      <Table.Cell>{value.name}</Table.Cell>
                      <Table.Cell>{value.surname}</Table.Cell>
                      <Table.Cell>{value.salary}</Table.Cell>
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
                      disabled={seller.first}
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
                          active={seller.number === value}
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
                      disabled={seller.last}
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

export default withRouter(Seller);
