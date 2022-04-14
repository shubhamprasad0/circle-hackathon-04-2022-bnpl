import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/product/tv");
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>E Commerce by Creators Hub</title>
        <meta name="description" content="Created by Creators Hub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
