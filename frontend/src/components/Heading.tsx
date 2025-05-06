import Button from "./Button.js"
import { Share2, Plus } from 'lucide-react';

function Heading() {
  return (
    <div className="flex items-center justify-between w-full py-4 px-10">
      <h1 className="capitalize text-3xl font-semibold">all notes</h1>
      <div className="flex items-center gap-5">
        <Button icon={<Share2  size={17}/>} title={"share brain"} text={"text-blue-500"} bgColor={"bg-blue-50"} hover={"hover:bg-blue-100"}/>
        <Button icon={<Plus  size={17}/>} title={"add note"} text={"text-white"} bgColor={"bg-blue-500"} hover={"hover:bg-blue-600"}/>
      </div>
    </div>
  )
}

export default Heading
