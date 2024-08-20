// import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function AddMemberTeam() {
  const navigate = useNavigate();

 

  return (
    <div className="w-[95%] mt-[30px] mx-auto min-h-[80vh]   bg-white">
      <div className="w-[90%] mt-[50px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Team Member
            </h2>
            {/* Error Display */}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]">
                  Add member to Team
                </label>
                <div className="mt-2">
                  <select
                    // onChange={(e)=>setMember(e.target.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                  >
                    <option>Choose Member</option>
                    <option>Mekdelawit Haile</option>
                    {/* {filteredMembers?.map((dire)=>{
                    return <option key={dire?._id} value={dire?._id}>{dire?.firstname} {dire?.middlename} {dire?.lastname}</option>
                })} */}
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
          <button
            // onClick={addMemeberDirectorate}
            type="submit"
            className="rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemberTeam;
