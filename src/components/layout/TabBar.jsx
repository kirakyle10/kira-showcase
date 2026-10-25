import { motion } from 'framer-motion';

export default function TabBar({ tabs, active, onChange }) {
  return (
    <div className="sticky top-[57px] z-20 -mx-4 border-b border-kira-border/60 bg-kira-bg/85 px-4 backdrop-blur-md sm:top-[61px] sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kira-accent sm:text-base ${
                isActive ? 'text-kira-text' : 'text-kira-muted hover:text-kira-text'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-2 -bottom-[9px] h-0.5 rounded-full bg-kira-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
