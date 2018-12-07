<template>
    <div>
        <div class="container-fluid">
            <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow fixed-top">
                <span class="navbar-brand col-xl-2 col-md-3 col-sm-4 col-6 mr-0" href="#"><span class="username">{{ username }}&nbsp;</span></span>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <a class="nav-link" @click="$refs.usernameModal.show();" href="#">Change name</a>
                    </li>
                </ul>
            </nav>
            <input ref="navTrigger" class="nav-trigger d-none" type="checkbox" id="nav-trigger" />
            <label for="nav-trigger" class="d-sm-block d-md-none">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <div class="row">
                <nav class=" col-lg-2 col-md-3 col-sm-4 d-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <RoomList :roomList="roomList"/>
                    </div>
                </nav>

                <main role="main" class="col-sm-8 col-md-9 ml-sm-auto col-lg-10 px-4 pb-4">
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
            },
            roomId() {
                return this.$route.params.roomId;
            }
        },
        watch: {
            roomId() {
                this.$refs.navTrigger.checked = false
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
    $theme-colors: (
        "primary": #009688,
        "dark": #35a79c,
        "success": #83d0c9
    );
    $border-radius: 0;
    $border-radius-lg: 0;
    $border-radius-sm: 0;

    @import '~bootstrap/scss/bootstrap';


    body {
        font-size: .875rem;
    }

    .sidebar {
        position: relative;
        height: 100vh;
        padding-top: 53px;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);

        .nav-link {
            font-weight: 500;
            color: #333;

            &.active,
            &:hover {
                color: map-get($theme-colors, primary);
            }
        }

        @media(max-width: map-get($container-max-widths, sm)) {
            height: auto;
            position: fixed;
            top: 0;
            left: 0;
            border-bottom: 1px solid #eee;
            background: white;
            z-index: 2;
        }
    }

    @media(max-width: map-get($container-max-widths, sm)) {
        .nav-trigger {

            +label {
                font-size: 20px;
                position: absolute;
                color: white;
                top: 16px;
                right: calc(50% + 15px);
                z-index: 1031;

                + .row {
                    .sidebar {
                        display: none !important;
                    }
                }

                span {
                    display: block;
                    width: 33px;
                    height: 4px;
                    margin-bottom: 5px;
                    position: relative;

                    background: #cdcdcd;
                    border-radius: 3px;

                    z-index: 1;

                    transform-origin: 4px 0px;

                    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;

                    &:nth-last-child(1)
                    {
                        transform-origin: 0% 100%;
                    }
                }
            }

            &:checked {
                +label {
                    display: block;

                    +.row .sidebar {
                        display: block !important;
                    }

                    span {
                        opacity: 1;
                        transform: rotate(45deg) translate(-2px, -1px);
                        background: #eee;

                        &:nth-last-child(2)
                        {
                            opacity: 0;
                            transform: rotate(0deg) scale(0.2, 0.2);
                        }

                        &:nth-last-child(1)
                        {
                            transform: rotate(-45deg) translate(0, -1px);
                        }
                    }
                }
            }
        }
    }

    main {
        height: 100vh;
        padding-top: 70px;
    }

    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, .25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }

    .username {
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
</style>
