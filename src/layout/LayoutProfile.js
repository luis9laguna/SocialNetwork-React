import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutProfile = () => {
    return (
        <div>
            LayoutProfile
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutProfile