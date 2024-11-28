import React, { useMemo, useState } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import FileUploadBox from './../UploadBox';
// import OutlinedCard from './../Card';
import Library from './../Library';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import UploadPage from '../UploadPage';
import Dashboard from '../Dashboard';
// import axios from 'axios';
// import useDemoRouter from './../DefaultRouter';

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const DashboardLayoutBasic = (props) => {
  const { window } = props;
  const router = useDemoRouter('/dashboard');

  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Menu',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'library',
      title: 'Library',
      icon: <LibraryBooksIcon />,
    },
    {
      segment: 'upload',
      title: 'Upload',
      icon: <CloudUploadIcon />,
    },
    {
      segment: 'users',
      title: 'Users',
      icon: <CloudUploadIcon />,
    },
  ];
  
  const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

   const renderContent = (pathname) => {
    
    if (pathname === '/upload') {
      return (
        <UploadPage/>
      );
    }
    else if (pathname === '/library') {
      return (
        <Library/>
      );
    }
    else if (pathname === '/dashboard') {
      return (
        <Dashboard/>
      );
    }
    else {
      return <Box>hiughuh</Box>;
    }
  }
  
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: 'ResShare',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          {renderContent(router.pathname)}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;