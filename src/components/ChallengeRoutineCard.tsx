import { Calendar, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BadgeShowcase from "./BadgeShowcase";
import StreakCalendar from "./StreakCalendar";

interface ChallengeRoutineCardProps {
  routine: {
    id: number;
    name: string;
    streak: number;
    totalDays: number;
    badges: string[];
    recentPosts: number;
    category: string;
    startDate: string;
  };
}

const ChallengeRoutineCard = ({ routine }: ChallengeRoutineCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '운동': return 'bg-gradient-to-br from-red-400 to-orange-500';
      case '공부': return 'bg-gradient-to-br from-blue-400 to-indigo-500';
      case '독서': return 'bg-gradient-to-br from-green-400 to-teal-500';
      case '명상': return 'bg-gradient-to-br from-purple-400 to-pink-500';
      default: return 'bg-gradient-to-br from-slate-400 to-slate-500';
    }
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-800">{routine.name}</CardTitle>
          <div className={`${getCategoryColor(routine.category)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
            {routine.category}
          </div>
        </div>
        <p className="text-sm text-slate-500 font-medium">
          {routine.startDate}부터 시작
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 스트릭 정보 */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-600">🔥 {routine.streak}</div>
            <p className="text-xs text-slate-500 font-medium">연속일</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">{routine.totalDays}</div>
            <p className="text-xs text-slate-500 font-medium">총일수</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">{routine.recentPosts}</div>
            <p className="text-xs text-slate-500 font-medium">최근 포스트</p>
          </div>
        </div>

        {/* 뱃지 */}
        <BadgeShowcase badges={routine.badges} />

        {/* 미니 캘린더 */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-sm font-bold text-slate-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              인증 기록
            </h5>
          </div>
          <StreakCalendar />
        </div>

        {/* 액션 버튼 */}
        <div className="flex space-x-3">
          <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl shadow-lg">
            <TrendingUp className="w-4 h-4 mr-2" />
            통계 보기
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl">
            피드 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeRoutineCard;
