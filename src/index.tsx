// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TelnyxAIAgentProvider } from '@telnyx/ai-agent-lib';

const agentId = 'assistant-cbeb01ac-1709-434d-99b1-4edec884f012';

createRoot(document.getElementById('root')!).render(
  <TelnyxAIAgentProvider agentId={agentId}>
    <App />
  </TelnyxAIAgentProvider>
);
