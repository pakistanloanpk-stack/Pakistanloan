import React from 'react';

interface HeaderProps {
  onOpenTelegramSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTelegramSettings }) => {
  return (
    <header className="w-full">
      {/* Topmost National Bar */}
      <div className="bg-[#033c32] text-white/95 text-xs sm:text-sm font-medium py-1.5 px-4 sm:px-8 border-b border-[#054d40]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-urdu text-sm sm:text-base tracking-wide" dir="rtl">
            اسلامی جمہوریہ پاکستان
          </span>
          <span className="text-white/40 mx-2">|</span>
          <span className="tracking-wide">Islamic Republic of Pakistan</span>
        </div>
      </div>

      {/* Main Ministry Header */}
      <div className="relative bg-[#ebf5f1] border-b border-[#d8ebe1] overflow-hidden">
        {/* Subtle Islamabad / Faisal Mosque Skyline in Pale Sage */}
        <div className="absolute right-0 bottom-0 top-0 w-80 md:w-96 pointer-events-none opacity-40 flex items-end justify-end">
          <svg
            viewBox="0 0 400 120"
            className="w-full h-24 sm:h-28 text-[#4a8a7c] fill-current"
            preserveAspectRatio="none"
          >
            {/* Faisal Mosque dome & minarets silhouette */}
            <path d="M280 120 L280 40 L283 20 L285 40 L285 120 Z" />
            <path d="M360 120 L360 30 L363 15 L365 30 L365 120 Z" />
            <path d="M300 120 L300 70 L320 40 L340 70 L340 120 Z" />
            <path d="M320 40 L320 25 L322 25 L322 40 Z" />
            <path d="M250 120 L250 85 L260 75 L270 85 L270 120 Z" />
            <path d="M220 120 L220 90 L235 80 L245 90 L245 120 Z" />
            <path d="M180 120 L190 95 L200 95 L210 120 Z" />
            {/* Minar-e-Pakistan spire in distance */}
            <path d="M380 120 L382 70 L385 60 L388 70 L390 120 Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            {/* Pakistan Government Crescent Emblem */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#044c3f] flex items-center justify-center shadow-sm text-white flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9 fill-white">
                {/* Crescent and Star */}
                <path d="M52 16 A 34 34 0 1 0 78 78 A 38 38 0 1 1 52 16 Z" />
                {/* 5-pointed Star */}
                <polygon points="76,32 79,41 89,41 81,47 84,56 76,51 68,56 71,47 63,41 73,41" />
              </svg>
            </div>

            <div>
              <div className="text-[#086352] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                MINISTRY OF FINANCE
              </div>
              <h1 className="text-[#0c3931] font-bold text-lg sm:text-2xl tracking-tight leading-tight">
                Pakistan Loan Portal
              </h1>
            </div>
          </div>

          {onOpenTelegramSettings && (
            <button
              onClick={onOpenTelegramSettings}
              className="text-[11px] sm:text-xs font-medium bg-white/80 hover:bg-white text-[#044c3f] border border-[#bce0d2] px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Telegram Bot Settings"
            >
              <svg className="w-3.5 h-3.5 fill-[#229ED9]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.15 3.35-1.35 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .26z" />
              </svg>
              <span>Bot Config</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
