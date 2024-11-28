import React, { useEffect, useState } from 'react';
import CountTile  from '../CountTile';
import CountTile2  from '../CountTile2';
import { Grid2, Box, Card, CardContent, Typography } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = () => {

    useEffect(() => {
        const filesData = [
          { file: 'file1.pdf', timestamp: '2023-01-15' },
          { file: 'file2.pdf', timestamp: '2023-01-20' },
          { file: 'file3.pdf', timestamp: '2023-02-05' },
          { file: 'file4.jpg', timestamp: '2023-02-15' },
          { file: 'file5.docx', timestamp: '2023-03-01' },
          { file: 'file6.pdf', timestamp: '2023-03-15' },
          { file: 'file7.mp4', timestamp: '2023-03-20' },
          { file: 'file8.jpg', timestamp: '2023-04-10' },
          { file: 'file9.pdf', timestamp: '2023-04-26' },
          { file: 'file10.docx', timestamp: '2023-05-05' },
        ];
      
        // Group by month-year
        const groupedData = filesData.reduce((acc, { timestamp }) => {
          const monthYear = new Date(timestamp).toLocaleString('en-US', { month: 'short', year: 'numeric' });
          acc[monthYear] = (acc[monthYear] || 0) + 1;
          return acc;
        }, {});
      
        // Prepare the chart data
        const labels = Object.keys(groupedData);
        const fileCounts = Object.values(groupedData);
      
        // Highcharts options
        const columnChartOptions = {
            chart: {
              type: 'column',
              height: 350,
              backgroundColor: 'transparent', // Transparent background
            },
            title: {
              text: null, // Remove the title
            },
            xAxis: {
              categories: labels,
              title: {
                text: null,
                style: {
                  fontSize: '12px',
                  color: '#666', // Neutral gray text for x-axis title
                },
              },
              labels: {
                style: {
                  color: '#666', // Neutral gray text for x-axis labels
                  fontSize: '12px',
                },
              },
              gridLineWidth: 0, // Remove gridlines
              lineColor: '#eee', // X-axis line color
            },
            yAxis: {
              title: {
                text: 'Files Uploaded',
                style: {
                  fontSize: '12px',
                  color: '#666', // Neutral gray text for y-axis title
                },
              },
              labels: {
                style: {
                  color: '#666', // Neutral gray text for y-axis labels
                  fontSize: '12px',
                },
              },
              gridLineWidth: 0, // Remove gridlines
              lineColor: '#eee', // Add a visible line for y-axis
            },
            series: [{
              name: "Files Uploaded",
              data: fileCounts,
              color: 'rgb(95,158,160)', // Uniform blue color for columns
            }],
            legend: {
              enabled: false, // Hide the legend
            },
            tooltip: {
              valueSuffix: ' files',
            },
            credits: {
              enabled: false, // Hide Highcharts watermark
            },
            plotOptions: {
              column: {
                dataLabels: {
                  enabled: false, // Data labels disabled as per request
                },
              },
            },
          };
          
          
      
        // Render Highcharts
        Highcharts.chart('fileUploadChart', columnChartOptions);

        const userData = [
            { user: 'User1', filesUploaded: 30 },
            { user: 'User2', filesUploaded: 45 },
            { user: 'User3', filesUploaded: 20 },
            { user: 'User4', filesUploaded: 55 },
            { user: 'User5', filesUploaded: 25 },
          ];
        
          const donutChartData = userData.map(({ user, filesUploaded }) => ({
            name: user,
            y: filesUploaded,
          }));
        
          const donutChartOptions = {
            chart: {
              type: 'pie',
              height: 350,
              backgroundColor: 'transparent',
            },
            title: {
              text: null, // No title
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
              pie: {
                innerSize: '50%', // Donut chart
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '{point.name}: {point.y}', // Show user and file count
                },
                colors: ['#1E90FF', '#4682B4', '#5F9EA0', '#87CEFA', '#B0E0E6'], // Shades of blue
              },
            },
            series: [{
              name: 'Files',
              colorByPoint: true,
              data: donutChartData,
            }],
            credits: {
              enabled: false, // Hide Highcharts watermark
            },
          };
        
          // Render Highcharts
          Highcharts.chart('fileUploadDonutChart', donutChartOptions);

      }, []);
      
      

    return (
      <Box sx={{marginTop: '16px'}}>
        <Grid2 container spacing={4}>
            <Grid2 item size={3}>
                <CountTile title={'Peers'} count={20} color={'skyblue'} icon={<PeopleIcon sx={{ fontSize: 22, color: 'skyblue' }} />}/>
            </Grid2>
            <Grid2 item size={3}>
                <CountTile title={'Files'} count={40} color={'lightblue'} icon={<LibraryBooksIcon sx={{ fontSize: 22, color: 'skyblue' }}/>}/>
            </Grid2>
            <Grid2 item size={6}>
                <CountTile2 title1={'Videos'} count1={22} title2={'Images'} count2={33} title3={'Others'} count3={49} color={'rgb(70,130,180)'} mainTitle={'Files:'}/>
            </Grid2>
        </Grid2>
        <Grid2 container spacing={4} sx={{marginTop: '32px'}}>
            <Grid2 item size={6}>
                <Card sx={{border: '2px solid #eee', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)'}}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, padding: '20px'}}>Files Uploaded Over Time:</Typography>
                    <CardContent>
                        <Box id = 'fileUploadChart' />
                    </CardContent>   
                </Card>
            </Grid2>
            <Grid2 item size={6}>
                <Card sx={{border: '2px solid #eee', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)'}}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, padding: '20px'}}>Distribution of Files Uploaded by Users:</Typography>
                    <CardContent>
                        <Box id = 'fileUploadDonutChart' />
                    </CardContent>   
                </Card>
            </Grid2>
        </Grid2>
      </Box>
    )
}

export default Dashboard;


