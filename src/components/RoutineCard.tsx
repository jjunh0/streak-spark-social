
import { Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  };
}

const RoutineCard = ({ routine }: RoutineCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(routine.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="bg-white rounded-xl border hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={routine.user.avatar} />
            <AvatarFallback>{routine.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-sm">{routine.user.name}</h4>
              <Badge className="text-xs bg-gradient-to-r from-orange-400 to-red-400 text-white">
                🔥 {routine.user.streak}일
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{routine.routine} • {routine.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img 
          src={routine.image} 
          alt={routine.routine}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-800 hover:bg-white">
            {routine.routine}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-3">{routine.description}</p>
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{routine.comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
