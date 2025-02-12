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
       <Image
        src={data.hdurl}
        alt={data.title}
        fill={true}
      />
  )
}

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center p-7 rounded-2xl">  
      <div className='m-10'>    
        <ApodImage></ApodImage>
      </div>  
      <div className="flex">    
        <span className="text-2" >Class Warfare</span>
        <span>The Anti-Patterns</span> 
        <span className="flex">
          <span>No. 4</span>      
          <span>·</span>      
          <span>2025</span>    
        </span>  
      </div>
    </div>
    </>
  );
}
