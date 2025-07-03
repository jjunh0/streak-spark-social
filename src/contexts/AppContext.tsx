import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 타입 정의
interface User {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  totalDays: number;
  badges: string[];
  followers: string[]; // 팔로워: 나를 팔로우하는 유저 id 목록
  following: string[]; // 팔로잉: 내가 팔로우하는 유저 id 목록
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
    badges: ['연속 10일', '첫 인증', '주말 챔피언'],
    followers: ['2', '3'], // 예시
    following: ['2'], // 예시
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
    },
    {
      id: 4,
      name: '플랭크 1분',
      streak: 0,
      totalDays: 0,
      badges: [],
      recentPosts: 2,
      category: '운동',
      startDate: '2024년 6월',
      isActive: true
    },
    {
      id: 5,
      name: '영어 단어 암기',
      streak: 0,
      totalDays: 0,
      badges: [],
      recentPosts: 1,
      category: '학습',
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
        badges: [],
        followers: [],
        following: []
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
            badges: [],
            followers: [],
            following: []
          },
          content: '응원합니다! 💪',
          createdAt: '2024-06-01T10:00:00'
        }
      ],
      challengeId: 1
    },
    // 아침 러닝 챌린지 Q&A
    {
      id: 2,
      user: {
        id: '4',
        name: '러닝초보',
        avatar: '/placeholder.svg',
        streak: 3,
        totalDays: 7,
        badges: [],
        followers: [],
        following: []
      },
      content: '아침 러닝할 때 준비운동은 꼭 해야 하나요?',
      createdAt: '2024-06-02T08:00:00',
      comments: [
        {
          id: 2,
          user: {
            id: '10',
            name: '러닝숙련자',
            avatar: '/placeholder.svg',
            streak: 120,
            totalDays: 200,
            badges: ['연속 100일', '러닝 마스터'],
            followers: ['1', '2'],
            following: ['1'],
          },
          content: '네! 준비운동은 부상 방지에 꼭 필요해요. 5~10분 정도 가볍게 스트레칭을 추천합니다.',
          createdAt: '2024-06-02T09:00:00'
        }
      ],
      challengeId: 1
    },
    // 독서 1시간 챌린지 Q&A
    {
      id: 3,
      user: {
        id: '5',
        name: '책초보',
        avatar: '/placeholder.svg',
        streak: 1,
        totalDays: 1,
        badges: [],
        followers: [],
        following: []
      },
      content: '책을 오래 집중해서 읽는 팁이 있을까요?',
      createdAt: '2024-06-03T10:00:00',
      comments: [
        {
          id: 3,
          user: {
            id: '11',
            name: '독서숙련자',
            avatar: '/placeholder.svg',
            streak: 90,
            totalDays: 150,
            badges: ['연속 50일', '독서왕'],
            followers: ['1'],
            following: ['2'],
          },
          content: '30분 단위로 쉬면서 읽으면 집중력이 오래갑니다. 메모하면서 읽는 것도 추천해요!',
          createdAt: '2024-06-03T11:00:00'
        }
      ],
      challengeId: 2
    },
    // 명상 20분 챌린지 Q&A
    {
      id: 4,
      user: {
        id: '6',
        name: '명상입문',
        avatar: '/placeholder.svg',
        streak: 2,
        totalDays: 2,
        badges: [],
        followers: [],
        following: []
      },
      content: '명상할 때 잡생각이 너무 많아요. 어떻게 해야 하나요?',
      createdAt: '2024-06-04T07:00:00',
      comments: [
        {
          id: 4,
          user: {
            id: '12',
            name: '명상숙련자',
            avatar: '/placeholder.svg',
            streak: 80,
            totalDays: 120,
            badges: ['명상 마스터'],
            followers: [],
            following: [],
          },
          content: '자연스럽게 생각이 떠오르는 걸 인정하고, 호흡에 집중해보세요. 점점 나아집니다!',
          createdAt: '2024-06-04T08:00:00'
        }
      ],
      challengeId: 3
    },
    // 러닝화 추천 Q&A
    {
      id: 5,
      user: {
        id: '7',
        name: '러닝질문러',
        avatar: '/placeholder.svg',
        streak: 2,
        totalDays: 3,
        badges: [],
        followers: [],
        following: []
      },
      content: '러닝화 추천해 주세요!',
      createdAt: '2024-06-05T07:30:00',
      comments: [
        {
          id: 5,
          user: {
            id: '10',
            name: '러닝숙련자',
            avatar: '/placeholder.svg',
            streak: 120,
            totalDays: 200,
            badges: ['연속 100일', '러닝 마스터'],
            followers: ['1', '2'],
            following: ['1'],
          },
          content: '러닝화는 본인 발에 맞는 걸 신는 게 제일 좋아요! 나이키, 아식스, 뉴발란스 등 인기 브랜드에서 선택해 보세요.',
          createdAt: '2024-06-05T08:00:00'
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