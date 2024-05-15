"use client";

import React from 'react'

const Footer = () => {
    let date = new Date()
    const year = date.getFullYear()
    return (
        <footer>
            Copyright@{year} Shubham Housing Finance. All Rights Reserved.
        </footer>
    )
}

export default Footer