import React from "react";
import "./sidebar.css";

import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/vendorDashboard">
        <p style={{ fontSize: "25px", fontWeight: "700" }}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <div className="tree" style={{ marginLeft: "10px" }}>
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
          <TreeItem nodeId="1" label="Products">
            <Link to="/vendorDashboard/productList">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/vendorDashboard/newProduct">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </div>

      <Link to="/admin/hero" style={{ marginLeft: "10px" }}>
        <p>
          <ListAltIcon />
          Hero Section
        </p>
      </Link>
      <Link to="/admin/orders" style={{ marginLeft: "10px" }}>
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      {/* <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link> */}
    </div>
  );
};

export default Sidebar;
