import React from 'react';
import { Stack, Box } from '@mui/material'
import {VideoCard, ChannelCard} from './index.js';
const Videos = ({videos, direction}) => {
    return (
        <Stack direction={direction || 'row'} flexWrap="wrap" justifyContent="center"  gap={2}>
            {videos.map((item, idx) =>{ 
                console.log(item)
                return (
               <Box key={idx}>
                   {item.id.videoId && <VideoCard video={item} />}
                   {item.id.channelId && <ChannelCard channelDetail={item} />}
               </Box>
            )})}
        </Stack>
    )
}

export default Videos
