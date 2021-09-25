import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, GridColumn, Table, Label,Header ,Icon } from "semantic-ui-react";
import fetch from 'isomorphic-unfetch';
import { toast } from 'react-toastify';
import TopMenu from "../component/topMenu";
import DelBlackList from "../blackList/delBlackList";


class BlackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getSeller();
  }

  getSeller = () => {
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:8080/api/1.0/user/blackList" , {
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
      <Icon name='address book' circular />
      <Header.Content>Blacklist</Header.Content>
    </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Index</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Surname</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.products &&
                this.state.products.map((value, index) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon> {(index + 1)}</Label>
                        <DelBlackList  callback={this.getSeller}  sellerId={value.id} ></DelBlackList>
                      </Table.Cell>
                      <Table.Cell>{value.name}</Table.Cell>
                      <Table.Cell>{value.surname}</Table.Cell>
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

export default withRouter(BlackList);
