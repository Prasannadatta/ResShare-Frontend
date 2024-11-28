import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';

const CountTile2 = (props) => {
    return (
        <Card sx={{ bgcolor: props.color, height: '16vh', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)', }}>
            <CardContent>
                <Box
                    sx={{
                        color: 'white',
                        fontSize: 18, 
                        fontWeight: 600
                    }}
                >
                {props.mainTitle}
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-evenly', position: 'relative', bottom: '6px'}}>
                    <Box sx={{textAlign: 'center'}}>
                        <Box sx={{color: 'white', fontSize: 40, fontWeight: 600, position: 'relative', top: 7}}>
                        {props.count1}
                        </Box>
                        <Typography gutterBottom sx={{ color: 'white', fontSize: 18, fontWeight: 500 }}>
                        {props.title1}
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{borderColor: 'white', height: '6vh', marginTop: '22px'}}/>
                    <Box sx={{textAlign: 'center'}}>
                        <Box sx={{color: 'white', fontSize: 40, fontWeight: 600, position: 'relative', top: 7}}>
                        {props.count2}
                        </Box>
                        <Typography gutterBottom sx={{ color: 'white', fontSize: 18, fontWeight: 500 }}>
                        {props.title2}
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{borderColor: 'white', height: '6vh', marginTop: '22px'}}/>
                    <Box sx={{textAlign: 'center'}}>
                        <Box sx={{color: 'white', fontSize: 40, fontWeight: 600, position: 'relative', top: 7}}>
                        {props.count3}
                        </Box>
                        <Typography gutterBottom sx={{ color: 'white', fontSize: 18, fontWeight: 500 }}>
                        {props.title3}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CountTile2;