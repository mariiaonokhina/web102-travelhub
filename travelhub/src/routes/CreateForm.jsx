import React from "react";
import { useState, useEffect } from "react";
import { supabase } from '../client'
import axios from "axios";
import moment from "moment";

const CreateForm = () => {
    const [post, setPost] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const IMAGE_API_KEY = import.meta.env.VITE_API_KEY;

    const data = new FormData();

    const options = {
        method: 'POST',
        url: 'https://web-image-storage.p.rapidapi.com/upload',
        headers: {
          'X-RapidAPI-Key': IMAGE_API_KEY,
          'X-RapidAPI-Host': 'web-image-storage.p.rapidapi.com', 
          'Content-Type': 'multipart/form-data'
        },
        body: data
      };

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase.from('travelhub_posts').insert({
            created_at: `${moment().get('year')},${moment().get('month')},${moment().date()},${moment().get('hour')},${moment().get('minute')},${moment().get('second')}`, 
            title: post.title,
            content: post.content,
            num_upvotes: 0
        });
      
        window.location = '/';
    };

    const postImage = () => {
        data.append("image", selectedImage);
        console.log(data)

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

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
            <input id='file-picker' 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={e => setSelectedImage(e.target.files[0])}
            ></input>

            <button type='button' onClick={createPost}>Create Post</button>
            <button type='button' onClick={postImage}>TEST</button>
        </form>
    )
}

export default CreateForm;