
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
    if (badge.includes('연속')) return 'bg-gradient-to-r from-yellow-400 to-orange-400';
    if (badge.includes('첫')) return 'bg-gradient-to-r from-green-400 to-blue-400';
    if (badge.includes('주말')) return 'bg-gradient-to-r from-purple-400 to-pink-400';
    return 'bg-gradient-to-r from-indigo-400 to-purple-400';
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">획득한 뱃지</h4>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => {
          const IconComponent = getBadgeIcon(badge);
          const colorClass = getBadgeColor(badge);
          
          return (
            <div
              key={index}
              className={`
                ${colorClass} text-white px-3 py-1 rounded-full 
                flex items-center space-x-1 text-xs font-medium
                shadow-sm hover:shadow-md transition-shadow
              `}
            >
              <IconComponent className="w-3 h-3" />
              <span>{badge}</span>
            </div>
          );
        })}
      </div>
      
      {badges.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          아직 획득한 뱃지가 없어요.<br />
          첫 인증을 시작해보세요! 🎯
        </p>
      )}
    </div>
  );
};

export default BadgeShowcase;
