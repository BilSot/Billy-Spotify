import React from "react";
import {UserDetailsModel} from "../../types/models";
import "./UserDetails.css"

interface UserDetailsProps {
    loggedInUser: UserDetailsModel
}

const UserDetails: React.FC<UserDetailsProps> = ({loggedInUser}) => {
    return (
        <div className="user-details-container">
            {loggedInUser.loaded && (
                <div className="user-details-container-info">
                    <img className="user-details-container-info-img" src={loggedInUser.image} alt="spotify-user-photo"/>
                    <span className="user-details-container-info-name">{loggedInUser.display_name}</span>
                </div>
            )}
            {!loggedInUser.loaded && (
                <div></div>
            )}
        </div>
    )
}

export default UserDetails;
