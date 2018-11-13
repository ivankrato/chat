<template>
    <div v-if="visible">
        <div class="modal" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="!username">Choose a name</h5>
                        <h5 class="modal-title" v-if="username">Change name</h5>
                        <button type="button" class="close" @click="hide()" v-if="username">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div v-if="error" class="alert alert-danger">Name cannot be empty!</div>
                            <input ref="usernameInput" required class="form-control" v-model="_username" placeholder="Name"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="save()">Save</button>
                        <button type="button" class="btn btn-secondary" @click="hide()" v-if="username">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
    export default {
        name: 'usernameModal',
        props: ['username'],
        data() {
            return {
                visible: false,
                _username: '',
                error: false
            }
        },
        methods: {
            show() {
                this.visible = true;
            },
            hide() {
                this._username = this.username;
                this.visible = false;
            },
            save() {
                if(this.$refs.usernameInput.checkValidity()) {
                    this.$emit('save', this._username);
                    this.visible = false;
                    this.error = false;
                } else {
                    this.error = true;
                }
            }
        },
        mounted() {
            this._username = this.username;
        }
    }
</script>