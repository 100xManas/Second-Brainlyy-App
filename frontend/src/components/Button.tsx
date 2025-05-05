
interface Props {
    icon: React.ReactNode,
    title: String,
    bgColor:String,
    hover:String,
    text:String
}

function Button({ icon, title, bgColor, hover, text }: Props) {
    return (
        <button className={`flex items-center gap-2 capitalize rounded-md py-1.5 px-4 cursor-pointer shadow transition ease-in-out duration-300 ${bgColor} ${hover} ${text}`}>
            {icon}
            {title}
        </button>
    )
}

export default Button
