
import { useState } from "react";
import { Trophy, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeRoutineCard from "./ChallengeRoutineCard";

const UserChallenges = () => {
  const mockChallenges = [
    {
      id: 1,
      name: "아침 러닝",
      streak: 12,
      totalDays: 45,
      badges: ["연속 10일", "첫 인증"],
      recentPosts: 5,
      category: "운동",
      startDate: "2024년 5월"
    },
    {
      id: 2,
      name: "독서 1시간",
      streak: 23,
      totalDays: 67,
      badges: ["연속 20일", "독서왕", "주말 챔피언"],
      recentPosts: 8,
      category: "독서",
      startDate: "2024년 4월"
    },
    {
      id: 3,
      name: "명상 20분",
      streak: 7,
      totalDays: 28,
      badges: ["첫 인증"],
      recentPosts: 3,
      category: "명상",
      startDate: "2024년 6월"
    }
  ];

  const activeChallenges = mockChallenges.filter(c => c.streak > 0);
  const completedChallenges = mockChallenges.filter(c => c.totalDays >= 30);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>내 챌린지</span>
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            새 챌린지
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">진행중 ({activeChallenges.length})</TabsTrigger>
            <TabsTrigger value="completed">완료 ({completedChallenges.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            {activeChallenges.length > 0 ? (
              activeChallenges.map((challenge) => (
                <ChallengeRoutineCard key={challenge.id} routine={challenge} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>진행 중인 챌린지가 없어요.</p>
                <p className="text-sm">새로운 루틴을 시작해보세요!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-4">
            {completedChallenges.length > 0 ? (
              completedChallenges.map((challenge) => (
                <ChallengeRoutineCard key={challenge.id} routine={challenge} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>완료된 챌린지가 없어요.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserChallenges;
