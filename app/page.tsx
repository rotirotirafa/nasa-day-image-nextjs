'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ApodNasaResponseObject from './types/apod'

const URL_API_NASA = process.env.URL_API_NASA 
const APOD_NASA_KEY = process.env.APOD_NASA_KEY
const fetchNASAUrl = `${URL_API_NASA}?api_key=${APOD_NASA_KEY}`

function ApodImage() {
  const [data, setData] = useState<ApodNasaResponseObject | null>(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(fetchNASAUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ApodNasaResponseObject = await response.json();
        setData(result);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>
  return (
    <>
      <h1>{data.title}</h1>  
        <Image
          src={data.hdurl}
          alt={data.title}
          width={1000}
          height={1000}
        />
    </>
  )
}

export default function Home() {
  return (
    <>
        <ApodImage></ApodImage>
    </>
  );
}
