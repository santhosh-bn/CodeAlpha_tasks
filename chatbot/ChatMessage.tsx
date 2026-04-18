import { motion } from 'framer-motion';
import { Message } from '../types';
import { User, Bot, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}

export function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isBot = message.type === 'bot';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Headers (bold)
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-white mt-3 mb-1">{line.slice(2, -2)}</p>;
      }
      
      // Bold inline text
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(line)) {
        const parts = line.split(boldRegex);
        return (
          <p key={i} className="text-slate-300 leading-relaxed">
            {parts.map((part, j) => 
              j % 2 === 1 
                ? <strong key={j} className="font-semibold text-white">{part}</strong> 
                : part
            )}
          </p>
        );
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        return null;
      }
      
      // Inline code
      if (line.includes('`')) {
        const parts = line.split(/`([^`]+)`/);
        return (
          <p key={i} className="text-slate-300 leading-relaxed">
            {parts.map((part, j) => 
              j % 2 === 1 
                ? <code key={j} className="bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-400">{part}</code>
                : part
            )}
          </p>
        );
      }
      
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="ml-4 text-slate-300 list-disc">{line.slice(2)}</li>;
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        return <li key={i} className="ml-4 text-slate-300 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }
      
      // Regular text
      return <p key={i} className="text-slate-300 leading-relaxed">{line}</p>;
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 px-4 py-6 ${isBot ? 'bg-slate-950' : 'bg-slate-900'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center ${isBot ? 'bg-emerald-600' : 'bg-violet-600'}`}>
        {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="prose prose-invert max-w-none">
          {formatContent(message.content)}
        </div>
        
        {isBot && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800">
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors border border-slate-700"
              title="Copy response"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors border border-slate-700" title="Good response">
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors border border-slate-700" title="Bad response">
              <ThumbsDown className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors border border-slate-700" title="Regenerate">
              <RotateCcw className="w-4 h-4" />
            </button>
            
            {message.confidence && (
              <span className="ml-auto text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                {Math.round(message.confidence * 100)}% match
              </span>
            )}
          </div>
        )}
        
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {message.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}