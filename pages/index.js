import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { loadStock, loadStocks } from '../lib/loadStocks'

export default function Home() {
  useEffect(async () => {
    const response = await loadStocks()
    console.log(response)
  }, [])
  return <div className={styles.container}></div>
}
