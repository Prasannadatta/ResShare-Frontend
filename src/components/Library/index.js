import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OutlinedCard from '../Card';
import NoFilesFound from '../NoFilesFound';
import Grid from '@mui/material/Grid2';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Library = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllFiles = async () => {
    try {
      console.log('hiii');
      const response = await axios.get('http://localhost:5000/all_files');   
      if (response.data && response.data.data.length > 0) {
        setFiles(response.data.data);
      }
      setLoading(false);   
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch files:", err);
    }
  };

  const handleDelete = (cid) => {
    setFiles(files.filter(file => file.CID != cid))
  }

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <>
      <Grid container spacing={8}>
        {console.log(files, '0000000000000000')}
        {
          loading ?
          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer - 1 })}
            open={loading}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          :
          files && files.length > 0 ?
            files.map((file) => 
              <OutlinedCard fileInfo={file} onDelete={handleDelete}/>
            )
          :
          <NoFilesFound />
        }
      </Grid>
    </>
  );
}

export default Library;
