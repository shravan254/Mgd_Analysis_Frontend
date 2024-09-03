import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LastNest from "./LastNest";

const NestMenu = ({ nestnav }) => {
  const [nest, setNest] = useState(false);
  const showSubnav1 = () => setNest(!nest);

  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive && nestnav.path && !nest ? "active-link-url" : "link-default"
        }
        to={nestnav.path}
      >
        <li
          className="submenu_link"
          onClick={() => {
            nestnav.subNav && showSubnav1();
          }}
          style={{ cursor: "pointer", paddingLeft: "20px" }}
        >
          <div className="submenu_links">
            <div className="icon" style={{ color: "white" }}>
              {nestnav.icon}
            </div>
            <div className="link_text">{nestnav.title}</div>
          </div>
        </li>
      </NavLink>
      {nest &&
        nestnav.subNav !== undefined &&
        nestnav?.subNav.length > 0 &&
        nestnav.subNav.map((lastNest, i) => {
          return <LastNest key={i} lastNest={lastNest} />;
        })}
    </>
  );
};

export default NestMenu;
