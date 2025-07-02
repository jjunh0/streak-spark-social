import { useApp } from "@/contexts/AppContext";

const StreakCalendar = () => {
  const { state } = useApp();
  
  // 실제 스트릭 데이터를 사용하여 캘린더 생성
  const generateCalendarData = () => {
    const data = [];
    const today = new Date();
    
    for (let week = 6; week >= 0; week--) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (week * 7) + day - today.getDay());
        const dateString = date.toISOString().split('T')[0];
        
        const isCompleted = state.streakData[dateString] || false;
        const isFuture = date > today;
        const isToday = date.toDateString() === today.toDateString();
        
        weekData.push({
          date: date.getDate(),
          isCompleted,
          isFuture,
          isToday
        });
      }
      data.push(weekData);
    }
    return data;
  };

  const calendarData = generateCalendarData();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="space-y-4">
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-2 text-xs text-center text-slate-500 font-medium mb-3">
        {weekDays.map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="space-y-2">
        {calendarData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                  transition-all duration-300 hover:scale-110 cursor-pointer
                  ${day.isFuture 
                    ? 'bg-slate-100 text-slate-300' 
                    : day.isCompleted 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                  }
                  ${day.isToday ? 'ring-2 ring-indigo-400 ring-offset-2 shadow-lg' : ''}
                `}
                title={day.isFuture ? '미래' : day.isCompleted ? '인증 완료' : '인증 없음'}
              >
                {day.isCompleted && !day.isFuture && '✓'}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="text-xs text-center text-slate-500 font-medium mt-4 pt-4 border-t border-slate-100">
        지난 7주간의 인증 기록
      </div>
    </div>
  );
};

export default StreakCalendar;
