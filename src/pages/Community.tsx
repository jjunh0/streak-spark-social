import { useState } from "react";
import { Users, MessageCircle, Send, X, Plus, Image as ImageIcon, Calendar, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useApp, CommunityPost } from "@/contexts/AppContext";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

const Community = () => {
  const { state, dispatch } = useApp();
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  const [showWrite, setShowWrite] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [comment, setComment] = useState("");

  // 챌린지 목록
  const challenges = state.challenges;
  const selectedChallenge = challenges.find(c => c.id === selectedChallengeId);

  // 챌린지별 게시글
  const posts = selectedChallengeId
    ? state.communityPosts.filter(post => post.challengeId === selectedChallengeId)
    : [];

  // 글 작성
  const handlePost = () => {
    if (!content.trim() || !selectedChallengeId) return;
    dispatch({
      type: "ADD_COMMUNITY_POST",
      payload: {
        id: Date.now(),
        user: state.user,
        content,
        image,
        createdAt: new Date().toISOString(),
        comments: [],
        challengeId: selectedChallengeId
      }
    });
    setContent("");
    setImage(undefined);
    setShowWrite(false);
  };

  // 댓글 작성
  const handleComment = () => {
    if (!comment.trim() || !selectedPost) return;
    dispatch({
      type: "ADD_COMMUNITY_COMMENT",
      payload: {
        postId: selectedPost.id,
        comment: {
          id: Date.now(),
          user: state.user,
          content: comment,
          createdAt: new Date().toISOString()
        }
      }
    });
    setComment("");
  };

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 상세보기에서 댓글 실시간 반영
  const currentPost = selectedPost
    ? state.communityPosts.find(p => p.id === selectedPost.id) || selectedPost
    : null;

  // 챌린지별 자유게시판 뷰
  if (selectedChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-24">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" className="mb-4" onClick={() => setSelectedChallengeId(null)}>
            <ChevronLeft className="w-4 h-4 mr-1" /> 챌린지 목록으로
          </Button>
          <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                  {selectedChallenge.name}
                </CardTitle>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
                    {selectedChallenge.category}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                    🔥 {selectedChallenge.streak}일
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-slate-600 text-sm">{selectedChallenge.totalDays}일 동안 {selectedChallenge.recentPosts}회 인증</div>
            </CardContent>
          </Card>

          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-indigo-600" />
              {selectedChallenge.name} 커뮤니티
            </h2>
            <Button onClick={() => setShowWrite(true)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> 글쓰기
            </Button>
          </div>

          {/* 글쓰기 모달 */}
          {showWrite && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-xl font-bold">새 글 작성</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowWrite(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="자유롭게 글을 남겨보세요!"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={5}
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer text-indigo-600">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-xs">사진 첨부</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    {image && (
                      <img src={image} alt="첨부 이미지" className="w-16 h-16 object-cover rounded-lg border ml-2" />
                    )}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white" onClick={handlePost} disabled={!content.trim()}>
                    등록
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 게시글 상세보기 */}
          {currentPost && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-xl font-bold">게시글</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentPost.user.avatar} />
                      <AvatarFallback>{currentPost.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-800">{currentPost.user.name}</div>
                      <div className="text-xs text-slate-500">{formatDate(currentPost.createdAt)}</div>
                    </div>
                  </div>
                  <div className="text-slate-800 whitespace-pre-line mb-2">{currentPost.content}</div>
                  {currentPost.image && (
                    <img src={currentPost.image} alt="첨부 이미지" className="w-full max-h-64 object-cover rounded-lg border mb-2" />
                  )}
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-700 mb-2 flex items-center"><MessageCircle className="w-4 h-4 mr-1" /> 댓글</div>
                    <div className="space-y-3 mb-3">
                      {currentPost.comments.length > 0 ? currentPost.comments.map(c => (
                        <div key={c.id} className="flex items-center gap-2">
                          <Avatar className="w-7 h-7">
                            <AvatarImage src={c.user.avatar} />
                            <AvatarFallback>{c.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="bg-slate-100 rounded-lg px-3 py-2 flex-1">
                            <div className="text-xs font-bold text-slate-700">{c.user.name}</div>
                            <div className="text-xs text-slate-600 whitespace-pre-line">{c.content}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{formatDate(c.createdAt)}</div>
                          </div>
                        </div>
                      )) : <div className="text-slate-400 text-sm">아직 댓글이 없습니다.</div>}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="댓글을 입력하세요"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleComment(); }}
                      />
                      <Button onClick={handleComment} disabled={!comment.trim()}><Send className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 게시글 리스트 */}
          <div className="space-y-6">
            {posts.length > 0 ? posts.map(post => (
              <Card key={post.id} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedPost(post)}>
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-800">{post.user.name}</div>
                      <div className="text-xs text-slate-500">{formatDate(post.createdAt)}</div>
                    </div>
                  </div>
                  <div className="text-slate-800 whitespace-pre-line mb-2 line-clamp-3">{post.content}</div>
                  {post.image && (
                    <img src={post.image} alt="첨부 이미지" className="w-full max-h-48 object-cover rounded-lg border mb-2" />
                  )}
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <MessageCircle className="w-4 h-4 mr-1" /> {post.comments.length} 댓글
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">아직 게시글이 없습니다</h3>
                  <p className="text-slate-500">첫 글을 남겨보세요!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 챌린지 목록 뷰
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center">
            <Users className="w-8 h-8 mr-3 text-indigo-600" />
            챌린지별 커뮤니티
          </h1>
          <p className="text-slate-600">관심있는 챌린지를 선택해 자유게시판을 이용해보세요</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {challenges.length > 0 ? challenges.map(challenge => (
            <Card key={challenge.id} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedChallengeId(challenge.id)}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    {challenge.name}
                  </CardTitle>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
                      {challenge.category}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                      🔥 {challenge.streak}일
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-slate-600 text-sm">{challenge.totalDays}일 동안 {challenge.recentPosts}회 인증</div>
              </CardContent>
            </Card>
          )) : (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">등록된 챌린지가 없습니다</h3>
                <p className="text-slate-500">새로운 챌린지를 생성해보세요!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community; 