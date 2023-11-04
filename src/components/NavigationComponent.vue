<template>
    <nav id="nav-main" class="wrapper-navigation">
        <ol>
            <li v-for="path in paths" :key="path.path">
                <router-link :to="path.path">{{ path.label }}</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            paths: [
                { path: '/', label: 'Songs' },
                { path: '/albums', label: 'Albums' },
                { path: '/about', label: 'About Me' }
            ]
        }
    }
}
</script>
