import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu,Button } from "semantic-ui-react";

const Sıngupin = (props) => {

  const { history } = props;
  const { push } = history;

  const login = () => {
    push({
      pathname: "/pages/login",
    });
  };
  const singUp = () => {
    push({
      pathname: "/pages/register",
    });
  };
  const goHome = () => {
    push({
      pathname: "/",
    });
  };

  return (
    <Menu attached="top">
          <Menu.Item>
            <Button primary onClick={singUp}>
              Sign up
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button positive onClick={login}>Log-in</Button>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button active onClick={goHome} >What's in</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
  );
};

export default withRouter(Sıngupin);
