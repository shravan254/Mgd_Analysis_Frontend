import * as React from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation } from "react-router-dom";

// MemoryRouter,    //assign initilal state

{
  /* <MemoryRouter initialEntries={['/inbox']} initialIndex={0}></MemoryRouter> */
} //this will wrap whole return

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div style={{ marginLeft: "10px" }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return last ? (
            <Typography key={index} style={{ fontSize: "14px" }}>
              {value}
            </Typography>
          ) : (
            <Link
              to={to}
              key={index}
              style={{ textDecoration: "none", fontSize: "14px" }}
            >
              {" "}
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
