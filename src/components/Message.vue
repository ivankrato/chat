<template>
    <div :class="'message alert mr-4 mb-3' + (my ? ' my alert-success' : '') + (loading ? ' loading' : '')">
        <div class="avatar" :style="{backgroundColor: message.color}"><span>{{ getAvatar(message) }}</span></div>
        <div class="username">{{ message.username }}</div>
        {{ getMessage(message) }}
        <PulseLoader v-if="loading"/>
    </div>
</template>

<script>
    import PulseLoader  from 'vue-spinner/src/PulseLoader'

    const runes = require('runes');

    export default {
        name: 'message',
        props: ['message', 'my', 'loading'],
        components: {
            PulseLoader
        },
        methods: {
            getAvatar(message) {
                return runes.substr(message.username, 0, 1);
            },
            getMessage(message) {
                let str = message.message;
                let emojis = {
                    ':D': '😃',
                    ':P': '😛',
                    ':\\)': '🙂',
                    '=\\)': '🙂',
                    ':\\(': '😥',
                    ':\'\\(': '😥'
                };
                for(let emoji in emojis) {
                    if(emojis.hasOwnProperty(emoji)) {
                        str = str.replace(new RegExp('(^|\\s)' + emoji + '($|\\s)'), ' ' + emojis[emoji] + ' ')
                    }
                }
                return str;
            }
        }
    }
</script>

<style scoped lang="scss">
    .message {
        position: relative;
        padding-left: 3.5rem;
        padding-top: 1.5rem;

        .username {
            font-size: 0.8rem;
            position: absolute;
            top: 0.5rem;
            left: 3.5rem;
            color: #aaa;
        }

        .avatar {
            span {
                position: absolute;
                top: calc(50% - 1em);
                line-height: 2em;
                font-size: 2em;
                font-weight: bold;
                color: white;
                display: inline-block;
                width: 100%;
                left: calc(50% - 1.5rem);
            }

            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 3rem;
            display: inline-block;
            text-align: center;
        }

        &.my {
            .avatar {
                left: auto;
                right: 0;
            }

            padding-left: 1.25rem;
            padding-right: 3.5rem;
            padding-top: 0.75rem;

            .username {
                display: none;
            }
        }

        border-color: #ddd;

        &.loading {
            opacity: 0.5;
        }
    }
</style>