import React from 'react';
import styles from './index.module.css';
import Image from 'next/image'

const BuildPage: React.FC = () => {
  return (
    <div className={styles.build}>
      <Image
        width={215}
        height={215}
        src="/images/build.png"
        alt="" />
      <div className={styles.buildTitle}>
        {'The Page is Under Development, Stay Tuned!'}
      </div>
    </div>
  );
};

export default BuildPage;
