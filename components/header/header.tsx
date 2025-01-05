

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Image from 'next/image'
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("")
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUserName(username)
        }
    }, [])
    return (
        <div className={styles.header}>
            <Image
                width={123}
                onClick={() => {
                    router.push('/app?token=BTC')
                }}
                height={30}
                src="/images/logo.png"
                alt="" />
            <div
                onClick={() => {
                    router.push(userName ? '/userinfo' : '/login')
                }}
                className={styles.loginButton}>
                {userName ? userName : "Log In"}
            </div>
        </div>
    );
};

export default Header;
