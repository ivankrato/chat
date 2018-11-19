<template>
    <div>
        <div class="container-fluid">
            <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow fixed-top">
                <span class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">{{ username }}&nbsp;</span>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <a class="nav-link" @click="$refs.usernameModal.show();" href="#">Change name</a>
                    </li>
                </ul>
            </nav>
            <div class="row">
                <nav class="col-md-2 d-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <RoomList :roomList="roomList"/>
                    </div>
                </nav>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 pb-4">
                    <router-view :room="currentRoom" :username="username" />
                </main>
            </div>
        </div>
        <UsernameModal ref="usernameModal" :username="username" @save="saveUsername"/>
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios'
    import apiUrl from './api'

    import RoomList from './components/RoomList'
    import UsernameModal from './components/UsernameModal'

    export default {
        name: 'app',
        computed: {
            currentRoom() {
                return this.roomList.filter(room => {
                    return room.id == this.$route.params.roomId;
                })[0];
            }
        },
        data() {
            return {
                username: '',
                roomList: []
            }
        },
        components: {
            RoomList,
            UsernameModal
        },
        created() {
            this.username = localStorage.getItem('username');
        },
        async mounted() {
            if (!this.username) {
                this.$refs.usernameModal.show();
            }
            this.roomList = (await axios.get(apiUrl + 'rooms')).data.rooms;
        },
        methods: {
            saveUsername(username) {
                this.username = username;
                localStorage.setItem('username', username);
            }
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap';

    body {
        font-size: .875rem;
    }

    .sidebar {
        height: 100vh;
        padding-top: 48px;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);

        .nav-link {
            font-weight: 500;
            color: #333;

            &.active,
            &:hover {
                color: #007bff;
            }
        }
    }

    main {
        height: 100vh;
        padding-top: 60px;
    }

    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, .25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }
</style>
