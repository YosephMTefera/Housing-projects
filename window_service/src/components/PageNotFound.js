import React from 'react'

function PageNotFound() {
  return (
    <main className="w-[90%] my-[100px] mx-auto grid min-h-full place-items-center bg-gray-100 px-6 py-24 sm:py-32 lg:px-8 rounded-[20px] shadow-md">
    <div className="text-center">
      <p className="text-base font-semibold text-[#0C73B8]">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/"
          className="rounded-md bg-[#0C73B8] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Go back
        </a>
      </div>
    </div>
  </main>
  )
}

export default PageNotFound