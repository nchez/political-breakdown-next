import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { loadStock, loadStocks } from '../lib/loadStocks'

export default function Home({ prices }) {
  return (
    <div className={styles.container}>
      <h1>Hi</h1>
      <p>{prices.length}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await loadStocks()
  return {
    props: {
      prices: response,
    },
  }
}
