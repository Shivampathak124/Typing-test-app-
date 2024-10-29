import React, { useState, useEffect, useRef } from "react";
import "./app.css"


const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Hello world, welcome to the typing test.",
  "Practice typing to improve speed and accuracy.",
  "React is a JavaScript library for building user interfaces.",
];

function App() {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [displayWpm, setDisplayWpm] = useState(null); 
  const [displayMessage, setDisplayMessage] = useState(""); 

  const startTimeRef = useRef(null);
  const wpmRef = useRef(null);
  const messageRef = useRef("");

  const generateSentence = () => {
    const randomSentence =
      sentences[Math.floor(Math.random() * sentences.length)];
    setSentence(randomSentence);
    setInput("");
    setDisplayWpm(null);
    setDisplayMessage("");
    startTimeRef.current = null;
    wpmRef.current = null;
    messageRef.current = "";
  };

  
  useEffect(() => {
    generateSentence();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);

    
    if (!startTimeRef.current) {
      startTimeRef.current = new Date();
    }

    if (value === sentence) {
      const endTime = new Date();
      const timeTaken = (endTime - startTimeRef.current) / 60000; // Convert to minutes
      const words = sentence.split(" ").length;
      const calculatedWpm = Math.round(words / timeTaken);

     
      wpmRef.current = calculatedWpm;
      messageRef.current = "Congratulations! You completed the test.";

      setDisplayWpm(calculatedWpm);
      setDisplayMessage("Congratulations! You completed the test.");
    }
  };

  return (
    <div className="typing-test-container">
      <h1 className="heading">Typing Speed Test</h1>
      <p className="sentence">{sentence}</p>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type here..."
        disabled={displayWpm !== null} 
        className="input"
      />
      {displayWpm !== null && <p className="result">You typed at : {displayWpm}</p>}
      {displayMessage && <p className="message">{displayMessage}</p>}
      <button onClick={generateSentence} className="button">
        Reset
      </button>
    </div>
  );
}

export default App;
