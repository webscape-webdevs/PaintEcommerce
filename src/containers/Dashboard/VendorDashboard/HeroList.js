import React, { useEffect } from "react";

import "./heroList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminHero,

} from "../../actions/heroAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";



import Sidebar from "./Sidebar";


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
  let id = "";


  hero && hero.forEach((item) => {
    id = item._id
    url = item.url
  });

  console.log(id)
  console.log(url)


  return (

    <div className="dashboard">
      <Sidebar />
      <div className="herolist-main">
        <h1>Current Hero Preview</h1>
        <div className="herolist-main-container">

          <div className="herolist-main-container-image">
            <img style={{ width: "500px" }} src={url} alt="" />
          </div>

          <div className="herolist-main-container-button">

            <Link to={`/admin/hero/${id}`}>
              <p>Change Hero Image</p>
            </Link>

          </div>
        </div>


      </div>
    </div>



  )
};

export default HeroList;
