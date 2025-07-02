import { useState, useRef } from "react";
import { X, Camera, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal = ({ isOpen, onClose }: CertificationModalProps) => {
  const { state, dispatch } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [routineName, setRoutineName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage || !description || !selectedChallenge) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const newRoutine = {
      id: Date.now(),
      user: {
        name: state.user.name,
        avatar: state.user.avatar,
        streak: state.user.streak
      },
      routine: routineName || selectedChallenge,
      image: selectedImage,
      description,
      timestamp: "방금 전",
      likes: 0,
      comments: 0,
      isLiked: false
    };

    dispatch({ type: 'ADD_ROUTINE', payload: newRoutine });
    
    // 스트릭 업데이트
    const today = new Date().toISOString().split('T')[0];
    dispatch({ type: 'UPDATE_STREAK', payload: { date: today, completed: true } });
    dispatch({ type: 'UPDATE_USER_STREAK', payload: state.user.streak + 1 });

    // 뱃지 체크
    if (state.user.streak + 1 === 10) {
      dispatch({ type: 'ADD_BADGE', payload: '연속 10일' });
    }

    // 폼 초기화
    setSelectedImage(null);
    setDescription("");
    setSelectedChallenge("");
    setRoutineName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">루틴 인증하기</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 이미지 업로드 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">인증 사진</label>
            <div 
              className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <div className="space-y-2">
                  <img 
                    src={selectedImage} 
                    alt="업로드된 이미지" 
                    className="w-full h-48 object-cover rounded-lg mx-auto"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    다시 선택
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-sm text-slate-500">클릭하여 사진을 선택하세요</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* 챌린지 선택 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">챌린지 선택</label>
            <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
              <SelectTrigger>
                <SelectValue placeholder="챌린지를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {state.challenges.filter(c => c.isActive).map((challenge) => (
                  <SelectItem key={challenge.id} value={challenge.name}>
                    {challenge.name} (🔥 {challenge.streak}일)
                  </SelectItem>
                ))}
                <SelectItem value="new">새 챌린지 만들기</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 새 챌린지 이름 (새 챌린지 선택 시) */}
          {selectedChallenge === "new" && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">새 챌린지 이름</label>
              <Input
                placeholder="예: 아침 러닝, 독서 1시간..."
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
              />
            </div>
          )}

          {/* 설명 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">오늘의 기록</label>
            <Textarea
              placeholder="오늘 루틴을 완료한 소감을 적어보세요..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* 제출 버튼 */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            disabled={!selectedImage || !description || !selectedChallenge}
          >
            <Upload className="w-4 h-4 mr-2" />
            인증 완료
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationModal; 