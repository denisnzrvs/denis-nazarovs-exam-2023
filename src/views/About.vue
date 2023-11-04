<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <button id="btn-edit" @click="toggleForm">{{ formEditable ? 'Cancel' : 'Edit Form' }}</button>
                <button id="btn-save" v-if="formEditable" @click="saveForm">Save Form</button>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <input id="input-name" v-if="formEditable" v-model="authStore.name" />
                <p id="txt-name" :class="{ disabled: !formEditable }">{{ authStore.name }}</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input id="input-surname" v-if="formEditable" v-model="authStore.surname" />
                <p id="txt-surname">{{ authStore.surname }}</p>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <input id="input-code" v-if="formEditable" v-model="authStore.code" />
                <p id="txt-code">{{ authStore.code }}</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-if="authStore.favorite_songs.length > 0">
                    <li v-for="song in authStore.favorite_songs" :key="song.id">
                        <img id="img-album" :src="song.album.coverUrl" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{ song.name }}</p>
                            <p id="txt-artist" class="song-artists">{{ song.artists.join(', ') }}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty" v-else>NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.js';

export default {
    data() {
        return {
            authStore: useAuthStore().user,
            formEditable: false,
        };
    },
    methods: {
        toggleForm() {
            this.formEditable = !this.formEditable;
        },
        saveForm() {
            useAuthStore().updateUserData(this.authStore.name, this.authStore.surname, this.authStore.code);
            this.formEditable = false;
        },
    },
};
</script>
<style></style>
