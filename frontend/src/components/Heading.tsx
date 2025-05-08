import Button from "./Button.js"
import { Share2, Plus } from 'lucide-react';

function Heading() {
  return (
    <div className="flex items-center justify-between w-full py-4 px-10">
      <h1 className="capitalize text-3xl font-semibold">all notes</h1>
      <div className="flex items-center gap-5">
        <Button icon={<Share2 size={17} />} title={"share brain"} text={"text-blue-500"} bgColor={"bg-blue-50"} hover={"hover:bg-blue-100"} />
        <Button icon={<Plus size={17} />} title={"add note"} text={"text-white"} bgColor={"bg-blue-500"} hover={"hover:bg-blue-600"} />
      </div>


      <div className="absolute z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-[90vw] max-w-2xl rounded-xl shadow-lg p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Note</h1>

          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Type</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="tweet">Tweet</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="docs">Docs</option>
                <option value="link">Link</option>
                <option value="article">Article</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Content</label>
              <textarea
                rows={3}
                className="border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Tags</label>
              <select
                
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="important">Important</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                className="w-72 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Heading
