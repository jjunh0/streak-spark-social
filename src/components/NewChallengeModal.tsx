import { useState } from "react";
import { X, Plus, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";

interface NewChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewChallengeModal = ({ isOpen, onClose }: NewChallengeModalProps) => {
  const { dispatch } = useApp();
  const [challengeName, setChallengeName] = useState("");
  const [category, setCategory] = useState("");
  const [targetDays, setTargetDays] = useState("30");

  const categories = [
    { value: "운동", label: "운동" },
    { value: "독서", label: "독서" },
    { value: "공부", label: "공부" },
    { value: "명상", label: "명상" },
    { value: "습관", label: "습관" },
    { value: "기타", label: "기타" }
  ];

  const handleSubmit = () => {
    if (!challengeName || !category) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const newChallenge = {
      id: Date.now(),
      name: challengeName,
      streak: 0,
      totalDays: 0,
      badges: [],
      recentPosts: 0,
      category,
      startDate: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' }),
      isActive: true
    };

    dispatch({ type: 'ADD_CHALLENGE', payload: newChallenge });

    // 폼 초기화
    setChallengeName("");
    setCategory("");
    setTargetDays("30");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">새 챌린지 만들기</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <div className="px-6 pb-2 text-xs text-slate-500">
          누구나 챌린지를 만들 수 있습니다. <br />
          챌린지를 개설하면 다른 사람도 참여할 수 있어요!
        </div>
        <CardContent className="space-y-6">
          {/* 챌린지 이름 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">챌린지 이름</label>
            <Input
              placeholder="예: 아침 러닝, 독서 1시간..."
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
            />
          </div>

          {/* 카테고리 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">카테고리</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 목표 일수 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">목표 일수</label>
            <Select value={targetDays} onValueChange={setTargetDays}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7일</SelectItem>
                <SelectItem value="14">14일</SelectItem>
                <SelectItem value="21">21일</SelectItem>
                <SelectItem value="30">30일</SelectItem>
                <SelectItem value="60">60일</SelectItem>
                <SelectItem value="100">100일</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 제출 버튼 */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            disabled={!challengeName || !category}
          >
            <Plus className="w-4 h-4 mr-2" />
            챌린지 생성
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewChallengeModal; 