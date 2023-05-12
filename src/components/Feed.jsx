import React from 'react';
import { useState, useEffect } from 'react';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import {Box, Stack, Typography} from '@mui/material';
import { Sidebar, Videos } from './index.js'
const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('New');
    const [videos, setVideos] = useState([]);

    const handleChangeSelectedCategory = (cat) => {
        setSelectedCategory(cat)
    }

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
        .then(data => setVideos(data.items))
    }, [selectedCategory]);

    const date = new Date();
    const atual_year = date.getFullYear();
    return (
        <Stack sx={{flexDirection: {sx: 'column', md: 'row'}}}>
            <Box sx={{height: {sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md:2}}}>
                <Sidebar selectedCategory={selectedCategory} onChangeSelectedCategory={handleChangeSelectedCategory} />

                <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff' }}>
                    Copyright {atual_year} JSM Media
                </Typography>
            </Box>
            <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{color: 'white'}}>
                    {selectedCategory} <span style={{color: '#f31503'}}>videos</span>
                </Typography>
                <Videos videos={videos} />
            </Box>
        </Stack>
    )}

export default Feed;