import { create } from 'zustand';
import { User } from '../types/database';
import { devtools, persist } from 'zustand/middleware';

interface UserStoreState {
    user: User | null;
    setUser: (payload: User) => void;
    removeUser: () => void;
}

const useUserStore = create<UserStoreState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (payload: User) => set(() => ({ user: payload })),
                removeUser: () => set(() => ({ user: null })),
            }),
            {
                name: 'userStore',
            }
        )
    )
);

export default useUserStore;
