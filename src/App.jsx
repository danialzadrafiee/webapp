import React, { useState, useEffect, useRef } from "react"

function NoteRow({ type = "text", setText, text, autoFocus, onShiftEnter }) {
  const myRef = useRef()

  useEffect(() => {
    myRef.current.style.height = "0px"
    myRef.current.style.height = myRef.current.scrollHeight + "px"
    if (autoFocus) {
      myRef.current.focus()
    }
  }, [text, autoFocus])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault()
      onShiftEnter()
    }
  }

  return (
    <div className={`${type !== "text" && "gap-1"} flex items-start justify-start w-full`} onClick={(e) => e.stopPropagation()}>
      <div className={`${type !== "text" && "h-6 w-6"}`}>
        {type === "box" && <div className="h-6 w-6 border border-black"></div>}
        {type === "list" && (
          <div className="h-6 w-6 flex items-center justify-center border border-transparent">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
        )}
      </div>
      <textarea ref={myRef} value={text} autoFocus={autoFocus} className="w-full bg-gray-200 border-none !focus:outline-none p-0 m-0 !focus:right-0" onChange={handleChange} onKeyDown={handleKeyDown} style={{ height: "100%" }} />
    </div>
  )
}
function App() {
  const [menu, setMenu] = useState(false)
  const [title, setTitle] = useState("Section")
  const [notes, setNotes] = useState([{ type: "text", text: "" }])
  const addNote = (type) => {
    if (notes.length != 0) {
      if (notes[notes.length - 1].text === "") {
        console.log("here")
        let newNotes = [...notes]
        newNotes[newNotes.length - 1].type = type
        setNotes(newNotes)
      } else {
        console.log("here2")
        setNotes([...notes, { type: type, text: "" }])
      }
    } else {
      setNotes([{ type: type, text: "" }])
    }
  }
  const setText = (index, text) => {
    const newNotes = [...notes]
    newNotes[index].text = text
    if (text === "") {
      newNotes.splice(index, 1)
    }
    setNotes(newNotes)
  }
  const handleShiftEnter = (index) => {
    addNote(notes[index].type, index, true)
  }
  const focusLastNoteRow = () => {
    const lastNote = document.getElementsByTagName("textarea")
    lastNote[lastNote.length - 1].focus()
  }

  return (
    <main className="relative overflow-auto h-screen bg-white">
      <header className="sticky top-0 left-0">
        <div className="h-10 bg-gray-400 flex justify-between  px-5">
          <div id="menu">
            <div id="menu__icon" className="w-10 bg-gray-100 h-10 flex items-center justify-center">
              <i className="fi fi-rr-apps h-4 w-4"></i>
            </div>
          </div>
        </div>
      </header>
      <main className="px-5 h-[calc(100%-80px)]">
        <header>
          <div id="title" className="text-[17px]  h-10 flex items-center justify-center   w-full">
            <input type="text" maxLength={30} defaultValue={title} className="h-10  border-none  focus:ring-0 font-semibold w-full" />
          </div>
          <div id="divider" className="w-full h-[1px] bg-black/5"></div>
        </header>
        <main className=" bg-red-200 overflow-auto pb-20 h-[calc(100%-60px)]" onClick={notes.some((note) => note.text.trim() === "") ? focusLastNoteRow : () => addNote("text", notes.length - 1)}>
          <div className="grid gap-1">
            {notes.map((note, index) => (
              <NoteRow key={index} type={note.type} text={note.text} setText={(text) => setText(index, text)} autoFocus={index === notes.length - 1} onShiftEnter={() => handleShiftEnter(index)} />
            ))}
          </div>
        </main>
      </main>
      <footer className="fixed mt-auto bottom-0 w-full left-0 h-10 bg-gray-200 flex items-center  px-5 gap-5">
        <div className="w-10 h-10 flex items-center justify-center" onClick={() => addNote("text", notes.length - 1)}>
          <i className="fi fi-rr-text"></i>
        </div>
        <div className="w-10 h-10 flex items-center justify-center" onClick={() => addNote("list", notes.length - 1)}>
          <i className="fi fi-br-list"></i>
        </div>
        <div className="w-10 h-10 flex items-center justify-center" onClick={() => addNote("box", notes.length - 1)}>
          <i className="fi fi-rr-square-small"></i>
        </div>
      </footer>
    </main>
  )
}

export default App
