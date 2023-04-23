import React from "react";

const Card = ({post_id, title, content, image_url}) => {
    return (
        <div id='Card'>
            <h1>{post_id}: {title}</h1>
            <p>{content}</p>
            <img src={image_url} />
        </div>
    )
}

export default Card;