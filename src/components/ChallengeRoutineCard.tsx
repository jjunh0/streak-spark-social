
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
      case '운동': return 'bg-gradient-to-r from-red-400 to-orange-400';
      case '공부': return 'bg-gradient-to-r from-blue-400 to-indigo-400';
      case '독서': return 'bg-gradient-to-r from-green-400 to-teal-400';
      case '명상': return 'bg-gradient-to-r from-purple-400 to-pink-400';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{routine.name}</CardTitle>
          <div className={`${getCategoryColor(routine.category)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
            {routine.category}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {routine.startDate}부터 시작
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 스트릭 정보 */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <div className="text-lg font-bold text-orange-600">🔥 {routine.streak}</div>
            <p className="text-xs text-muted-foreground">연속일</p>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-blue-600">{routine.totalDays}</div>
            <p className="text-xs text-muted-foreground">총일수</p>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-green-600">{routine.recentPosts}</div>
            <p className="text-xs text-muted-foreground">최근 포스트</p>
          </div>
        </div>

        {/* 뱃지 */}
        <BadgeShowcase badges={routine.badges} />

        {/* 미니 캘린더 */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              인증 기록
            </h5>
          </div>
          <StreakCalendar />
        </div>

        {/* 액션 버튼 */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            통계 보기
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            피드 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeRoutineCard;
