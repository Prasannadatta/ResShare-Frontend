import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

// const os = require('os');
// const path = require('path');

// const getDownloadsPath = () => {
//   return path.join(os.homedir(), 'Downloads');
// }

const OutlinedCard = (props) => {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");


  const truncateText = (text, limit) => (text.length > limit ? `${text.slice(0, limit)}...` : text);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const downloadFile = async () => {
    try {
      // console.log(process.env, 'ppppppppppppppppp')
      // const downloadPath = `${process.env.HOME}/Downloads`;
      // const defaultDownloadDir = 
      const response = await axios.post('http://localhost:5000/download', {cid: `${props.fileInfo.CID}`, filename: `${props.fileInfo.fileName}`});
      setMessage("File Downloaded Successfully");  
      setOpen(true);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };

  const deleteFile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/delete', {cid: `${props.fileInfo.CID}`});
      const delete_status = response.data.status;
      setMessage(delete_status);  
      setOpen(true);
      if (delete_status == "File deleted successfully") {
        props.onDelete(props.fileInfo.CID);
      }      
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
};

const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ maxWidth: 400, padding: '8px' }}>
      <CardContent>
        {/* File Name */}
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
          Name:
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: 1 }}>
            {truncateText(props.fileInfo.fileName, 22)}
          </Typography>
        </Typography>

        {/* File Size */}
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
          Size:
          <Typography variant="body1" component="div" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
            {formatBytes(props.fileInfo.fileSize)}
          </Typography>
        </Typography>

        {/* Uploaded By */}
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
          Uploaded By:
          <Typography variant="body1" component="div" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
            {truncateText(props.fileInfo.peerID, 22)}
          </Typography>
        </Typography>

        {/* CID */}
        <Typography sx={{ color: 'text.secondary', fontSize: 14 }} gutterBottom>
          CID:
          <Typography variant="body1" component="div" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
            {truncateText(props.fileInfo.CID, 22)}
          </Typography>
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '4px 8px' }}>
        <Tooltip title="Delete" arrow>
          <IconButton color="primary" aria-label="Delete"  onClick={deleteFile}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download" arrow>
          <IconButton color="primary" aria-label="Download"  onClick={downloadFile}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={4000} onClose={handleClose} message={message} action={action}/>  
    </Box>
  );
}

export default OutlinedCard;
