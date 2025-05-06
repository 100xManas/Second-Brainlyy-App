import { Share2, Trash2, FileText } from 'lucide-react';

function Note() {
    return (
        <div className="bg-white border border-blue-100 shadow h-72 w-64 rounded-md p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <FileText size={19} />
                    <h2 className="font-semibold text-xl">Project Idea</h2>
                </div>
                <div className='flex items-center gap-3'>
                    <Share2 size={18} />
                    <Trash2 size={18} />
                </div>
            </div>
            <p className='py-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, possimus!</p>
            <div className='pb-3'>
                <span className='text-blue-500 bg-blue-50 py-0.5 px-2 rounded-2xl mr-2'>#learning</span>
                <span className='text-blue-500 bg-blue-50 py-0.5 px-2 rounded-2xl'>#ideas</span>
            </div>
            <div>Added in {new Date().toLocaleDateString('en-GB')}</div>
        </div>
    )
}

export default Note
