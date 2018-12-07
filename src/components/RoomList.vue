<template>
    <div class="room-list">
        <pulse-loader :loading="roomList.length === 0" color="#009688"></pulse-loader>
        <ul class="nav flex-column pt-2">
            <li class="nav-item" v-for="room in roomList">
                <router-link
                        :class="'nav-link ' + ($route.params.roomId == room.id ? 'active' : '')"
                        :to="'/' + room.id"
                        :key="room.id"
                >
                    {{ room.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        props: ['roomList'],
        name: 'roomList',
        components: {
            PulseLoader
        }
    }
</script>

<style lang="scss" scoped>
    .v-spinner {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 29px);
    }
</style>