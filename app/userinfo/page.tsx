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
            <div className={styles.body}>
                <div className={styles.leftBar}>
                    <div className={styles.leftBarItem}>
                        <Image
                            width={20}
                            height={20}
                            src="/fonts/basic-blue.svg"
                            alt="" />
                        {"Basic Information"}</div>
                    <div className={styles.leftBarItem}>
                        <Image
                            width={20}
                            height={20}
                            src="/fonts/key-black.svg"
                            alt="" />
                        {"Exchange Private Key"}</div>

                </div>

                <div className={styles.contnet}>

                </div>
            </div>

        </div>
    );
};

export default Register;
