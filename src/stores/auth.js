import { defineStore } from 'pinia';
import router from '../router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            name: "NAME",
            surname: "SURNAME",
            code: "IT1234",
            favorite_songs: [],
        },
        authenticated: false,
    }),
    getters: {
        is_authenticated() {
            const isAuthenticated = localStorage.getItem('is_authenticated');
            if (isAuthenticated === null) {
                return this.authenticated;
            }
            return isAuthenticated;
        },
        getFavoriteSongs() {
            return this.user.favorite_songs;
        }
    },
    actions: {
        setUserData(name, surname, code) {
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;
        },
        authenticate(email, password) {
            if (email === 'denis.nazarovs@va.lv' && password === '123456') {
                this.authenticated = true;
                localStorage.setItem('is_authenticated', 'true');
                router.push('/');
            } else {
                this.authenticated = false;
                localStorage.removeItem('is_authenticated');
            }
        },
        logout() {
            localStorage.clear();
            this.authenticated = false;
            router.push('/login');
        },
        toggleFavorite(songID) {
            if (!this.user.favorite_songs.includes(songID)) {
                this.user.favorite_songs.push(songID);
            } else {
                const index = this.user.favorite_songs.indexOf(songID);
                if (index !== -1) {
                    this.user.favorite_songs.splice(index, 1);
                }
            }
        },
        updateUserData(name, surname, code) {
            this.setUserData(name, surname, code);
        },
        updateFavoriteSongs(favoriteSongs) {
            this.user.favorite_songs = favoriteSongs;
        },
    },
});
