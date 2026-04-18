import { motion } from 'framer-motion';
import { MessageCircleQuestion, Database, Zap } from 'lucide-react';
import { FAQ } from '../types';

interface StatsPanelProps {
  faqs: FAQ[];
  messageCount: number;
}

export function StatsPanel({ faqs, messageCount }: StatsPanelProps) {
  const stats = [
    {
      icon: Database,
      label: 'FAQ Database',
      value: faqs.length,
      color: 'bg-blue-500'
    },
    {
      icon: MessageCircleQuestion,
      label: 'Questions Asked',
      value: messageCount,
      color: 'bg-emerald-500'
    },
    {
      icon: Zap,
      label: 'NLP Engine',
      value: 'Active',
      color: 'bg-amber-500'
    }
  ];
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-3 border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className={`p-1.5 rounded-lg ${stat.color}`}>
              <stat.icon className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-slate-500">{stat.label}</span>
          </div>
          <p className="text-lg font-bold text-slate-800">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}