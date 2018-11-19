<template>
    <div :class="'message alert mr-4 mb-3' + (my ? ' my alert-success' : '') + (loading ? ' loading' : '')">
        {{ message.username }}: {{ message.message }}
        <PulseLoader v-if="loading"/>
    </div>
</template>

<script>
    import PulseLoader  from 'vue-spinner/src/PulseLoader'

    export default {
        name: 'message',
        props: ['message', 'my', 'loading'],
        components: {
            PulseLoader
        },
    }
</script>

<style scoped lang="scss">
    .message {
        border-color: #ddd;

        &.loading {
            opacity: 0.5;
        }
    }
</style>