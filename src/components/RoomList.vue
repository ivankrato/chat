<template>
    <ul class="nav flex-column">
        <li class="nav-item" v-for="room in roomList">
            <router-link
                    :class="'nav-link ' + ($route.params.roomId == room.id ? 'active' : '')"
                    :to="'/' + room.id"
                    :key="room.id">
                {{ room.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
    import axios from 'axios'
    import apiUrl from '../api'

    export default {
        name: 'roomList',
        data() {
            return {
                roomList: [
                    {
                        "id": 1,
                        "name": "Dobro"
                    },
                    {
                        "id": 2,
                        "name": "Zlo"
                    }
                ]
            }
        },
        async mounted() {
            //this.roomList = (await axios.get(apiUrl + 'rooms')).rooms;
        }
    }
</script>