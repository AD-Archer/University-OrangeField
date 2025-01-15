import React from 'react';
import Image from 'next/image';
import styles from '@/styles/pageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/Logo.svg"
              alt="Orange Field University Logo"
              width={80}
              height={80}
              className={styles.logo}
              priority
            />
            <h1 className={styles.title}>{title}</h1>
            {subtitle && (
              <p className={styles.subtitle}>{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 