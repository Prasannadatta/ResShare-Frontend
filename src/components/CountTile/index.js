import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const CountTile = (props) => {
    return (
        <Card sx={{ bgcolor: props.color, height: '16vh', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
            <CardContent>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)',
                    }}
                >
                {props.icon}
                </Box>
                <Box sx={{textAlign: 'center', position: 'relative', bottom: 18}}>
                    <Box sx={{color: 'white', fontSize: 40, fontWeight: 600, position: 'relative', top: 7}}>
                    {props.count}
                    </Box>
                    <Typography gutterBottom sx={{ color: 'white', fontSize: 18, fontWeight: 500 }}>
                    {props.title}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CountTile;