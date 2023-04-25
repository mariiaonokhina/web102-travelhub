import React, { Component, useEffect, useState } from "react";
import Card from "../components/Card";
import {supabase} from '../client';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [orderByNewest, setOrderByNewest] = useState(true);
    const [orderByPopularity, setOrderByPopularity] = useState(false);
    const [isAscending, setIsAscending] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [orderByNewest, orderByPopularity, isAscending])

    const fetchPosts = async () => {
        if (orderByNewest == true) {
            const {data} = await supabase
                .from('travelhub_posts')
                .select()
                .order('created_at', { ascending: isAscending })
            setPosts(data);
        }
        
        else if (orderByPopularity == true) {
            const {data} = await supabase
                .from('travelhub_posts')
                .select()
                .order('num_upvotes', { ascending: !isAscending })
            setPosts(data);
        }
    }

    const newestPostsFirst = () => {
        setOrderByPopularity(false);
        setOrderByNewest(true);
        setIsAscending(!isAscending);
    }

    const popularPostsFirst = () => {
        setOrderByPopularity(true);
        setOrderByNewest(false);
        setIsAscending(!isAscending);
    }

    return (
        <div className="feed-container">
                <h1 id='feed-title'>Feed</h1>
                {posts.length == 0? <img id='loading-spinner' src='loading_spinner.gif' />: ''}
                <div className="orderby-div">
                    <h2>Order by: </h2>
                    <button id='newest-btn' type='button' onClick={newestPostsFirst}>Newest</button>
                    <button id='popularity-btn' type='button' onClick={popularPostsFirst}>Most Popular</button>
                </div>

                <div className="feed-card-container">
                    {posts && Object.entries(posts).map(([post]) => 
                        <Card key={posts[post].post_id} 
                                post_id={posts[post].post_id} 
                                created_at={posts[post].created_at} 
                                title={posts[post].title} 
                                content={posts[post].content} 
                        />
                    )}
                    
                </div>
        </div>
    )
}

export default Feed;