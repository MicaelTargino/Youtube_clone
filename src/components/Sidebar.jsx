import React from 'react';
import { Stack } from '@mui/material';

import { categories } from '../utils/constants';


const Sidebar = (props) => {
    const selectedCategory = props.selectedCategory;

    const handleChangeSelectedCategory = (cat) => {
        props.onChangeSelectedCategory(cat);
    }
    return (
        <Stack direction="row" sx={{overflowY: 'auto', height: {sx: 'auto', md: '95%'}, flexDirection: {md: 'column'}}}>
            {categories.map((cat) => (
                <button onClick={() => handleChangeSelectedCategory(cat.name)} key={cat.name} className="category-btn" style={{backgroundColor: cat.name === selectedCategory && '#fc1503', color: '#fff' }}>
                    <span style={{color: cat.name === selectedCategory ? 'white' : 'red', marginRight: '10px'}}>{cat.icon}</span>
                    <span style={{opacity: cat.name === selectedCategory ? '1' : '0.8'}}>{cat.name}</span>
                </button>
            ))}
        </Stack>
    )
}

export default Sidebar
