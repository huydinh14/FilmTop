import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from "react-router-dom"

export default function MainLayout() {
    return (
        <>
            {/* global loading */}
            {/* global loading */}

            {/* login modal */}
            {/* login modal */}
            <Box display="flex" minHeight="100vh">
                {/* header */}
                {/* header */}

                {/* main */}
                <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh ">
                    <Outlet />
                </Box>
                {/* main */}
            </Box>

            {/* footer */}

            {/* footer */}
        </>
    )
}