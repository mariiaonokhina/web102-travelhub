import React from "react";
import { useState, useEffect } from "react";
import {supabase} from '../client';

export const searchResults = [];

export const SearchBar = () => {
    const [posts, setPosts] = useState([]);
    const [targetTitle, setTargetTitle] = useState('');
    useEffect(() => {
        fetchPosts();
    }, [posts])
    

    const fetchPosts = async () => {
        const {data} = await supabase
            .from('travelhub_posts')
            .select()
            .order('created_at', { ascending: true })
        setPosts(data);
    }

    const search = () => {
        const postToBeFound = targetTitle['title'].toLowerCase();
    
        for(let i = 0; i < posts.length; i++) {
            let lowercaseTitle = posts[i].title.toLowerCase();
            if(lowercaseTitle.includes(postToBeFound)) {
                searchResults.push(posts[i]);
            }
        }
        console.log(searchResults)
    }
    
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            search();
            window.location = '/search';
        }
    };

    const handleChange = (event) => {
        setTargetTitle({
            ...targetTitle,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <input type='text' className="SearchBar" name='title' onKeyDown={handleKeyDown} onChange={handleChange} placeholder="Search by title..."></input>
    )
}

const SearchPage = () => {
    console.log(searchResults)
    return (
        <div className="SearchPage">
            <SearchBar />

            <h2>Search results:</h2>
            {searchResults.length == 0 ? <h2>Nothing found :C</h2> 
            : <div className="search-results-container">
                {searchResults && Object.entries(searchResults).map(([post]) => 
                    <Card key={searchResults[post].post_id} 
                    post_id={searchResults[post].post_id} 
                    created_at={searchResults[post].created_at} 
                    title={searchResults[post].title} 
                    content={searchResults[post].content} 
                    image_url={searchResults[post].image_url}
            />)}
            </div>}
        </div>
    )
}

export default SearchPage;