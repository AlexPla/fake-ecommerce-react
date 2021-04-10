import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconConstruction } from '../UI/Icon/IconConstruction';
import styles from './UnderConstruction.module.css';

export const UnderConstruction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <IconConstruction className={styles.icon} />
      <p className={`${styles.text} ${true ? styles.error : ''}`}>{t('underConstruction')}</p>
    </div>
  );
}
