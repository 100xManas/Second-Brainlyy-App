import Heading from "./components/Heading"
import Hero from "./components/Hero"
import Sidebar from "./components/Navbar"

function App() {

  return (
    <>
      <div className="flex items-start">
        <div className="h-screen w-[20vw]">
          <Sidebar />
        </div>
        <main className="h-screen w-[80vw]">
          <Heading />
          <Hero />
        </main>
      </div>
    </>
  )
}

export default App
