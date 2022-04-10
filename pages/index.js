import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>E Commerce by Creators Hub</title>
        <meta name="description" content="Created by Creators Hub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-6xl font-bold underline'>Hello world!</h1>
    </div>
  )
}
