import { Heart, MessageCircle, Share, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

interface RoutineCardProps {
  routine: {
    id: number;
    user: {
      name: string;
      avatar: string;
      streak: number;
    };
    routine: string;
    image: string;
    description: string;
    timestamp: string;
    likes: number;
    comments: number;
    isLiked?: boolean;
  };
}

const RoutineCard = ({ routine }: RoutineCardProps) => {
  const { state, dispatch } = useApp();

  const likes = routine.likes || 0;
  const isLiked = routine.isLiked;

  const handleThumbsUp = () => {
    dispatch({ 
      type: 'TOGGLE_LIKE', 
      payload: { routineId: routine.id, userId: '1' } 
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12 ring-2 ring-indigo-100">
            <AvatarImage src={routine.user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
              {routine.user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-3">
              <h4 className="font-bold text-slate-800">{routine.user.name}</h4>
              <Badge className="text-xs bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium px-2 py-1">
                🔥 {routine.user.streak}일
              </Badge>
            </div>
            <p className="text-sm text-slate-500 font-medium">{routine.routine} • {routine.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img 
          src={routine.image} 
          alt={routine.routine}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/95 backdrop-blur-sm text-slate-800 hover:bg-white font-medium px-3 py-1 shadow-lg">
            {routine.routine}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-slate-700 mb-6 leading-relaxed">{routine.description}</p>
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThumbsUp}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isLiked 
                  ? 'text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-slate-500 hover:text-blue-500 hover:bg-slate-50'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{routine.comments}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
          {/* 일정 수 이상 동의 시 인증 성공, 미만이면 인증 시도중 표시 */}
          {likes >= 3 ? (
            <span className="ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold shadow">인증 성공 🎉</span>
          ) : (
            <span className="ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 text-white text-xs font-bold shadow">인증 시도중...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
