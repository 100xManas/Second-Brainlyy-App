import Note from "./Note"

function Hero() {
  return (
    <div className='bg-blue-50 h-[90vh] overflow-hidden overflow-y-auto p-6 flex items-center gap-6 flex-wrap'>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
    </div>
  )
}

export default Hero
