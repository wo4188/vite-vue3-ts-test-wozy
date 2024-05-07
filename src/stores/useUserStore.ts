import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export type UserState = {
    id: string;
    [key: string]: any;
};

const USER_STORE = 'USER_STORE';

export const useUserStore = defineStore(USER_STORE, () => {
    const token = useLocalStorage('refresh-token', '');

    const state = useLocalStorage<UserState>(
        'user-store-state', //
        {
            id: '',
        }
    );

    const setUserState = (data: UserState) => {
        state.value = data;
    };

    const reset = () => {
        token.value = '';
        state.value = {
            id: '',
        };
    };

    return {
        token,
        state: readonly(state),
        setUserState,
        reset,
    };
});
