import React from "react";
import { useState, useEffect } from "react";
import { supabase } from '../client'

const CreateForm = () => {
    const [post, setPost] = useState('');

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase.from('travelhub').insert({
          title: post.title,
          content: post.content,
        });
      
        window.location = '/';
    };

    const handleChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value,
        });
      };

    return (
        <form className="CreateForm">
            <h1>Share your thoughts with others!</h1>
            
            <label htmlFor="title">Title: </label>
            <input type="text" name='title' onChange={handleChange}></input>

            <label htmlFor="content">Content: </label>
            <textarea name='content' onChange={handleChange}></textarea>

            <label htmlFor="image">Upload your image (optional): </label>
            <input type="file" name="image" accept="image/*"></input>

            <button type='button' onClick={createPost}>Create Post</button>
        </form>
    )
}

export default CreateForm;