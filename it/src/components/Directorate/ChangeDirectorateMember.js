// import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ChangeDirectorateMember() {
  //   ("directorate ID: ",directorateID)
  const navigate = useNavigate();

  // if(serverError){
  //     return <div className='w-[100%]'>
  //         <span>Something went wrong. Please try again in a moment</span>
  //     </div>
  // }
  return (
    <div className="w-[100%] min-h-[90vh]   bg-white">
      <div className="w-[90%] mt-[50px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Change Directorate Member
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold"
                >
                  New Directorate <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    // onChange={(e)=>setDirectorate(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                  >
                    <option>Select Directorate</option>
                    <option>directorate</option>
                  </select>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className="my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button className="rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeDirectorateMember;
