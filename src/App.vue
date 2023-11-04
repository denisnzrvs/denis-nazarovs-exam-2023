<template>
    <!--  HEADER  -->
    <Header v-show="isLoggedIn"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <NavigationComponent v-show="isLoggedIn" />
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player" v-show="isLoggedIn">
        <AudioPlayer />
    </div>
    <!--  PLAYER END  -->
</template>

<script>
import NavigationComponent from './components/NavigationComponent.vue';
import { useAuthStore } from './stores/auth';

export default {
    setup() {
        const authStore = useAuthStore();
        return {
            isLoggedIn: authStore.is_authenticated
        }
    },
    components: {
        NavigationComponent
    }
}
</script>
