import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import SideBar from "./Sidebar";
import Navbar from "../../../components/Navbar/Navbar";

export default function ProductList() {
  const { vendorProductList } = useSelector((state) => state.vendorSlice);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "Product Id", width: 250 },
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.productName}</div>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 200,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/member/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <div className="dashboard">
        <SideBar />
        <div className="prouctList">
          <h1 style={{ color: "#0597f9", textAlign: "center" }}>Products List</h1>
          <DataGrid rows={vendorProductList} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={8} checkboxSelection />
        </div>
      </div>
    </div>
  );
}
