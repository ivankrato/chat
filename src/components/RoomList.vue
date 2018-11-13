<template>
    <div>
        <pulse-loader :loading="roomList.length === 0"></pulse-loader>
        <ul class="nav flex-column">
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
        },
        data() {
            return {}
        }
    }
</script>