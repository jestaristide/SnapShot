import React from "react";
import { useDispatch } from "react-redux";
import {loadImage} from "../features/slice/photoSlice"

const Image = ({ url, title , image}) => {
  const dispatch = useDispatch();
  const changeImageInfo = () => {
    dispatch(loadImage(image.id))
  }

  return (
      <li  onClick={()=>changeImageInfo()}>
        <img src={url} alt={title} />
      </li>
    );
};


export default Image;
