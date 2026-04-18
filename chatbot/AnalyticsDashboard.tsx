import { motion } from 'framer-motion';
import { 
  MessageCircleQuestion, 
  Target, 
  TrendingUp, 
  Zap,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Analytics } from '../types';

interface AnalyticsDashboardProps {
  analytics: Analytics;
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const stats = [
    {
      icon: MessageCircleQuestion,
      label: 'Total Queries',
      value: analytics.totalQueries,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Target,
      label: 'Match Rate',
      value: analytics.totalQueries > 0 
        ? `${Math.round((analytics.successfulMatches / analytics.totalQueries) * 100)}%`
        : '0%',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: TrendingUp,
      label: 'Avg Confidence',
      value: analytics.avgConfidence > 0 
        ? `${Math.round(analytics.avgConfidence * 100)}%`
        : 'N/A',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Zap,
      label: 'Active Intents',
      value: analytics.topIntents.length,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];
  
  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Intent Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <h4 className="text-sm font-semibold text-slate-700">Top Intents</h4>
          </div>
          
          {analytics.topIntents.length > 0 ? (
            <div className="space-y-2">
              {analytics.topIntents.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 truncate">{item.intent}</span>
                      <span className="text-slate-500">{item.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / Math.max(...analytics.topIntents.map(i => i.count))) * 100}%` }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">No data yet</p>
          )}
        </motion.div>
        
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-slate-500" />
            <h4 className="text-sm font-semibold text-slate-700">Categories</h4>
          </div>
          
          {analytics.categoryDistribution.length > 0 ? (
            <div className="space-y-2">
              {analytics.categoryDistribution.slice(0, 5).map((item, idx) => {
                const colors = [
                  'from-emerald-500 to-teal-500',
                  'from-blue-500 to-indigo-500',
                  'from-amber-500 to-orange-500',
                  'from-purple-500 to-pink-500',
                  'from-rose-500 to-red-500'
                ];
                
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${colors[idx % colors.length]}`} />
                    <span className="flex-1 text-xs text-slate-600 truncate">{item.category}</span>
                    <span className="text-xs font-medium text-slate-700">{item.count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">No data yet</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}