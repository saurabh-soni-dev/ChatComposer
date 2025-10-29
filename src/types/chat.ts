export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatProps {
  messages: Message[];
  onSend: (text: string) => void;
  showJumpToLatest: boolean;
  unreadCount: number;
  isTyping: boolean;
  ads: string[];
}

export interface ComposerProps {
  onSend: (text: string) => void;
  disabled: boolean;
}
