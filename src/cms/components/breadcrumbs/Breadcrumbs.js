import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  breadcrumbs: {
    fontSize: "16px",
  },
}));

export default function ListBreadcrumbs(props) {
  const classes = useStyles();
  const [menuList, setMenuList] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [subMenu, setSubMenu] = useState("");
  const [subMenu2, setsubMenu2] = useState("");
  const [subMenuType, setsubMenuType] = useState("");

  useEffect(() => {
    setMenuList(props.menu);
    setSubMenu(props.subMenu);
    setUrl(props.url);
    setName(props.name);
    if (!isEmpty(props.subMenu2)) {
      setsubMenu2(props.subMenu2);
      setsubMenuType(props.subMenuType);
    }
  }, [
    props.menu,
    props.name,
    props.subMenu,
    props.subMenu2,
    props.subMenuType,
    props.submenu2,
    props.url,
  ]);

  return (
    <>
      {menuList !== "" ? (
        <div>
          {subMenu === "" ? (
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                style={{ color: "black", fontSize: "14px", fontWeight: "500" }}
                to={url}
              >
                {name}
              </Link>
            </Breadcrumbs>
          ) : subMenu2 !== "" ? (
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                style={{ color: "black", fontSize: "14px", fontWeight: "500" }}
                to={url}
              >
                {name}
              </Link>
              <Link
                style={{ color: "black", fontSize: "14px", fontWeight: "500" }}
                to={url}
              >
                {subMenu}
              </Link>
              <Typography
                style={{ fontSize: "14px", textTransform: "capitalize" }}
                color="textPrimary"
              >
                {subMenuType}
              </Typography>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs
              className={classes.breadcrumbs}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                style={{ color: "black", fontSize: "14px", fontWeight: "500" }}
                to={url}
              >
                {name}
              </Link>
              <Typography
                style={{ fontSize: "14px", textTransform: "capitalize" }}
                color="textPrimary"
              >
                {subMenu}
              </Typography>
            </Breadcrumbs>
          )}
        </div>
      ) : null}
    </>
  );
}
