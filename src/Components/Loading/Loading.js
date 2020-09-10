import React from 'react';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Loading = (props) => {
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin loading-spinner" />
        </div>
    )

}



export default Loading