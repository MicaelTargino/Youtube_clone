import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Box} from '@mui/material';
import {Videos, ChannelCard} from './';
import {fetchFromAPI} from '../utils/fetchFromAPI';
const ChannelDetail = () => {
    const { id } = useParams();
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`)
        .then(data => setChannelDetail(data?.items[0]));

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
        .then(data => setVideos(data?.items));
    }, [id])
    return (
        <Box minHeight="95vh">
            <Box>
                <div 
                    style={{
                        background: 
                            `linear-gradient(90deg, 
                            rgba(0,0,0,1) 0%, 
                            rgba(176,0,0,1) 0%, 
                            rgba(105,20,20,1) 18%, 
                            rgba(58,0,0,1) 40%, 
                            rgba(0,0,0,1) 100%)`,
                        zIndex: 10,
                        height:"300px"
                    }} 
                />
                <ChannelCard mt='-93px' channelDetail={channelDetail}/>
            </Box>
            <Box display="flex" p="2" sx={{alignItems:"center", justifyContent:"center"}}>
                 <Videos videos={videos}/>
            </Box>
        </Box>
    )
}

export default ChannelDetail;