import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sideber/Sidebar.component';
import Chat from './components/Chat/Chat.component';
import Pusher from 'pusher-js';
import axios from './axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/message')
      .then(response => {
        setMessages(...messages, response.data)
      })
  },[])


  useEffect(() => {
    var pusher = new Pusher('bb4463eabd5b2e65a6ec', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>

    </div>
  );
}

export default App;
