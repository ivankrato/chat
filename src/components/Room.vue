<template>
    <div class="room d-flex align-items-end flex-column h-100">
        <div class="messages w-100">
            <h3>{{ room.name }}</h3>
            <pulse-loader :loading="messages.length === 0"></pulse-loader>
            <p v-for="message in messages">
                {{ message.username }}: {{ message.message }}
            </p>
        </div>
        <div class="pb-3 input-group mt-auto w-100">
            <input class="form-control" v-model="message" placeholder="Type a message" @keydown.enter="sendMessage" />
            <div class="input-group-append">
                <button class="btn btn-primary" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import apiUrl from '../api'

    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: 'room',
        props: ['room', 'username'],
        components: {
            PulseLoader
        },
        data() {
            return {
                messages: [],
                refreshLoop: null,
                message: ''
            }
        },
        methods: {
            async getMessages() {
                // TODO: add only new messages instead and remove "my" messages
                this.messages = (await axios.get(apiUrl + 'rooms/' + this.room.id + '/messages')).data.messages.reverse(); // or sort?
            },
            sendMessage() {
                if(this.message !== '') {
                    axios.post(apiUrl + 'rooms/' + this.room.id + '/messages', {
                        username: this.username,
                        message: this.message
                    });
                    this.messages.push({
                        id: '',
                        username: this.username,
                        message: this.message,
                        createdOn: Date.now()
                    });
                    this.message = '';
                }
            }
        },
        mounted() {
            this.getMessages();
            this.refreshLoop = setInterval(this.getMessages, 2000);
        },
        beforeDestroy() {
            clearInterval(this.refreshLoop);
        }
    }
</script>

<style scobed lang="scss">

</style>
