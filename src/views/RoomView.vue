<template>
    <Room v-if="typeof room !== 'undefined'" :room="room" :username="username" :key="room.id" />
</template>

<script>
    import Room from '../components/Room'

    export default {
        name: 'roomView',
        props: ['room', 'username'],
        components: {
            Room
        },
    }
</script>
