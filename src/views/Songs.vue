<template>
    <div id="songs-view" class="scrollable-content" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input id="input-search" v-model="searchQuery" placeholder="Search by title..." />
            </div>
            <div class="wrapper-settings">
                <button id="btn-show-favorites" @click="toggleShowFavorites" :class="{ active: showFavorites }">Show
                    Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id">#</th>
                    <th id="th-title" @click="sortBy('name')" :class="{ active: sorting.criteria === 'name' }">Title
                        <IconCaretUp color="white" :class="{ 'flip-vertical': sorting.order === 'desc' }"
                            v-show="sorting.order !== null" />
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th id="th-duration" @click="sortBy('duration_ms')"
                        :class="{ active: sorting.criteria === 'duration_ms' }">Duration
                        <IconCaretUp color="white" :class="{ 'flip-vertical': sorting.order === 'desc' }"
                            v-show="sorting.order !== null" />
                    </th>
                </tr>
                <tr class="song" v-for="( song, index ) in  filteredSongs " :key="song.id" @dblclick="selectSong(song)">
                    <td id="td-index">
                        <IconPlay v-if="song.id == currentlyPlayingId" />
                        <span id="txt-index" v-if="song.id != currentlyPlayingId">{{ index + 1 }}</span>
                    </td>
                    <td id="td-title">
                        <img id="img-album" :src="song.album.images[0].url"  />
                        {{ song.name }}
                    </td>
                    <td id="td-artist">{{ song.album.artists.map(artist => artist.name).join(', ') }}</td>
                    <td id="td-album">{{ song.album.name }}</td>
                    <td id="td-duration">{{ formatDuration(song.duration_ms) }}</td>
                    <td class="centered-cell">
                        <IconHeart @click="toggleFavorite(song.id)" :class="{ 'active-heart': isFavorite(song.id) }" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import songsJS from '../data/songs'
import IconHeart from '../components/icons/IconHeart.vue'
import IconPlay from '../components/icons/IconPlay.vue'
import IconCaretUp from '../components/icons/IconCaretUp.vue'
import { useAuthStore } from '../stores/auth'
import { usePlayerStore } from '../stores/player'

export default {
    data() {
        return {
            searchQuery: '',
            showFavorites: false,
            sorting: {
                criteria: null,
                order: null,
            },
            currentlyPlayingId: null,
            songs: songsJS,
            filteredSongs: null, // Corrected variable name
            favorites: useAuthStore().user.favorite_songs,
        };
    },
    components: {
        IconHeart,
        IconPlay,
        IconCaretUp
    },
    computed: {
        filteredSongs() {
            this.filteredSongs = this.songs.slice(); // Corrected variable name

            // Perform search query filtering
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                this.filteredSongs = this.filteredSongs.filter((song) => {
                    return song.name.toLowerCase().includes(query);
                });
            }

            // Apply favorites filter
            if (this.showFavorites) {
                this.filteredSongs = this.filteredSongs.filter(song => this.isFavorite(song.id));
            }

            return this.filteredSongs; // Corrected variable name
        },
    },
    methods: {
        sortBy(criteria) {
            if (this.sorting.order === null) {
                this.sorting.order = "asc";
            } else if (this.sorting.order === "asc") {
                this.sorting.order = "desc";
            } else {
                this.sorting.order = null;
            }

            // Perform sorting based on the criteria and order
            if (criteria === 'name') {
                this.filteredSongs.sort((a, b) => a.name.localeCompare(b.name));
            } else if (criteria === 'duration_ms') {
                this.filteredSongs.sort((a, b) => a.duration_ms - b.duration_ms);
            }

            if (this.sorting.order === "desc") {
                this.filteredSongs.reverse();
            } else if (this.sorting.order == null) {
                this.filteredSongs = this.songs.slice();
            }

            return this.filteredSongs;
        },

        selectSong(song) {
            usePlayerStore().setNowPlaying(song);
            this.currentlyPlayingId = song.id;
        },
        toggleFavorite(songId) {
            if (this.isFavorite(songId)) {
                this.favorites = this.favorites.filter((id) => id !== songId);
            } else {
                this.favorites.push(songId);
            }
            useAuthStore().updateFavoriteSongs(this.favorites);
        },
        toggleShowFavorites() {
            this.showFavorites = !this.showFavorites;
        },
        isFavorite(songId) {
            return this.favorites.includes(songId);
        },
        formatDuration(durationMs) {
            const minutes = Math.floor(durationMs / 60000);
            const seconds = ((durationMs % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
    },
};
</script>

<style>
IconCaretUp {
    color: white;
}

.active-heart {
    fill: #1db954;
    opacity: 1;
}
</style>