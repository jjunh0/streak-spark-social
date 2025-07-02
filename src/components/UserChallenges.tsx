import { useState } from "react";
import { Trophy, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeRoutineCard from "./ChallengeRoutineCard";
import NewChallengeModal from "./NewChallengeModal";
import { useApp } from "@/contexts/AppContext";

const UserChallenges = () => {
  const { state } = useApp();
  const [isNewChallengeModalOpen, setIsNewChallengeModalOpen] = useState(false);

  const activeChallenges = state.challenges.filter(c => c.isActive);
  const completedChallenges = state.challenges.filter(c => c.totalDays >= 30);

  return (
    <>
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-800">내 챌린지</span>
            </CardTitle>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 rounded-xl px-4"
              onClick={() => setIsNewChallengeModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              새 챌린지
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger 
                value="active" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
              >
                진행중 ({activeChallenges.length})
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
              >
                완료 ({completedChallenges.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-6 mt-6">
              {activeChallenges.length > 0 ? (
                activeChallenges.map((challenge) => (
                  <ChallengeRoutineCard key={challenge.id} routine={challenge} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium mb-2">진행 중인 챌린지가 없어요.</p>
                  <p className="text-sm text-slate-500">새로운 루틴을 시작해보세요!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-6 mt-6">
              {completedChallenges.length > 0 ? (
                completedChallenges.map((challenge) => (
                  <ChallengeRoutineCard key={challenge.id} routine={challenge} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium mb-2">완료된 챌린지가 없어요.</p>
                  <p className="text-sm text-slate-500">첫 번째 챌린지를 완료해보세요!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <NewChallengeModal 
        isOpen={isNewChallengeModalOpen}
        onClose={() => setIsNewChallengeModalOpen(false)}
      />
    </>
  );
};

export default UserChallenges;
