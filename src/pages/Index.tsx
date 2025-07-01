
import { useState } from "react";
import { Calendar, Trophy, Users, Plus, Home, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RoutineCard from "@/components/RoutineCard";
import StreakCalendar from "@/components/StreakCalendar";
import BadgeShowcase from "@/components/BadgeShowcase";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const mockRoutines = [
    {
      id: 1,
      user: { name: "김운동", avatar: "/placeholder.svg", streak: 15 },
      routine: "아침 러닝",
      image: "/placeholder.svg",
      description: "오늘도 5km 완주! 날씨가 좋아서 기분도 상쾌해요 🏃‍♂️",
      timestamp: "2시간 전",
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      user: { name: "박독서", avatar: "/placeholder.svg", streak: 23 },
      routine: "독서 1시간",
      image: "/placeholder.svg",
      description: "오늘은 '원칙'을 읽었어요. 정말 도움이 되는 내용들이 많네요 📚",
      timestamp: "4시간 전",
      likes: 8,
      comments: 5
    },
    {
      id: 3,
      user: { name: "이명상", avatar: "/placeholder.svg", streak: 7 },
      routine: "명상 20분",
      image: "/placeholder.svg",
      description: "마음이 차분해지는 시간. 오늘 하루도 감사합니다 🧘‍♀️",
      timestamp: "6시간 전",
      likes: 15,
      comments: 2
    }
  ];

  const userProfile = {
    name: "나의루틴",
    streak: 12,
    totalDays: 45,
    badges: ["연속 10일", "첫 인증", "주말 챔피언"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              루틴메이트
            </h1>
          </div>
          
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <Plus className="w-4 h-4 mr-1" />
            인증하기
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">{userProfile.streak}일</div>
                  <p className="text-sm text-muted-foreground">현재 스트릭</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.totalDays}일</div>
                  <p className="text-sm text-muted-foreground">총 인증일</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-indigo-600">{userProfile.badges.length}개</div>
                  <p className="text-sm text-muted-foreground">획득 뱃지</p>
                </CardContent>
              </Card>
            </div>

            {/* Routine Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>루틴 피드</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRoutines.map((routine) => (
                  <RoutineCard key={routine.id} routine={routine} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>내 프로필</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>나</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-2">{userProfile.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  🔥 {userProfile.streak}일 연속 인증중!
                </div>
                <BadgeShowcase badges={userProfile.badges} />
              </CardContent>
            </Card>

            {/* Streak Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>스트릭 캘린더</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StreakCalendar />
              </CardContent>
            </Card>

            {/* Popular Routines */}
            <Card>
              <CardHeader>
                <CardTitle>인기 루틴</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["아침 러닝", "독서 1시간", "명상", "영어 공부", "근력 운동"].map((routine, index) => (
                  <div key={routine} className="flex items-center justify-between">
                    <span className="text-sm">{routine}</span>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Button
              variant={activeTab === "feed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("feed")}
              className="flex-col h-auto py-2"
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">피드</span>
            </Button>
            
            <Button
              variant={activeTab === "search" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("search")}
              className="flex-col h-auto py-2"
            >
              <Search className="w-5 h-5 mb-1" />
              <span className="text-xs">탐색</span>
            </Button>
            
            <Button
              variant={activeTab === "add" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("add")}
              className="flex-col h-auto py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            >
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">인증</span>
            </Button>
            
            <Button
              variant={activeTab === "community" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("community")}
              className="flex-col h-auto py-2"
            >
              <Users className="w-5 h-5 mb-1" />
              <span className="text-xs">커뮤니티</span>
            </Button>
            
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("profile")}
              className="flex-col h-auto py-2"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">프로필</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
