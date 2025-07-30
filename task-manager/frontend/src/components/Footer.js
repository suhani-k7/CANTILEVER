import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-cyan-600 text-white py-4 font-semibold text-center">
            <p className="text-lg"> {new Date().getFullYear()} ... </p>
            <p className="text-sm"> MyTaskPro </p>
        </footer>
    )
}

export default Footer