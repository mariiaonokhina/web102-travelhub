import React from "react";

const CreateForm = () => {
    return (
        <form className="CreateForm">
            <h1>Share your thoughts with others!</h1>
            
            <label htmlFor="title">Title: </label>
            <input type="text" name='title'></input>

            <label htmlFor="content">Content: </label>
            <textarea name='content'></textarea>

            <label htmlFor="image">Upload your image (optional): </label>
            <input type="file" name="image" accept="image/*"></input>

            <button type='submit'>Create Post</button>
        </form>
    )
}

export default CreateForm;