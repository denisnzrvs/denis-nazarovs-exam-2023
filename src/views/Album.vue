<template>
    <div id="album-view">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" @click="switchLayout('grid')">IconGrid</button>
                <button id="btn-list" @click="switchLayout('list')">IconList</button>
            </div>
        </div>
        <ul :class="{ 'grid': isGridLayout, 'list': !isGridLayout }" id="list-albums">
            <li v-for="(album, index) in albums" :key="index" class="album" @click="selectAlbum(album)"
                :class="{ 'active': album.id === currentlyPlayingAlbumId }">
                <img id="img-album" :src="album.cover" />
                <div class="album-info">
                    <h4 id="txt-album-name">{{ album.name }}</h4>
                    <p id="txt-album-artists">{{ album.artist }}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{ getYear(album.release_year) }}</p>
                        <p id="txt-album-tracks">{{ album.songs.length > 1 ? album.songs.length + ' songs' : '1 song' }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import songs from '../data/songs.js'; // Import your data
import { usePlayerStore } from '../stores/player';

export default {
    data() {
        return {
            isGridLayout: true,
            albums: [],
            currentlyPlayingAlbumId: null,
        };
    },
    created() {
        // Group songs into albums (you need to define the grouping logic)
        this.albums = this.groupIntoAlbums(songs);
    },
    methods: {
        getYear(date) {
            return date.split('-')[0];
        },
        switchLayout(layout) {
            this.isGridLayout = layout === 'grid';
        },
        selectAlbum(album) {
            usePlayerStore().setPlaylist(album.songs);
            usePlayerStore().setNowPlaying(album.songs[0]);
        },
        getArtists(albumArtists) {
            return albumArtists.map((artist) => artist.name).join(', ');
        },
        // You need to define the grouping logic for albums here
        groupIntoAlbums(songs) {
            const albumMap = new Map();

            songs.forEach((song) => {
                const albumId = song.album.id;

                if (!albumMap.has(albumId)) {
                    albumMap.set(albumId, {
                        id: albumId,
                        name: song.album.name,
                        songs: [song],
                        artist: this.getArtists(song.album.artists),
                        release_year: this.getYear(song.album.release_date),
                        cover: song.album.images[0].url,
                    });
                } else {
                    albumMap.get(albumId).songs.push(song);
                }
            });
            return Array.from(albumMap.values());
        },
    },
};
</script>

<style>
/* Add your CSS styles here */
</style>
