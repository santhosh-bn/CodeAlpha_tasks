import { motion } from 'framer-motion';
import { ConversationContext } from '../types';
import { Brain, History, Tag } from 'lucide-react';

interface ContextPanelProps {
  context: ConversationContext;
}

export function ContextPanel({ context }: ContextPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-purple-500" />
        <h4 className="text-sm font-semibold text-slate-700">Conversation Context</h4>
      </div>
      
      <div className="space-y-3">
        {context.lastIntent && (
          <div className="flex items-start gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500">Last Intent</p>
              <p className="text-sm font-medium text-slate-700">{context.lastIntent}</p>
            </div>
          </div>
        )}
        
        {context.lastCategory && (
          <div className="flex items-start gap-2">
            <div className="w-3.5 h-3.5 rounded bg-emerald-100 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500">Active Category</p>
              <p className="text-sm font-medium text-slate-700">{context.lastCategory}</p>
            </div>
          </div>
        )}
        
        {context.conversationHistory.length > 0 && (
          <div className="flex items-start gap-2">
            <History className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500">Turns</p>
              <p className="text-sm font-medium text-slate-700">{context.conversationHistory.length}</p>
            </div>
          </div>
        )}
        
        {context.mentionedEntities.length > 0 && (
          <div>
            <p className="text-xs text-slate-500 mb-1.5">Mentioned Entities</p>
            <div className="flex flex-wrap gap-1">
              {context.mentionedEntities.slice(0, 5).map((entity, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full"
                >
                  {entity.type}: {entity.value}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {!context.lastIntent && !context.lastCategory && context.conversationHistory.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-2">
            Start a conversation to build context
          </p>
        )}
      </div>
    </motion.div>
  );
}