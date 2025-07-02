import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Calendar, Zap } from "lucide-react";

interface BadgeShowcaseProps {
  badges: string[];
}

const BadgeShowcase = ({ badges }: BadgeShowcaseProps) => {
  const getBadgeIcon = (badge: string) => {
    if (badge.includes('연속')) return Trophy;
    if (badge.includes('첫')) return Star;
    if (badge.includes('주말')) return Calendar;
    return Zap;
  };

  const getBadgeColor = (badge: string) => {
    if (badge.includes('연속')) return 'bg-gradient-to-br from-yellow-400 to-orange-500';
    if (badge.includes('첫')) return 'bg-gradient-to-br from-green-400 to-blue-500';
    if (badge.includes('주말')) return 'bg-gradient-to-br from-purple-400 to-pink-500';
    return 'bg-gradient-to-br from-indigo-400 to-purple-500';
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-slate-700">획득한 뱃지</h4>
      <div className="flex flex-wrap gap-3">
        {badges.map((badge, index) => {
          const IconComponent = getBadgeIcon(badge);
          const colorClass = getBadgeColor(badge);
          
          return (
            <div
              key={index}
              className={`
                ${colorClass} text-white px-4 py-2 rounded-xl 
                flex items-center space-x-2 text-sm font-bold
                shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                cursor-pointer
              `}
            >
              <IconComponent className="w-4 h-4" />
              <span>{badge}</span>
            </div>
          );
        })}
      </div>
      
      {badges.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 font-medium">
            아직 획득한 뱃지가 없어요.<br />
            첫 인증을 시작해보세요! 🎯
          </p>
        </div>
      )}
    </div>
  );
};

export default BadgeShowcase;
