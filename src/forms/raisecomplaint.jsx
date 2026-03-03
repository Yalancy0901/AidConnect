import React from "react";

function RaiseComplaint() {
  return (
    <div className="w-[600px] p-10 w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-green-400 ">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">
        Raise Complaint
      </h2>

      <form className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm">Full Name :</label>
          <input className="flex-1 bg-black border border-zinc-700 text-white rounded-full px-4 py-2 outline-none" />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm">Email Id :</label>
          <input className="flex-1  bg-black border border-zinc-700 text-white rounded-full px-4 py-2 outline-none" />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm">Mobile No :</label>
          <input className="flex-1  bg-black border border-zinc-700 text-white rounded-full px-4 py-2 outline-none" />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm">Category :</label>
          <select className="flex-1  bg-black border border-zinc-700 text-white rounded-full px-4 py-2 outline-none">
            <option>Select category</option>
            <option>Public Service</option>
            <option>Electricity</option>
            <option>Water</option>
            <option>Road</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm">Location :</label>
          <input className="flex-1  bg-black border border-zinc-700 text-white rounded-full px-4 py-2 outline-none" />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 text-sm mt-2">Complaint :</label>
          <textarea className="flex-1  bg-black border border-zinc-700 text-white rounded-lg px-4 py-2 h-28 outline-none" />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm">Image :</label>
          <button
            type="button"
            className="bg-gray-200 text-black px-6 py-2 rounded-full text-sm"
          >
            Upload
          </button>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-[#1f556b] text-black px-10 py-2 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default RaiseComplaint;
