import React from 'react'

function ServerError() {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-white absolute top-0 left-0">
    <div className="min-h-[400px] flex flex-col gap-[20px]">
      <img
        src={require("../CAS/connection-lost.png")}
        className="object-cover"
        alt=""
      />
      <span className="text-[14px] text-gray-500 my-[30px] text-center">
        Connection Lost!
      </span>
      <button
        onClick={() => window.location.reload()}
        className="bg-[#0C73B8] w-[90%] mx-auto px-4 py-2 rounded-[20px] text-white text-[14px]"
      >
        Reload Page
      </button>
    </div>
  </div>
  )
}

export default ServerError