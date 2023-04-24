import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import moment from 'moment';

const Card = ({created_at, post_id, title, content, image_url}) => {
    const [upvotes, setUpvotes] = useState(0);
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
      fetchUpvotes();
      updateTime();
    }, [upvotes])
    

    const fetchUpvotes = async () => {
        const {data} = await supabase
            .from('travelhub_posts')
            .select()
            .eq('post_id', post_id)
    
        // setUpvotes(data[0].num_upvotes);
    }

    const updateTime = () => {
        let initialTime = moment(created_at.split(',').map(function (x) { 
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

    return (
        <div id='Card'>
            <p>Posted {timeAgo}.</p>
            <h1>{title}</h1>
            <p>{content}</p>
            <img src={image_url} />
            <button onClick={incrementUpvotes}>{upvotes} upvotes</button>
        </div>
    )
}

export default Card;