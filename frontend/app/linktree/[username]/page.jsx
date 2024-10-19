"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const url = "http://localhost:5000/api/v1/linkTree/getLinkTree"

const Page = ({ params }) => {
  const username = params.username
  const [links, setLinks] = useState([])
  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(url, { username });
        //console.log(res.data[1]);
        setImgUrl(res.data[1])
        setLinks(res.data[0])  // Accessing the actual data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);  // Add username as a dependency

  console.log(imgUrl)

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* Profile Section */}
      <div className="mt-10 flex flex-col items-center space-y-3">
        <img
          src={imgUrl || "https://freesvg.org/img/abstract-user-flat-4.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-[#512275]"
        />
        <p className="text-3xl font-bold text-[#512275]">{username}</p>
      </div>

      {/* Links Section */}
      <div className="mt-8 w-full max-w-md p-4 space-y-4">
        {
          links.length > 0 ? (
            links.map((ele, i) => (
              <div key={i} className="bg-[#f7f3ff] border border-[#ddd6f3] rounded-lg p-3 hover:shadow-md transition-all">
                <Link href={ele.link} target="_blank" className="text-[#512275] font-semibold flex justify-center">
                  <p>{ele.platform}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No links available</p>
          )
        }
      </div>
    </div>
  )
}

export default Page
