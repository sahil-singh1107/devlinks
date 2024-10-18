"use client"
import LinkForm from '@/components/LinkForm'
import LinksScreen from '@/components/LinksScreen'
import Navbar from '@/components/Navbar'
//import axios from 'axios'
import React, { useState } from 'react'
//import {a} from "./api/create"


const page = () => {

  return (
    <div>
      <Navbar />
      <div className='flex flex-row h-screen overflow-y-hidden'>
        <div className='w-1/2'>
          <LinksScreen />
        </div>
        <div className='w-1/2'>
          <LinkForm />
        </div>
      </div>

    </div>
  )
}

export default page