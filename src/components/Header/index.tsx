import React, { useState } from "react";
import { Drawer, Button } from "antd";
import LeftMenu from "./left";
import RightMenu from "./right";
import "./navbar.scss";

/**
 * This Navbar is made as a solution for the non responsivness
 * of Ant design navbar
 * Finally I chose to use the custom navbar that I initially made with tailwind
 * Hopefully taiwind and AntD won't override
 * Even tho I think that they wouldn't override eachother
 */

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="/">logo</a>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button
          className="barsMenu"
          type="primary"
          onClick={(e) => setVisible(true)}
        >
          <span className="barsBtn" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={(e) => setVisible(false)}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
