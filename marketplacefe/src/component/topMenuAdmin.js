import React from "react";
import {  withRouter } from "react-router-dom";
import { Menu,Button  } from "semantic-ui-react";

const TopMenuAdmin = (props) => {

  const { history } = props;
  const { push } = history;

  const goProduct = () => {
    push({
      pathname: "/adminPages/productForAdmin",
    });
  };
  const goSeller = () => {
    push({
      pathname: "/adminPages/sellerForAdmin",
    });
  };
  const goAddSeller = () => {
    push({
      pathname: "/adminPages/addSeller",
    });
  };
  const goAddProduct = () => {
    push({
      pathname: "/adminPages/addProduct",
    });
  };
  const goUsers = () => {
    push({
      pathname: "/adminPages/users",
    });
  };
  const logout = () => {
      window.localStorage.clear();
    push({
      pathname: "/",
    });
  };

  return (
    <Menu attached="top">
          <Menu.Menu>
          <Menu.Item position="left">
            <Button primary onClick={goProduct}>
              Products
            </Button>
          </Menu.Item>

          <Menu.Item position="left">
            <Button primary onClick={goSeller}>
              Seller
            </Button>
          </Menu.Item>

          <Menu.Item position="left">
            <Button primary onClick={goUsers}>
              Users
            </Button>
          </Menu.Item>
          
          <Menu.Item>
            <Button positive onClick={goAddSeller}>Add new Seller</Button>
          </Menu.Item>
            <Menu.Item>
              <Button active onClick={goAddProduct} >Add new Product</Button>
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
              <Menu.Item>
                  <Button negative onClick={logout}>Logout</Button>
              </Menu.Item>
          </Menu.Menu>
        </Menu>
  );
};

export default withRouter(TopMenuAdmin);
