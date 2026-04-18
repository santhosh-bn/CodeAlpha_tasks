import { motion } from 'framer-motion';
import { FAQ } from '../types';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface FAQSidebarProps {
  faqs: FAQ[];
  onSelectQuestion: (question: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function FAQSidebar({ faqs, onSelectQuestion, selectedCategory, onSelectCategory }: FAQSidebarProps) {
  const categories = [...new Set(faqs.map(faq => faq.category))];
  
  const getIntentIcon = (intent: string) => {
    if (intent.includes('account')) return '👤';
    if (intent.includes('billing')) return '💳';
    if (intent.includes('features')) return '⚡';
    if (intent.includes('support')) return '🔧';
    if (intent.includes('privacy')) return '🔒';
    return '💬';
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Knowledge Base
        </h3>
        <p className="text-xs text-slate-400 mt-1">{faqs.length} FAQs available</p>
      </div>
      
      {/* Category filter */}
      <div className="p-3 border-b border-slate-100">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
            !selectedCategory 
              ? 'bg-emerald-50 text-emerald-700 font-medium' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Categories
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {categories
          .filter(category => !selectedCategory || category === selectedCategory)
          .map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.05 }}
            className="mb-4"
          >
            <button
              onClick={() => onSelectCategory(category)}
              className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 mb-2 hover:text-slate-700 transition-colors"
            >
              <span>{category}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            
            <div className="space-y-1">
              {faqs
                .filter(faq => faq.category === category)
                .slice(0, selectedCategory ? 10 : 3)
                .map((faq, index) => (
                  <motion.button
                    key={faq.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.05 + index * 0.03 }}
                    onClick={() => onSelectQuestion(faq.question)}
                    className="w-full text-left px-3 py-2.5 text-sm text-slate-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 rounded-lg transition-all flex items-start gap-2.5 group"
                  >
                    <span className="text-base">{getIntentIcon(faq.intent)}</span>
                    <span className="line-clamp-2 flex-1">{faq.question}</span>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}