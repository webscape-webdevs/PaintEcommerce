import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./heroList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminHero,

} from "../../actions/heroAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";

import SideBar from "./Sidebar";


const HeroList = ({ history }) => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, hero } = useSelector((state) => state.hero);

  const { error: deleteError } = useSelector(
    (state) => state.hero
  );



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    dispatch(getAdminHero());
  }, [dispatch, alert, error, deleteError, history]);

  let url = "";
  const rows = [];

  hero && hero.forEach((item) => {
    rows.push({
      id: item._id,

    });
    url = item.url
  });


  const columns = [
    { field: "id", headerName: "Hero ID", minWidth: 200, flex: 0.5 },

    {
      field: "img",
      headerName: "Hero Image",
      minWidth: 200,
      minHeight: 500,
      flex: 0.5,
      type: "image",
      renderCell: () => {
        return (
          <div>
            <img style={{ width: "300px", margineTop: "20px" }} src={url} alt='' />

          </div>)

      }
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>

            <Link to={`/admin/hero/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

          </Fragment>
        );
      },
    },
  ];



  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <img style={{ width: "200px" }} src={url} alt="" />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HeroList;
