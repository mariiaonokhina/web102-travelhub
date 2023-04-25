import React, { Component, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import moment from 'moment';
import { supabase } from "../client";
import { Link } from "react-router-dom";

const Post = () => {
    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    const [upvotes, setUpvotes] = useState(0);
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        fetchPost();

        if (post != null) {
            updateTime();
        }
      }, [post, upvotes, timeAgo])

    const fetchPost = async () => {
        const {data} = await supabase
            .from('travelhub_posts')
            .select()
            .eq('post_id', post_id)

        setPost(data[0]);
        setUpvotes(data[0].num_upvotes);
    }

    const updateTime = () => {
        let initialTime = moment(post.created_at.split(',').map(function (x) { 
            return parseInt(x, 10); 
        }));

        setTimeAgo(initialTime.fromNow());
    }

    const incrementUpvotes = async () => {
        const { error } = await supabase
            .from('travelhub_posts')
            .update({'num_upvotes': upvotes + 1 })
            .eq('post_id', post_id)
        
        setUpvotes(upvotes+1);
    }

    const deletePost = async() => {
        const { error } = await supabase
        .from('travelhub_posts')
        .delete()
        .eq('post_id', post_id)

        window.location = "/";
    }

    return (
        <div className="PostPage">
            {post == null? <img id='loading-spinner' src='loading_spinner.gif' />
            
            : <div className="post-container">
                <p>Posted {timeAgo}.</p>
                <h2>{post.title}</h2>
                <h2>{post.content}</h2>

                {post.image_url != null? <img id='post-page-image' src={post.image_url}></img> : ''}

                <div className="card-btn-div">
                    <button id='upvotes-btn' onClick={incrementUpvotes}>{upvotes}<img src='thumbs-up.svg'></img></button>
                    <div className="action-btn-div">
                        <Link to={`/edit/${post_id}`} id='edit-btn'><img src='edit.svg'></img></Link>
                        <button id='delete-btn' onClick={deletePost}>Delete<img src='trash-can.svg'></img></button>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}

export default Post;