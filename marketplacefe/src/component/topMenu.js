import React from "react";
import {  withRouter } from "react-router-dom";
import { Menu,Button, Dropdown, Input,  } from "semantic-ui-react";


const TopMenu = (props) => {

  const { history } = props;
  const { push } = history;
  const product = props;

  const goProduct = () => {
    push({
      pathname: "/userPages/product",
    });
  };
  const goSeller = () => {
    push({
      pathname: "/userPages/seller",
    });
  };
  const goFavorite = () => {
    push({
      pathname: "/userPages/favoriteList",
    });
  };
  const goBlackList = () => {
    push({
      pathname: "/userPages/blackList",
    });
  };
  const logout = () => {
      window.localStorage.clear();
    push({
      pathname: "/",
    });
  };
  const search = () => {
    push({
        pathname:"/component/search",
    })
}

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
          
          <Menu.Item>
            <Button positive onClick={goFavorite}>Favorite List</Button>
          </Menu.Item>
            <Menu.Item>
              <Button active onClick={goBlackList} >Blacklist</Button>
            </Menu.Item>
          </Menu.Menu>
          

          <Menu.Menu position="right">
            <Menu.Item>
              <Button onClick={search} >Search</Button>
            </Menu.Item>
              <Menu.Item>
                  <Button negative onClick={logout}>Logout</Button>
              </Menu.Item>
          </Menu.Menu>
        </Menu>
  );
};

export default withRouter(TopMenu);
