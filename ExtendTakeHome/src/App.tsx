import React from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppRoutes } from './models/appRoutes';
import { extendApiConfig } from './services/config';
import { VirtualCards } from './views/VirtualCards';
import Login from './views/Login';

function App() {
    const navigate = useNavigate();

    axios.defaults.headers.common["Accept"] = extendApiConfig.acceptVersion;
    axios.interceptors.response.use(r => {
        return r;
    }, err => {
        if (err.response && err.response.status === 401) {
            navigate(AppRoutes.login);
        }
        return Promise.reject(err);
    });

    return (
        <Box margin={5}>
            <Typography variant="h3" component="h1">Extend Take Home</Typography>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path={AppRoutes.login} element={<Login />} />
                <Route path={AppRoutes.virtualCard} element={<VirtualCards />} />
            </Routes>
        </Box>
    );
}

export default App;
