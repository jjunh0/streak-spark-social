import { useState } from "react";
import { Calendar, Trophy, Users, Plus, Home, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RoutineCard from "@/components/RoutineCard";
import StreakCalendar from "@/components/StreakCalendar";
import BadgeShowcase from "@/components/BadgeShowcase";
import UserChallenges from "@/components/UserChallenges";
import CertificationModal from "@/components/CertificationModal";
import Profile from "@/pages/Profile";
import { useApp } from "@/contexts/AppContext";
import NewChallengeModal from "@/components/NewChallengeModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [isNewChallengeModalOpen, setIsNewChallengeModalOpen] = useState(false);
  const { state } = useApp();

  // 탭별 컴포넌트 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="pt-8 pb-6">
                      <div className="text-3xl font-bold text-indigo-600 mb-2">{state.user.streak}일</div>
                      <p className="text-sm text-slate-600 font-medium">현재 스트릭</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="pt-8 pb-6">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{state.user.totalDays}일</div>
                      <p className="text-sm text-slate-600 font-medium">총 인증일</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="pt-8 pb-6">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{state.user.badges.length}개</div>
                      <p className="text-sm text-slate-600 font-medium">획득 뱃지</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Routine Feed */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-800">루틴 피드</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {state.routines.map((routine) => (
                      <RoutineCard key={routine.id} routine={routine} />
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Profile Summary */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-800">내 프로필</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-6 ring-4 ring-indigo-100">
                      <AvatarImage src={state.user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold">나</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-3 text-slate-800">{state.user.name}</h3>
                    <div className="text-sm text-slate-600 mb-6 font-medium">
                      🔥 {state.user.streak}일 연속 인증중!
                    </div>
                    <BadgeShowcase badges={state.user.badges} />
                  </CardContent>
                </Card>

                {/* User Challenges */}
                <UserChallenges />

                {/* Streak Calendar */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-800">스트릭 캘린더</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StreakCalendar />
                  </CardContent>
                </Card>

                {/* Popular Routines */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl text-slate-800">인기 루틴</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {["아침 러닝", "독서 1시간", "명상", "영어 공부", "근력 운동"].map((routine, index) => (
                      <div key={routine} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <span className="text-sm font-medium text-slate-700">{routine}</span>
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
                          #{index + 1}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      
      case "search":
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-24">
            <div className="max-w-5xl mx-auto px-4 py-8">
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">탐색 기능</h2>
                <p className="text-slate-600">곧 새로운 기능이 추가될 예정입니다!</p>
              </div>
            </div>
          </div>
        );
      
      case "community":
        return (
          <div className="min-h-screen flex items-center justify-center text-slate-500 text-xl">커뮤니티 기능 준비중</div>
        );
      
      case "profile":
        return <Profile />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 상단에 챌린지 만들기 버튼 */}
        <div className="flex justify-end mb-6">
          <button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:from-indigo-600 hover:to-purple-700 transition"
            onClick={() => setIsNewChallengeModalOpen(true)}
          >
            + 챌린지 만들기
          </button>
        </div>
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                루틴메이트
              </h1>
            </div>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-6"
              onClick={() => setIsCertificationModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              인증하기
            </Button>
          </div>
        </header>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex justify-around">
              <Button
                variant={activeTab === "feed" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("feed")}
                className={`flex-col h-auto py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === "feed" 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <Home className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">피드</span>
              </Button>
              
              <Button
                variant={activeTab === "search" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("search")}
                className={`flex-col h-auto py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === "search" 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <Search className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">탐색</span>
              </Button>
              
              <Button
                variant={activeTab === "add" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setActiveTab("add");
                  setIsCertificationModalOpen(true);
                }}
                className="flex-col h-auto py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">인증</span>
              </Button>
              
              <Button
                variant={activeTab === "community" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("community")}
                className={`flex-col h-auto py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === "community" 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">커뮤니티</span>
              </Button>
              
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("profile")}
                className={`flex-col h-auto py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === "profile" 
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <User className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">프로필</span>
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Certification Modal */}
      <CertificationModal 
        isOpen={isCertificationModalOpen}
        onClose={() => setIsCertificationModalOpen(false)}
      />

      {/* New Challenge Modal */}
      <NewChallengeModal isOpen={isNewChallengeModalOpen} onClose={() => setIsNewChallengeModalOpen(false)} />
    </div>
  );
};

export default Index;
