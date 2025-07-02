import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 타입 정의
interface User {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  totalDays: number;
  badges: string[];
}

interface Routine {
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
  isLiked?: boolean;
}

interface Challenge {
  id: number;
  name: string;
  streak: number;
  totalDays: number;
  badges: string[];
  recentPosts: number;
  category: string;
  startDate: string;
  isActive: boolean;
}

// 커뮤니티 게시글 타입 (챌린지별)
export interface CommunityPost {
  id: number;
  user: User;
  content: string;
  image?: string;
  createdAt: string;
  comments: CommunityComment[];
  challengeId: number; // 챌린지별 게시판 구분
}

export interface CommunityComment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

interface AppState {
  user: User;
  routines: Routine[];
  challenges: Challenge[];
  streakData: { [date: string]: boolean };
  communityPosts: CommunityPost[];
}

type AppAction =
  | { type: 'ADD_ROUTINE'; payload: Routine }
  | { type: 'TOGGLE_LIKE'; payload: { routineId: number; userId: string } }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'UPDATE_STREAK'; payload: { date: string; completed: boolean } }
  | { type: 'ADD_BADGE'; payload: string }
  | { type: 'UPDATE_USER_STREAK'; payload: number }
  | { type: 'ADD_COMMUNITY_POST'; payload: CommunityPost }
  | { type: 'ADD_COMMUNITY_COMMENT'; payload: { postId: number; comment: CommunityComment } };

// 초기 상태
const initialState: AppState = {
  user: {
    id: '1',
    name: '나의루틴',
    avatar: '/placeholder.svg',
    streak: 12,
    totalDays: 45,
    badges: ['연속 10일', '첫 인증', '주말 챔피언']
  },
  routines: [
    {
      id: 1,
      user: { name: '김운동', avatar: '/placeholder.svg', streak: 15 },
      routine: '아침 러닝',
      image: '/placeholder.svg',
      description: '오늘도 5km 완주! 날씨가 좋아서 기분도 상쾌해요 🏃‍♂️',
      timestamp: '2시간 전',
      likes: 12,
      comments: 3,
      isLiked: false
    },
    {
      id: 2,
      user: { name: '박독서', avatar: '/placeholder.svg', streak: 23 },
      routine: '독서 1시간',
      image: '/placeholder.svg',
      description: '오늘은 \'원칙\'을 읽었어요. 정말 도움이 되는 내용들이 많네요 📚',
      timestamp: '4시간 전',
      likes: 8,
      comments: 5,
      isLiked: false
    },
    {
      id: 3,
      user: { name: '이명상', avatar: '/placeholder.svg', streak: 7 },
      routine: '명상 20분',
      image: '/placeholder.svg',
      description: '마음이 차분해지는 시간. 오늘 하루도 감사합니다 🧘‍♀️',
      timestamp: '6시간 전',
      likes: 15,
      comments: 2,
      isLiked: false
    }
  ],
  challenges: [
    {
      id: 1,
      name: '아침 러닝',
      streak: 12,
      totalDays: 45,
      badges: ['연속 10일', '첫 인증'],
      recentPosts: 5,
      category: '운동',
      startDate: '2024년 5월',
      isActive: true
    },
    {
      id: 2,
      name: '독서 1시간',
      streak: 23,
      totalDays: 67,
      badges: ['연속 20일', '독서왕', '주말 챔피언'],
      recentPosts: 8,
      category: '독서',
      startDate: '2024년 4월',
      isActive: true
    },
    {
      id: 3,
      name: '명상 20분',
      streak: 7,
      totalDays: 28,
      badges: ['첫 인증'],
      recentPosts: 3,
      category: '명상',
      startDate: '2024년 6월',
      isActive: true
    }
  ],
  streakData: {},
  communityPosts: [
    {
      id: 1,
      user: {
        id: '2',
        name: '김커뮤니티',
        avatar: '/placeholder.svg',
        streak: 5,
        totalDays: 20,
        badges: []
      },
      content: '안녕하세요! 오늘도 모두 화이팅입니다! ☀️',
      createdAt: '2024-06-01T09:00:00',
      comments: [
        {
          id: 1,
          user: {
            id: '3',
            name: '박댓글',
            avatar: '/placeholder.svg',
            streak: 2,
            totalDays: 10,
            badges: []
          },
          content: '응원합니다! 💪',
          createdAt: '2024-06-01T10:00:00'
        }
      ],
      challengeId: 1
    }
  ]
};

// 리듀서
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_ROUTINE':
      return {
        ...state,
        routines: [action.payload, ...state.routines]
      };
    
    case 'TOGGLE_LIKE':
      return {
        ...state,
        routines: state.routines.map(routine => {
          if (routine.id === action.payload.routineId) {
            const isLiked = !routine.isLiked;
            return {
              ...routine,
              isLiked,
              likes: isLiked ? routine.likes + 1 : routine.likes - 1
            };
          }
          return routine;
        })
      };
    
    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload]
      };
    
    case 'UPDATE_STREAK':
      return {
        ...state,
        streakData: {
          ...state.streakData,
          [action.payload.date]: action.payload.completed
        }
      };
    
    case 'ADD_BADGE':
      return {
        ...state,
        user: {
          ...state.user,
          badges: [...state.user.badges, action.payload]
        }
      };
    
    case 'UPDATE_USER_STREAK':
      return {
        ...state,
        user: {
          ...state.user,
          streak: action.payload,
          totalDays: state.user.totalDays + 1
        }
      };
    case 'ADD_COMMUNITY_POST':
      return {
        ...state,
        communityPosts: [action.payload, ...state.communityPosts]
      };
    case 'ADD_COMMUNITY_COMMENT':
      return {
        ...state,
        communityPosts: state.communityPosts.map(post =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        )
      };
    default:
      return state;
  }
}

// Context 생성
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Provider 컴포넌트
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 