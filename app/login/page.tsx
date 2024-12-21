"use client"

import React, { useState } from 'react';
import styles from './index.module.css';
import Header from '@/components/header/header';
import { useRouter } from "next/navigation";
import { Snackbar, Alert, Button } from '@mui/material';

import Image from 'next/image'
import { registerReq } from '@/api/login';
const Register = () => {
    const router = useRouter();
    const [tip, setTip] = useState({
        content: '',
        type: 'success'
    })
    const [active, setActive] = useState(0)
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');

    const regitsterFun = () => {
        
        if (!email) {
            setTip({
                content: 'no E-Mail',
                type: 'error'
            })
            setOpen(true);
            return
        }
        if (!verificationCode) {
            setTip({
                content: 'no verification code',
                type: 'error'
            })
            setOpen(true);
            return
        }
        // 处理注册提交逻辑
        if (!password) {
            setTip({
                content: 'no password',
                type: 'error'
            })
            setOpen(true);
            return
        }
        // 处理注册提交逻辑
        if (password !== confirmPassword) {
            setTip({
                content: 'confirm password does not match',
                type: 'error'
            })
            setOpen(true);
            return
        }
        registerReq({
            username: email,
            password: password,
            invitedCode: invitationCode,
            emailCode: verificationCode,
        }).then(res => {
            console.log(res.data.message)
            if(res.data.message == "success"){
                setTip({
                    content: 'register success',
                    type: 'success'
                })
                setOpen(true);
                localStorage.setItem('token',res.data.data.token);
                localStorage.setItem('username',res.data.data.username);
                router.back()
            } else{
                setTip({
                    content: res.data.message,
                    type: "error"
                })
                setOpen(true);
            }
        })
        console.log({ email, verificationCode, password, confirmPassword, invitationCode });
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div >
            <Header />
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.regitsterHeader}>
                        <div
                            onClick={() => {
                                setActive(0)
                            }}
                            className={`${styles.tabTitle} ${active == 0 ? styles.active : ''}`} >
                            {'Register'}
                        </div>
                        <div
                            onClick={() => {
                                setActive(1)
                            }}
                            className={`${styles.tabTitle} ${active == 1 ? styles.active : ''}`} >
                            {'Login In'}

                        </div>
                        <div
                            onClick={() => {
                                router.back()
                            }}
                            className={styles.close}>
                            <Image
                                width={32}
                                height={32}
                                src="/fonts/close.svg"
                                alt="" />
                        </div>
                    </div>
                    <div className={styles.regitsterBody}>
                        {active == 0 ? <div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {'E-Mail'}
                                </div>
                                <div className={styles.inputBorder}>
                                    <input
                                        value={email}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setEmail(event.target.value);
                                        }}
                                        className={styles.input}></input>
                                    <div className={styles.send}>{"Send"}</div>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {'Verification Code'}
                                </div>
                                <div className={styles.inputBorder}>
                                    <input
                                        value={verificationCode}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setVerificationCode(event.target.value);
                                        }}
                                        className={styles.input}></input>

                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {'Password'}
                                </div>
                                <div className={styles.inputBorder}>
                                    <input
                                        value={password}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setPassword(event.target.value);
                                        }}
                                        className={styles.input}></input>

                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {'Confirm Password'}
                                </div>
                                <div className={styles.inputBorder}>
                                    <input
                                        value={confirmPassword}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setConfirmPassword(event.target.value);
                                        }}
                                        className={styles.input}></input>

                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.itemTitle}>
                                    {'Invitation Code'}
                                </div>
                                <div className={styles.inputBorder}>
                                    <input
                                        value={invitationCode}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setInvitationCode(event.target.value);
                                        }}
                                        className={styles.input}></input>

                                </div>
                                <div className={styles.confirm} onClick={regitsterFun}>
                                    {"Confirm"}
                                </div>
                            </div>
                        </div> :
                            <div>
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>
                                        {'E-Mail'}
                                    </div>
                                    <div className={styles.inputBorder}>
                                        <input className={styles.input}></input>

                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.itemTitle}>
                                        {'Password'}
                                    </div>
                                    <div className={styles.inputBorder}>
                                        <input className={styles.input}></input>
                                    </div>
                                    <div className={styles.confirm}>
                                        {"Login In"}
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000} // 自动隐藏时间（ms）
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // 弹出位置
            >
                {/* Alert 组件增强消息样式 */}
                <Alert onClose={handleClose} severity={tip.type} sx={{ width: '100%' }}>
                    {tip.content}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Register;
