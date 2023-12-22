import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
export default function PrivateRoute() {

    const { currentUser } = useSelector((state)=> state.user);


    //Outlet used to render the child route of the current route
    return currentUser ?<Outlet /> : <Navigate to='/sign-in' />;
}
