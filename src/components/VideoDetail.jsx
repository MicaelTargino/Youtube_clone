import React from 'react';
import { useState, useEffect } from 'react';

import {Link, useParams} from 'react-router-dom';

import ReactPlayer from 'react-player';

import {Typography, Box, Stack} from '@mui/material';

import {CheckCircle} from '@mui/icons-material';

import {fetchFromAPI} from '../utils/fetchFromAPI';
import { Videos } from './';
const VideoDetail = () => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [videos, setVideos] = useState(null);
    const {id} = useParams();


    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
        .then(data => setVideoInfo(data.items[0]));

        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
        .then(data => setVideos(data.items));
    }, [id]);

    if (!videos) return 'Loading';

    const vids = videos;

    if(!videoInfo?.snippet) return 'Loading...';

    const {snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount}} = videoInfo;

    return (
    <Box minHeight="95vh">
        <Stack direction={{xs: 'row', md: 'column'}}>
            <Box flex={1}>
                <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
                    <ReactPlayer className="react-player" controls url={`https://www.youtube.com/watch?v=${id}`}/>
                    <Typography variant="h5" color="#fff" fontWeight="bold" p={2}>
                       {title}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" py={1} px={2} sx={{color: '#fff'}}>
                        <Link to={`/channel/${channelId}`}>
                            <Typography variant={{sm: 'subtitle1', md: 'h6'}} sx={{color: '#fff'}}>
                                {channelTitle}
                                <CheckCircle sx={{fontSize: '12px', color: 'grey', marginLeft: '5px'}} />
                            </Typography>
                        </Link>
                        <Stack direction="row" alignItems="center" gap="20px">
                            <Typography variant="body1" sx={{opacity: 0.7}}>
                                {parseInt(viewCount).toLocaleString()} views
                            </Typography>
                            <Typography variant="body1" sx={{opacity: 0.7}}>
                                {parseInt(likeCount).toLocaleString()} likes
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        <Box px={2} py={{md: 1, xs: 5}} justifyContent="center" alignItems="center">
            <Typography sx={{color:'#fff'}} variant='h3'>
                Related Videos
            </Typography>
            <Videos videos={vids}/>
        </Box>
        </Stack>
    </Box>
    )
}

export default VideoDetail;