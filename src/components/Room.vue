<template>
    <div class="room d-flex flex-column h-100">
        <h3 class="mb-4">{{ room.name }}</h3>
        <GridLoader :loading="messages.length === 0" :size="'100px'"></GridLoader>
        <div ref="messages" class="messages d-flex flex-column-reverse flex-grow-1 h-100">
            <Message :my="true" :loading="true" v-for="message in myMessages" :message="message">
                {{ message.username }}: {{ message.message }}
                <PulseLoader/>
            </Message>
            <Message v-for="message in messages" :message="message" :my="message.username === username">
                {{ message.username }}: {{ message.message }}
            </Message>
        </div>
        <div class="input-group">
            <input class="form-control" v-model="message" placeholder="Type a message" @keydown.enter="sendMessage"/>
            <div class="input-group-append">
                <button class="btn btn-primary" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import apiUrl from '../api'

    import GridLoader from 'vue-spinner/src/GridLoader'
    import Message from './Message'

    export default {
        name: 'room',
        props: ['room', 'username'],
        components: {
            GridLoader,
            Message
        },
        watch: {
            messages() {
                //this.scrollToBottom();
            }
        },
        data() {
            return {
                messages: [],
                myMessages: [],
                refreshLoop: null,
                removeMyMessages: false,
                message: ''
            }
        },
        methods: {
            async getMessages(append = true) {
                if (append) {
                    this.messages = (await axios.get(apiUrl + 'rooms/' + this.room.id + '/messages', {
                        params: {createdSince: this.messages[0].createdOn}
                    })).data.messages.concat(this.messages);
                } else {
                    this.messages = (await axios.get(apiUrl + 'rooms/' + this.room.id + '/messages')).data.messages;
                }
                if (this.removeMyMessages) {
                    this.myMessages.length = 0;
                    this.removeMyMessages = false;
                }
            },
            sendMessage() {
                if (this.message !== '') {
                    axios.post(apiUrl + 'rooms/' + this.room.id + '/messages', {
                        username: this.username,
                        message: this.message
                    }).then(() => {
                        this.removeMyMessages = true;
                    });
                    this.myMessages.unshift({
                        id: '',
                        username: this.username,
                        message: this.message,
                        createdOn: Date.now()
                    });
                    this.message = '';
                }
            },
            scrollToBottom() {
                let messagesEl = this.$refs.messages;
                messagesEl.scrollTop = messagesEl.scrollHeight - messagesEl.clientHeight;
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
    .messages {
        overflow-y: auto;
    }
</style>
