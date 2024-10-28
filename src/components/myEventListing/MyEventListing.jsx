import React, { useState } from "react";
import "./MyEventListing.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PopUpMain from "../popupmain/PopUpMain";
import EditEventListing from "./../editEventListing/EditEventListing";
import { deleteEvent } from "../../services/events/eventServices";

const MyEventListing = ({ keyProp, img, title, price }) => {
  //console.log(keyProp);
  const [showEdit, setShowEdit] = useState(false);

  const toggleEditPopUp = () => {
    setShowEdit(!showEdit);
  };

  const eventDelete = async () => {
    try {
      await deleteEvent(keyProp);
      //console.log("deleted");
      window.location.reload();
    } catch (error) {
      console.log("can't delete event ", error);
    }
  };

  return (
    <div className="myEventListing">
      <div className="body-container">
        <img src={img} alt="" />
        <span className="title">{title}</span>
        <span className="price">{price}$</span>
      </div>
      <div className="icons">
        <i class="fa-regular fa-pen-to-square" onClick={toggleEditPopUp}></i>
        <i class="fa-regular fa-trash-can" onClick={eventDelete}></i>
      </div>
      {showEdit && (
        <PopUpMain
          Component={
            <EditEventListing eventId={keyProp} onClose={toggleEditPopUp} />
          }
        />
      )}
    </div>
  );
};

export default MyEventListing;
