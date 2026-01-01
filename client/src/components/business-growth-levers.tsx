import { useState } from 'react';
import { motion } from 'framer-motion';

const BriefcaseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const CpuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
);

const BrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
);

const CurrencyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const TrendingUpIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);


const chartData = [
  { name: 'M&A', score: 15, theme: 'deep-blue-1', logo: <BriefcaseIcon /> },
  { name: 'Digital Transform.', score: 18, theme: 'deep-blue-2', logo: <CpuIcon /> },
  { name: 'AI Implement.', score: 21, theme: 'deep-blue-3', logo: <BrainIcon /> },
  { name: 'Cash Cycle Optim.', score: 14, theme: 'deep-blue-0', logo: <CurrencyIcon /> },
  { name: 'Market & Position.', score: 16, theme: 'deep-blue-1', logo: <TrendingUpIcon /> },
  { name: 'Talent & Hiring', score: 17, theme: 'deep-blue-2', logo: <UsersIcon /> },
];

const themeStyles: Record<string, { border: string; bg: string; hover: string }> = {
  'deep-blue-0': {
    border: 'border-[#274D8E]/100',
    bg: 'bg-[#E8F4FC]',
    hover: 'group-hover:bg-[#E8F4FC]/80',
  },
  'deep-blue-1': {
    border: 'border-[#274D8E]/100',
    bg: 'bg-[#BFD8F0]',
    hover: 'group-hover:bg-[#BFD8F0]/80',
  },
  'deep-blue-2': {
    border: 'border-[#274D8E]/100',
    bg: 'bg-[#6FA4D1]',
    hover: 'group-hover:bg-[#6FA4D1]/80',
  },
  'deep-blue-3': {
    border: 'border-[#274D8E]/100',
    bg: 'bg-[#274D8E]',
    hover: 'group-hover:bg-[#274D8E]/90',
  }
};

export function BusinessGrowthLevers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const MIN_Y = 0;
  const MAX_Y = 25;
  const ticks = [0, 5, 10, 15, 20, 25];

  const calculateHeight = (score: number) => {
    const range = MAX_Y - MIN_Y;
    const value = score - MIN_Y;
    if (value < 0) return 0;
    return (value / range) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4FC] to-white flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
        
      <div className="w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        
        <div className="p-4 sm:p-6 md:p-8 pb-24 sm:pb-28 md:pb-32">
          
          <div className="flex justify-center items-center gap-4 mb-2">
              <h2 className="text-[#1a365d] text-base sm:text-lg font-display font-semibold tracking-wide text-center">
                  Business Growth Levers / Projected ROI
              </h2>
          </div>

          <div className="flex justify-center items-center gap-2 mb-6 sm:mb-8">
              <span className="text-[#274D8E] text-xs sm:text-sm font-sans font-medium tracking-wide">
                  Projected ROI (%)
              </span>
          </div>

          <div className="relative pl-10 sm:pl-12 pr-2 sm:pr-4 h-[250px] sm:h-[280px] md:h-[320px]">
              
              <div className="absolute inset-0 left-0 right-0 flex flex-col justify-between pointer-events-none z-0 pl-2">
                  {ticks.slice().reverse().map((tick) => (
                      <div key={tick} className="relative w-full flex items-center h-0">
                          <span className="absolute -left-8 sm:-left-9 text-[9px] sm:text-[10px] text-gray-500 font-mono w-6 text-right">
                              {tick}%
                          </span>
                          <div className="w-full border-t border-dashed border-gray-300/30 h-[1px]" />
                      </div>
                  ))}
              </div>

              <div className="absolute inset-0 left-0 right-0 flex justify-around items-end z-10 pt-4 px-1">
                  {chartData.map((item, index) => {
                      const theme = themeStyles[item.theme];
                      const barHeight = calculateHeight(item.score);

                      return (
                          <div 
                              key={index} 
                              className="relative flex flex-col items-center justify-end h-full group flex-1 max-w-[80px] sm:max-w-[100px]"
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                          >
                              <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${barHeight}%` }}
                                  transition={{ 
                                      type: "spring", 
                                      stiffness: 60, 
                                      damping: 15,
                                      delay: index * 0.1 
                                  }}
                                  className={`
                                      w-10 sm:w-12 md:w-14
                                      relative
                                      ${theme.bg} 
                                      ${theme.border} 
                                      border-[1.5px]
                                      rounded-t-[2px]
                                      transition-colors duration-300
                                      ${theme.hover}
                                  `}
                              >
                                  <motion.div 
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.4 + (index * 0.1) }}
                                      className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center shadow-sm z-20"
                                  >
                                      {item.logo}
                                  </motion.div>
                              </motion.div>

                              <div className="absolute -bottom-2 translate-y-full flex flex-col items-center w-full px-0.5">
                                  <div className="h-1 w-[1px] bg-gray-400 mb-1"></div>
                                  <span className={`
                                      text-[9px] sm:text-[10px] md:text-[11px] 
                                      font-sans font-medium 
                                      text-center leading-tight
                                      w-full
                                      transition-colors duration-200
                                      ${hoveredIndex === index ? 'text-[#1a365d]' : 'text-gray-500'}
                                  `}
                                  style={{
                                      wordBreak: 'break-word',
                                      overflowWrap: 'break-word',
                                      hyphens: 'auto',
                                  }}
                                  >
                                      {item.name}
                                  </span>
                              </div>
                          </div>
                      );
                  })}
              </div>

              <div className="absolute bottom-0 left-2 right-0 h-[1px] bg-gray-300 z-0" />
              
              <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-gray-300 z-0" />

          </div>
        </div>
      </div>
    </div>
  );
}
