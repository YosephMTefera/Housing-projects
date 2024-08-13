import React from 'react'
import {ToastContainer}from 'react-toastify'


function UserProfile() {
 
 



  return (
    <div className="bg-gray-100 min-h-screen p-8">
   <ToastContainer theme='light'/>
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center mb-8">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={'http://localhost:5000/'}
          alt="User Profile"
        />
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-600">Admin</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-gray-700">First Name</label>
            <input
              className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-4"
              type="text"
              value="John"
              readOnly
            />
          </div>
          <div className="w-full sm:w-1/2 sm:ml-4">
            <label className="block mb-2 text-gray-700">Last Name</label>
            <input
              className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-4"
              type="text"
              value="Doe"
              readOnly
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-4"
            type="email"
            value="john.doe@example.com"
            readOnly
          />
        </div>
      </div>
    
    </div>
  </div>
  )
}

export default UserProfile