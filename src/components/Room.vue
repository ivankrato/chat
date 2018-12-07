<template>
    <div class="room d-flex flex-column h-100">
        <h3 class="mb-4 text-primary">{{ room.name }}</h3>
        <GridLoader :loading="messages.length === 0" :size="'60px'" color="#009688"></GridLoader>
        <div ref="messages" class="messages d-flex flex-column-reverse flex-grow-1 h-100 mb-3">
            <Message :my="true" :loading="true" v-for="message in myMessages" :message="message">
                {{ message.username }}: {{ message.message }}
                <PulseLoader/>
            </Message>
            <Message v-for="message in messages" :message="message" :my="message.username === username" :mention="isMentioned(message)" @mention="mention(message.username)">
                {{ message.username }}: {{ message.message }}
            </Message>
        </div>
        <div class="chatbox clearfix">
            <input class="form-control" v-model="message" placeholder="Type a message" @keydown.enter="sendMessage"/>
            <Emoji @pick="(emoji) => message += emoji"></Emoji>
            <button class="btn btn-primary" @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import apiUrl from '../api'

    import GridLoader from 'vue-spinner/src/GridLoader'
    import Message from './Message'
    import Emoji from './Emoji';
    import Vue from 'vue';

    let randDarkColor = () => {
        let lum = -0.25;
        let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        let rgb = "#",
            c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    };

    export default {
        name: 'room',
        props: ['room', 'username'],
        components: {
            GridLoader,
            Message,
            Emoji
        },
        data() {
            return {
                messages: [],
                myMessages: [],
                refreshLoop: null,
                removeMyMessages: false,
                message: '',
                messageColors: {}
            }
        },
        methods: {
            async getMessages(append = true) {
                if (append) {
                    try {
                        let newMessages = (await axios.get(apiUrl + 'rooms/' + this.room.id + '/messages')).data.messages;
                        this.createColors(newMessages);
                        this.messages = newMessages;
                    }
                    catch (ex) {
                        console.error(ex);
                        return;
                    }
                } else {
                    try {
                        console.error(ex);
                        this.messages = (await axios.get(apiUrl + 'rooms/' + this.room.id + '/messages')).data.messages;
                        this.createColors(this.messages);
                    }
                    catch (ex) {
                        return;
                    }
                }
                if (this.removeMyMessages) {
                    this.myMessages.length = 0;
                    this.removeMyMessages = false;
                }
            },
            async sendMessage() {
                if (this.message !== '' && this.username !== '') {
                    try {
                        let message = this.message;
                        this.myMessages.unshift({
                            id: '',
                            username: this.username,
                            message: message,
                            createdOn: Date.now()
                        });
                        this.createColors(this.myMessages);
                        this.message = '';
                        await axios.post(apiUrl + 'rooms/' + this.room.id + '/messages', {
                            username: this.username,
                            message: message
                        });
                        this.removeMyMessages = true;
                    }
                    catch (ex) {
                        console.error(ex);
                        if(typeof this.myMessages[0] !== 'undefined') {
                            Vue.set(this.myMessages[0], 'error', true);
                        }
                    }
                }
            },
            scrollToBottom() {
                let messagesEl = this.$refs.messages;
                messagesEl.scrollTop = messagesEl.scrollHeight - messagesEl.clientHeight;
            },
            createColors(messages) {
                for (let message of messages) {
                    if (typeof this.messageColors[message.username] === 'undefined') {
                        this.messageColors[message.username] = randDarkColor();
                    }
                    Vue.set(message, 'color', this.messageColors[message.username]);
                }
            },
            isMentioned(message) {
                if(typeof message.message === 'string') {
                    return message.message.indexOf('@' + this.username) > -1;
                }
                return false;
            },
            mention(username) {
                this.message += '@' + username;
            }
        },
        mounted() {
            this.getMessages(false);
            this.refreshLoop = setInterval(this.getMessages, 2000);
        },
        beforeDestroy() {
            clearInterval(this.refreshLoop);
        }
    }
</script>

<style scoped lang="scss">
    .room {
        position: relative;
    }

    .v-spinner {
        position: absolute;
        top: calc(50% - 95px);
        left: calc(50% - 95px);
    }

    .messages {
        overflow-y: auto;
    }

    .chatbox {
        position: relative;
        input {
            width: calc(100% - 80px);
            float: left;
        }

        .btn {
            width: 70px;
            float: right;
        }
    }
</style>
