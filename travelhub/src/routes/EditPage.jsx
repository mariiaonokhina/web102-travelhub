import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {supabase} from '../client';

const EditPage = () => {
    const [details, setDetails] = useState(null);
    const [post, setPost] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageLink, setCurrentImageLink] = useState(null);
    const params = useParams();

    const IMAGE_API_KEY = import.meta.env.VITE_API_KEY;

    const getDetail = async () => {
        const { data, error } = await supabase
        .from('travelhub_posts')
        .select()
        .eq('post_id', params.post_id)
    
        setDetails({"title": data[0].title, 
                    "content": data[0].content});
        
        getDetail().catch(error);
    };

    useEffect(() => {
        getDetail();
        console.log(params.post_id)
    }, [])

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('travelhub_posts')
            .update({title: post.title, content: post.content, image_url: currentImageLink})
            .eq('post_id', params.post_id)
            .select()

        setDetails({title: post.title, content: post.content, image_url: post.currentImageLink})

        window.location = `/${params.post_id}`;
    }

    const handleChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value,
        });
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

    return (
        <div className="edit-container">
            {details != null? 
                <form className="CreateForm">
                <h1>Edit Your Post!</h1>
                
                <div className="title-input-div">
                    <label htmlFor="title">Title: </label>
                    <input type="text" className='title-input' name='title' onChange={handleChange}></input>
                </div>
    
                <div className="content-input-div">
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
    
                <button className='create-post-btn' type='button' onClick={updatePost}>Edit Post</button>
            </form>
                : <img src='loading_spinner'></img>
            }
        </div>
    )
}

export default EditPage;
