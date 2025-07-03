import { useState } from "react";
import { User, Settings, Activity, Trophy, Calendar, Edit, Camera, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import RoutineCard from "@/components/RoutineCard";
import StreakCalendar from "@/components/StreakCalendar";
import BadgeShowcase from "@/components/BadgeShowcase";
import { useApp } from "@/contexts/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { state } = useApp();
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // 모든 유저 목록
  const allUsers = [state.user, ...state.communityPosts.map(post => post.user)];
  const getUserById = (id: string) => allUsers.find(u => u.id === id);
  // userId가 있으면 해당 유저, 없으면 내 프로필
  const profileUser = userId ? getUserById(userId) : state.user;
  if (!profileUser) return <div className="text-center py-20 text-slate-400">존재하지 않는 유저입니다.</div>;

  // 팔로워/팔로잉 정보
  const followers = profileUser.followers.map(getUserById).filter(Boolean);
  const following = profileUser.following.map(getUserById).filter(Boolean);

  // 사용자의 루틴만 필터링
  const userRoutines = state.routines.filter(routine => routine.user.name === profileUser.name);

  // 통계 데이터
  const stats = [
    { label: "현재 스트릭", value: profileUser.streak, icon: "🔥", color: "text-orange-600" },
    { label: "총 인증일", value: profileUser.totalDays, icon: "📅", color: "text-blue-600" },
    { label: "획득 뱃지", value: profileUser.badges.length, icon: "🏆", color: "text-purple-600" },
    { label: "총 포스트", value: userRoutines.length, icon: "📝", color: "text-green-600" }
  ];

  // 월별 활동 데이터
  const monthlyActivity = [
    { month: "1월", posts: 12, streak: 8 },
    { month: "2월", posts: 15, streak: 12 },
    { month: "3월", posts: 18, streak: 15 },
    { month: "4월", posts: 22, streak: 18 },
    { month: "5월", posts: 25, streak: 20 },
    { month: "6월", posts: 28, streak: 23 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="w-32 h-32 ring-8 ring-indigo-100">
                  <AvatarImage src={profileUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl font-bold">
                    {profileUser.name[0]}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-white border-indigo-200"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                      {profileUser.name}
                      {profileUser.streak >= 60 && (
                        <span className="inline-block"><Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">숙련자</Badge></span>
                      )}
                    </h1>
                    <p className="text-slate-600 mb-4">
                      루틴을 통해 더 나은 나를 만들어가고 있어요<br />
                      {profileUser.streak >= 60 && (
                        <span className="text-indigo-600 font-semibold">🔥 {profileUser.streak}일 연속 인증! 오랜 기간 꾸준히 실천한 숙련자입니다.</span>
                      )}
                    </p>
                    {/* 팔로워/팔로잉 */}
                    <div className="flex gap-4 justify-center md:justify-start mb-2">
                      <button className="text-sm text-indigo-600 hover:underline font-semibold" onClick={() => setShowFollowers(true)}>
                        팔로워 {followers.length}
                      </button>
                      <span className="text-slate-400">|</span>
                      <button className="text-sm text-indigo-600 hover:underline font-semibold" onClick={() => setShowFollowing(true)}>
                        팔로잉 {following.length}
                      </button>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "저장" : "편집"}
                  </Button>
                </div>
                {/* Stats Grid - 가로 스크롤/가로 배치로 개선 */}
                <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                  {stats.map((stat) => (
                    <div key={stat.label} className="min-w-[120px] text-center p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200/50 flex-shrink-0">
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.icon} {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 팔로워/팔로잉 모달 */}
        <Dialog open={showFollowers} onOpenChange={setShowFollowers}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>팔로워</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {followers.length === 0 && <div className="text-slate-400 text-center">팔로워가 없습니다.</div>}
              {followers.map((user: any) => (
                <button key={user.id} className="flex items-center gap-3 w-full p-2 rounded hover:bg-slate-100" onClick={() => { setShowFollowers(false); navigate(`/profile/${user.id}`); }}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-700">{user.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={showFollowing} onOpenChange={setShowFollowing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>팔로잉</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {following.length === 0 && <div className="text-slate-400 text-center">팔로잉이 없습니다.</div>}
              {following.map((user: any) => (
                <button key={user.id} className="flex items-center gap-3 w-full p-2 rounded hover:bg-slate-100" onClick={() => { setShowFollowing(false); navigate(`/profile/${user.id}`); }}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-700">{user.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
            >
              개요
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
            >
              활동
            </TabsTrigger>
            <TabsTrigger 
              value="badges" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
            >
              뱃지
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
            >
              설정
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Streak Calendar */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span>스트릭 캘린더</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StreakCalendar />
                </CardContent>
              </Card>

              {/* Monthly Activity */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    <span>월별 활동</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyActivity.map((month) => (
                      <div key={month.month} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <span className="font-medium text-slate-700">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm font-bold text-indigo-600">{month.posts}</div>
                            <div className="text-xs text-slate-500">포스트</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-orange-600">🔥 {month.streak}</div>
                            <div className="text-xs text-slate-500">스트릭</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  <span>내 활동</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userRoutines.length > 0 ? (
                  <div className="space-y-6">
                    {userRoutines.map((routine) => (
                      <RoutineCard key={routine.id} routine={routine} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">아직 활동이 없어요</h3>
                    <p className="text-slate-500">첫 번째 루틴을 인증해보세요!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-indigo-600" />
                  <span>획득한 뱃지</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BadgeShowcase badges={profileUser.badges} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  <span>설정</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                    <div>
                      <h4 className="font-semibold text-slate-800">알림 설정</h4>
                      <p className="text-sm text-slate-500">루틴 인증 알림을 받습니다</p>
                    </div>
                    <Button variant="outline" size="sm">설정</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                    <div>
                      <h4 className="font-semibold text-slate-800">프라이버시</h4>
                      <p className="text-sm text-slate-500">프로필 공개 설정</p>
                    </div>
                    <Button variant="outline" size="sm">설정</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                    <div>
                      <h4 className="font-semibold text-slate-800">계정 관리</h4>
                      <p className="text-sm text-slate-500">비밀번호 변경, 계정 삭제</p>
                    </div>
                    <Button variant="outline" size="sm">관리</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile; 