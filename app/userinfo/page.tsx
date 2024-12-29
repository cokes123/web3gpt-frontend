"use client"

import React, { useState } from 'react';
import styles from './index.module.css';
import Header from '@/components/header/header';
import { useRouter } from "next/navigation";
import { Snackbar, Alert, Button } from '@mui/material';

import Image from 'next/image'
import { registerReq } from '@/api/login';
const Register = () => {

    return (
        <div >
            <Header />
            
        </div>
    );
};

export default Register;
