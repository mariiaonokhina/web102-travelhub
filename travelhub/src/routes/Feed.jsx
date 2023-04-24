import React, { Component, useEffect, useState } from "react";
import Card from "../components/Card";
import {supabase} from '../client';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [orderByNewest, setOrderByNewest] = useState(false);
    const [orderByPopularity, setOrderByPopularity] = useState(false);
    const [isAscending, setIsAscending] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [orderByNewest, orderByPopularity, isAscending])

    const fetchPosts = async () => {
        const {data} = await supabase
            .from('travelhub_posts')
            .select()
            .order('created_at', { ascending: isAscending })
    
            setPosts(data);
        }

    const changeOrder = () => {
        setOrderByNewest(true);
        setIsAscending(!isAscending);
        setOrderByPopularity(false);
    }

    return (
        <div className="feed-container">
                <h1 id='feed-title'>Feed</h1>
                {posts.length == 0? <img id='loading-spinner' src='loading_spinner.gif' />: ''}
                <div className="orderby-div">
                    <h2>Order by: </h2>
                    <button id='newest-btn' type='button' onClick={changeOrder}>Newest</button>
                    <button id='popularity-btn' type='button'>Most Popular</button>
                </div>

                <div className="feed-card-container">
                    {posts && Object.entries(posts).map(([post]) => 
                        <Card key={posts[post].post_id} 
                                post_id={posts[post].post_id} 
                                created_at={posts[post].created_at} 
                                title={posts[post].title} 
                                content={posts[post].content} 
                                image_url={posts[post].image_url}
                        />
                    )}
                    
                </div>
        </div>
    )
}

export default Feed;