import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { state } = useApp();
  const [activeChallengeId, setActiveChallengeId] = useState(state.challenges[0]?.id || 1);
  const navigate = useNavigate();

  const challengeTabs = state.challenges.map((challenge) => (
    <TabsTrigger
      key={challenge.id}
      value={String(challenge.id)}
      className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-medium"
    >
      {challenge.name}
    </TabsTrigger>
  ));

  const posts = state.communityPosts.filter((post) => post.challengeId === activeChallengeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">챌린지별 커뮤니티</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={String(activeChallengeId)} onValueChange={v => setActiveChallengeId(Number(v))}>
              <TabsList className="flex gap-2 bg-slate-100 p-1 rounded-xl mb-6">
                {challengeTabs}
              </TabsList>
              {state.challenges.map((challenge) => (
                <TabsContent key={challenge.id} value={String(challenge.id)}>
                  <div className="space-y-6">
                    {posts.length === 0 && <div className="text-slate-400 text-center py-12">아직 글이 없습니다.</div>}
                    {posts.map((post) => (
                      <Card key={post.id} className="border shadow bg-white/90">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-slate-800">{post.user.name}</div>
                            <div className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleString()}</div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="mb-2 text-slate-700">{post.content}</div>
                          {/* 답변 리스트 */}
                          {post.comments.length > 0 && (
                            <div className="mt-4 border-t pt-3 space-y-3">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-3">
                                  <button className="flex items-center" onClick={() => navigate(`/profile/${comment.user.id}`)}>
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage src={comment.user.avatar} />
                                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                  </button>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <button className="font-medium text-slate-700 hover:underline" onClick={() => navigate(`/profile/${comment.user.id}`)}>{comment.user.name}</button>
                                      {comment.user.streak >= 60 && (
                                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">숙련자</Badge>
                                      )}
                                    </div>
                                    <div className="text-slate-600 text-sm mb-1">{comment.content}</div>
                                    <div className="text-xs text-slate-400">{new Date(comment.createdAt).toLocaleString()}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
