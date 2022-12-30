import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from "react-router-dom"
import AuthModal from '../common/AuthModal'
import Footer from '../common/Footer'
import GlobalLoading from '../common/GlobalLoading'
import Topbar from '../common/Topbar'

export default function MainLayout() {
    return (
        <>
            {/* global-loading */}
            <GlobalLoading />
            {/* global-loading */}

            {/* login modal */}
            <AuthModal />
            {/* login modal */}
            <Box display="flex" minHeight="100vh">
                {/* header */}
                <Topbar />
                {/* header */}

                {/* main */}
                <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh ">
                    <Outlet />
                </Box>
                {/* main */}
            </Box>

            {/* footer */}
            <Footer />
            {/* footer */}
        </>
    )
}
