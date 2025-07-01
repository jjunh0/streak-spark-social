
import { useState } from "react";

const StreakCalendar = () => {
  // Mock data for the last 7 weeks
  const generateCalendarData = () => {
    const data = [];
    const today = new Date();
    
    for (let week = 6; week >= 0; week--) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (week * 7) + day - today.getDay());
        
        // Mock streak data - random completion
        const isCompleted = Math.random() > 0.3; // 70% completion rate
        const isFuture = date > today;
        
        weekData.push({
          date: date.getDate(),
          isCompleted: isCompleted && !isFuture,
          isFuture,
          isToday: date.toDateString() === today.toDateString()
        });
      }
      data.push(weekData);
    }
    return data;
  };

  const calendarData = generateCalendarData();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="space-y-2">
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 text-xs text-center text-muted-foreground mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-1">{day}</div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="space-y-1">
        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`
                  w-6 h-6 rounded-sm flex items-center justify-center text-xs font-medium
                  ${day.isFuture 
                    ? 'bg-gray-100 text-gray-300' 
                    : day.isCompleted 
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }
                  ${day.isToday ? 'ring-2 ring-purple-400 ring-offset-1' : ''}
                  transition-all duration-200 hover:scale-110
                `}
                title={day.isFuture ? '미래' : day.isCompleted ? '인증 완료' : '인증 없음'}
              >
                {day.isCompleted && !day.isFuture && '✓'}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="text-xs text-center text-muted-foreground mt-3">
        지난 7주간의 인증 기록
      </div>
    </div>
  );
};

export default StreakCalendar;
