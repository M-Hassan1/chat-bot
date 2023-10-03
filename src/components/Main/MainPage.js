import { useState } from 'react'
import axios from 'axios'


export default function MainPage() {
  const [inputValue, setInputValue] = useState('')

  const [chatLog, setChatLog] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue)

    setInputValue(''); 
  }

  const sendMessage = (message) => {
    const url = '/api/chat'

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{"role" : "user" , "content" : message}],
      "temperature": 0.7
    }
    setIsLoading(true)
    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, {type: 'bot', message: response.data.choices[0].message.content}])
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      console.log(error);
    } )
  }

  return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">ChatBot</h1>
        <div className="bg-white rounded-lg p-4 w-full lg:w-1/2 shadow-md">
          {chatLog.map((message, index) => (
            <div key={index} className={`mb-2 ${message.type === 'bot' ? 'text-blue-600' : 'text-gray-900'}`}>
              {message.message}
            </div>
          ))}
          {isLoading && (
            <div className="animate-pulse text-gray-300">
              <div className="w-32 h-4 bg-gray-400 rounded mb-2"></div>
              <div className="w-20 h-4 bg-gray-400 rounded"></div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Type Your Message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow rounded-lg p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
}
