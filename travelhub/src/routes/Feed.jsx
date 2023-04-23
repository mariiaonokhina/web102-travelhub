import React, { Component, useEffect, useState } from "react";
import Card from "../components/Card";
import {supabase} from '../client';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const {data} = await supabase
            .from('travelhub')
            .select()
            .order('created_at', { ascending: false })
    
            setPosts(data);
        }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="feed-container">
                <h1 id='feed-title'>Feed</h1>
                {/* {posts.length == 0? <h1>¯\_(ツ)_/¯ <br></br> Nothing yet</h1>: ''} */}
                {posts.length == 0? <img id='loading-spinner' src='loading_spinner.gif' />: ''}

                <div className="feed-card-container">
                    {posts && Object.entries(posts).map(([post]) => 
                        <Card key={posts[post].post_id} 
                                post_id={posts[post].post_id} 
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