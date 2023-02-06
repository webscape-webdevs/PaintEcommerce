import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    updateHero,
    getHeroDetails,
} from "../../actions/heroAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";

import SideBar from "./Sidebar";
import { UPDATE_HERO_RESET } from "../../constants/heroConstants";

const UpdateHero = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, hero } = useSelector((state) => state.heroDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.hero);

    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const heroId = match.params.id;

    useEffect(() => {
        if (hero && hero._id !== heroId) {
            dispatch(getHeroDetails(heroId));
        } else {

            setOldImages(hero);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Hero Updated Successfully");
            history.push("/admin/hero");
            dispatch({ type: UPDATE_HERO_RESET });
        }
    }, [
        dispatch,
        alert,
        error,
        history,
        isUpdated,
        heroId,
        hero,
        updateError,
    ]);

    const updateHeroSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();



        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateHero(heroId, myForm));
    };

    const updateHeroImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateHeroSubmitHandler}
                    >
                        <h1>Update Hero</h1>



                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateHeroImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateHero;
