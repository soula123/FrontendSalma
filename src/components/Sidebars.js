//import "./Sidebars.css"
import React, { useState } from "react";
import {
  RiHome4Line,
  RiTeamLine,
  RiCalendar2Line,
  RiFolder2Line,
  RiUserFollowLine,
  RiPlantLine,
  RiStackLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import logo from "../neoxam_logo.png";
import { Link, Outlet, NavLink } from "react-router-dom";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";

import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import { fontFamily } from "@mui/system";
import StorageIcon from "@mui/icons-material/Storage";
import SchemaIcon from "@mui/icons-material/Schema";
import GroupIcon from "@mui/icons-material/Group";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";

const MENU_ITEMS = [{
  icon : StorageIcon,
  title : 'Environnement',
  roles : ['Admin','User'],
  link : '/environment'
},
{
  icon : SchemaIcon,
  title : 'Schema',
  roles : ['Admin'],
  link : '/schema'
},
{
  icon : GroupIcon,
  title : 'Users',
  roles : ['Admin'],
  link : '/users'
},

{
  icon : RiCalendar2Line,
  title : 'Treatment',
  roles : ['Admin','User'],
  link : '/traitement'
},
{
  icon : AutorenewIcon,
  title : 'Load',
  roles : ['Admin','User'],
  link : '/load'
}
]

const Sidebars = () => {
  
  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const [activePage, setActivePage] = useState(null);

  function handleActive(event) {
    console.log(window.location.pathname === "/Schema");
    if (!event.target.classList.value.includes("active")) {
      event.target.classList.toggle("active");
      if (activePage) activePage.classList.remove("active");
      setActivePage(event.target);
    }
  }
  return (
    <div className="sidebar-container">
      <Sidebar
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100vh" }}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      >
        <Menu>
          {collapsed ? (
            <MenuItem
              icon={<FiChevronsRight />}
              onClick={() => {
                collapseSidebar();
                handleCollapsedChange();
              }}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FiChevronsLeft />}
              onClick={() => {
                collapseSidebar();
                handleCollapsedChange();
              }}
            >
              <div
                style={{
                  padding: "9px",
                  // textTransform: "uppercase",
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontSize: 14,
                  letterSpacing: "14px",
                }}
              >
                <img src={logo} style={{ width: "150px" }} />
              </div>
            </MenuItem>
          )}
          <hr />
        </Menu>

        <Menu
          style={{ marginTop: "10px" }}
          menuItemStyles={{
            button: ({ level, active, hover }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  fontWeight: active ? "bold" : undefined,
                  backgroundColor: active ? "#08dbba" : undefined,
                };
            },
          }}
        >
          {MENU_ITEMS.filter(ITEM=>{
            return ITEM.roles.includes('User')
          }).map(ITEM =>(
             <Link
             style={{ color: "inherit", textDecoration: "inherit" }}
             to={ITEM.link}
           >
             <MenuItem
               active={window.location.pathname === ITEM.link}
               onClick={handleActive}
               className="item"
               icon={<ITEM.icon />}
               style={{ fontSize: "15px" }}
             >
               {ITEM.title}
             </MenuItem>
           </Link>
          ))}
          <div style={{ marginTop: "300px" }}>
            <hr></hr>
            <MenuItem
              className="item"
              icon={<SettingsIcon />}
              style={{ fontSize: "15px" }}
            >
              Settings
            </MenuItem>
            <MenuItem
              className="item"
              icon={<ExitToAppIcon />}
              style={{ fontSize: "15px" }}
            >
              logout
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export { Sidebars };
