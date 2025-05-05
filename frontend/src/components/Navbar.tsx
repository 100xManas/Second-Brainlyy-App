import { Twitter, Youtube, FileText, Link2 } from 'lucide-react';
import Logo from "../assets/Logo.png"

function Sidebar() {

    const items = [
        {
            icon: <Twitter size={20} />,
            content: "tweets"
        },
        {
            icon: <Youtube size={20} />,
            content: "videos"
        },
        {
            icon: <FileText size={20} />,
            content: "documents"
        },
        {
            icon: <Link2 size={20} />,
            content: "links"
        },

    ]

    return (
        <div className="h-full w-full bg-red-200">
            <div className='flex items-center w-full justify-center gap-1 border-b py-2'>
                <div className='h-14 w-14'>
                    <img src={Logo} alt="Logo" className='h-full w-full drop-shadow-2xl object-cover' />
                </div>
                <h1 className='uppercase font-semibold text-xl'>Second Brain</h1>
            </div>

            <div className='w-full'>
                {
                    items.map((item, index) => (
                        <a href="#" key={index} className='flex items-center gap-3 capitalize py-3 px-6 w-full hover:bg-orange-400'>
                            {item.icon}
                            {item.content}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
