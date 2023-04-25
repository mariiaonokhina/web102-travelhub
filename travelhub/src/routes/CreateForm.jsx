import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from '../client'
import axios from "axios";
import moment from "moment";

const CreateForm = () => {
    const [post, setPost] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageLink, setCurrentImageLink] = useState(null);

    const IMAGE_API_KEY = import.meta.env.VITE_API_KEY;

    const createPost = async (event) => {
        event.preventDefault();

        if (selectedImage != null) {
            postImage();
        }

        if(selectedImage == null) {
            await supabase.from('travelhub_posts').insert({
                created_at: `${moment().get('year')},${moment().get('month')},${moment().date()},${moment().get('hour')},${moment().get('minute')},${moment().get('second')}`, 
                title: post.title,
                content: post.content,
                num_upvotes: 0
            });
        }
      
        else {
            await supabase.from('travelhub_posts').insert({
                created_at: `${moment().get('year')},${moment().get('month')},${moment().date()},${moment().get('hour')},${moment().get('minute')},${moment().get('second')}`, 
                title: post.title,
                content: post.content,
                image_url: currentImageLink, 
                num_upvotes: 0
            })
        }
      
        window.location = '/';
    };

    const postImage = () => {
        const formData = new FormData();
        formData.append("image", selectedImage);

        fetch(
            "https://web-image-storage.p.rapidapi.com/upload", {
            method: "POST",
            headers: {
            "X-RapidAPI-Key": IMAGE_API_KEY,
            "X-RapidAPI-Host": "web-image-storage.p.rapidapi.com",
        },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setCurrentImageLink(data.url);
            })
            .catch((error) => console.error(error));
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
            
            <div className='title-input-div'>
                <label htmlFor="title">Title: </label>
                <input className='title-input' type="text" name='title' onChange={handleChange}></input>
            </div>
            

            <div className='content-input-div'>
                <label htmlFor="content">Content: </label>
                <textarea className='content-input' name='content' onChange={handleChange}></textarea>
            </div>
            
            <div className="upload-image-div">
                <label htmlFor="image">Upload your image (optional): </label>
                <input id='file-picker' 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    onChange={e => setSelectedImage(e.target.files[0])}
                ></input>

                <button className='upload-img-btn' type='button' onClick={postImage}>Upload Image</button>
            </div>

            <button className='create-post-btn' type='button' onClick={createPost}>Create Post</button>
        </form>
    )
}

export default CreateForm;