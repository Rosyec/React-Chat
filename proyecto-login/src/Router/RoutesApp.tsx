import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { Home } from '../components/home/Home';
import { Login } from '../components/login/Login';

export const RoutesApp = createBrowserRouter([
    {
        path: '/app',
        element: <App/>,
        children: [
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: '*',
                element: <Navigate to="home"/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '*',
        element: <Navigate to="/login" />
    }
]);
