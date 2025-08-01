// src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  useClient,
  useTranscript,
  useConnectionState,
  useConversation,
  useAgentState
} from '@telnyx/ai-agent-lib';
import HeartIcon from './HeartIcon';
import './Heart.css';

function App() {
  const client = useClient();
  const transcript = useTranscript();
  const connectionState = useConnectionState();
  const conversation = useConversation();
  const agentState = useAgentState();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (conversation?.call?.remoteStream && audioRef.current) {
      audioRef.current.srcObject = conversation.call.remoteStream;
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      client.sendConversationMessage(messageInput);
      setMessageInput('');
    }
  };

  const isCallActive = conversation?.call?.state === 'active';

  const floatingEmojis = ['❤️', '💬', '🎈'];

  function FloatingEmoji({ emoji }: { emoji: string }) {
    const style = {
      left: `${Math.random() * 90 + 5}%`,
      animationDuration: `${Math.random() * 5 + 6}s`
    };
    return <span className="floating-emoji" style={style}>{emoji}</span>;
  }

  return (
    <div className="container">
      {floatingEmojis.map((emoji, i) => (
        <FloatingEmoji key={i} emoji={emoji} />
      ))}
      <h1>🗣️ Heart Talker</h1>
      <div className={`heart-container heart-glow ${agentState === 'speaking' ? 'pulse' : ''}`}>
        <HeartIcon isSpeaking={agentState === 'speaking'} />
      </div>
      {agentState === 'speaking' && (
        <div className="floating-particles">
          {['❤️', '✨', '💖'].map((emoji, i) => (
            <span className="sparkle" style={{ left: `${20 + i * 20}px`, top: `${Math.random() * 30}px` }} key={i}>
              {emoji}
            </span>
          ))}
        </div>
      )}

      <h2>Connection: {connectionState}</h2>
      <h3>Agent State: {agentState}</h3>

      <div className="controls">
        <button
          onClick={() => client.startConversation()}
          disabled={connectionState !== 'connected'}
        >
          Start Conversation
        </button>

        <button onClick={() => client.endConversation()}>
          End Conversation
        </button>
      </div>

      {isCallActive && (
        <div className="text-entry">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage} disabled={!messageInput.trim()}>
            Send
          </button>
        </div>
      )}

      <audio ref={audioRef} autoPlay playsInline controls />
    </div>
  );
}

export default App;