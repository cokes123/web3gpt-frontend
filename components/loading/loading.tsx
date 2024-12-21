import React from 'react';
import styles from './index.module.css';
import Image from 'next/image'

const Loading: React.FC = () => {
    return (
        <div className={styles.loading}>
            <Image
                width={50}
                height={50}
                className={styles.loadingImage}
                src="/images/loading.svg"
                alt="" />
            <div className={styles.loadingTitle}>
                {'Loading...'}
            </div>
            <div className={styles.loadingContent}>
                {"It's Being Analyzed. Please be Patient."}
            </div>
        </div>
    );
};

export default Loading;
