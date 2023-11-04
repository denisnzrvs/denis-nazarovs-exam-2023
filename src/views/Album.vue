<template>
    <div id="album-view">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" @click="activateGridLayout">
                    <IconGrid />
                </button>
                <button id="btn-list" @click="activateListLayout">
                    <IconList />
                </button>
            </div>
        </div>
        <ul id="list-albums" :class="{ grid: isGridLayoutActive }">
            <li class="album" v-for="album in groupedAlbums" :key="album.id" @click="selectAlbum(album)">
                <img id="img-album" :src="album.coverUrl" />
                <div class="album-info">
                    <h4 id="txt-album-name">{{ album.name }}</h4>
                    <p id="txt-album-artists">{{ album.artists }}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{ getReleaseYear(album.releaseDate) }}</p>
                        <p id="txt-album-tracks">{{ getTrackCount(album.trackCount) }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

import IconGrid from '../components/icons/IconGrid.vue'
import IconList from '../components/icons/IconList.vue';
import songsJSON from '../data/songs';

export default {
    data() {
        return {
            isGridLayoutActive: true,
            albums: [
            ],
            currentlyPlayingSong: null,
        };
    },
    computed: {
        groupedAlbums() {
            // Group albums based on your logic
            return this.albums;
        },
    },
    methods: {
        activateGridLayout() {
            this.isGridLayoutActive = true;
        },
        activateListLayout() {
            this.isGridLayoutActive = false;
        },
        selectAlbum(album) {
            // Handle album selection
        },
        getReleaseYear(date) {
            // Extract and format the release year
            return date ? new Date(date).getFullYear() : '';
        },
        getTrackCount(count) {
            return `${count} song${count !== 1 ? 's' : ''}`;
        },
    },
    components: {
        IconGrid,
        IconList,
    },
};
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
}

#btn-grid,
#btn-list {
    color: white;
}

/* Add your other CSS styles here */
</style>
