import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const postData = {
    posts: [
      {
        likes: 10,
        comments: ["Great post!", "Thanks for sharing."],
        views: 100,
        date: 1620884400000
      },
      {
        likes: 20,
        comments: ["Awesome!", "This was really helpful."],
        views: 200,
        date: 1620877200000
      }
    ]
  };
  
  fetch('/api/algorithms/social-media/popularity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.error(error))


  return (
    <>
      <Head>
        <title>Home | Trevolt</title>
        <meta name="description" content="Trevolt on YouTube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>This page is not available yet.</h1>
      </div>
    </>
  )
}