const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [
    {
      id: 1,
      photoUrl:
        "https://images.unsplash.com/photo-1749022812693-84015fc54817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      fullName: "Valera",
      location: { city: "Uzhgorod", country: "Ukrain" },
      status: "I am a boss",
      folowedBy: [],
      followed: false,
    },
    {
      id: 2,
      photoUrl:
        "https://images.unsplash.com/photo-1749022812693-84015fc54817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      fullName: "Zhenya",
      location: { city: "Kiev", country: "Ukrain" },
      status: "I am a boss",
      folowedBy: [],
      followed: false,
    },
    {
      id: 3,
      photoUrl:
        "https://images.unsplash.com/photo-1749022812693-84015fc54817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      fullName: "Misha",
      location: { city: "Lviv", country: "Ukrain" },
      status: "I am a boss",
      folowedBy: [],
      followed: true,
    },
    {
      id: 4,
      photoUrl:
        "https://images.unsplash.com/photo-1749022812693-84015fc54817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      fullName: "Masha",
      location: { city: "Odessa", country: "Ukrain" },
      status: "I am a boss",
      folowedBy: [],
      followed: true,
    },
  ],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };

    case SET_USERS: {
      return { ...state, users: [...state.users, ...action.users] };
    }
    default:
      return state;
  }
};

export const FollowAC = (userId) => ({ type: FOLLOW, userId });
export const UnfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, userId });
