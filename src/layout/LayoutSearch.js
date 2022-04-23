import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutSearch = () => {
    return (
        <div>
            LayoutSearch
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutSearch