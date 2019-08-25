<template>
    <div class="table-wrapper">
        <div class="table">
            <span class="cell cell--title">Информация</span>
            <span class="cell cell--title">Состояние</span>
            <template v-for="(elements, key) in socketData">
                <span class="cell" :key="key+'-info'">{{ elements['project-info'] }}</span>
                <!--                <span class="cell" :key="key+'-state'">{{ elements.state }}</span>-->

                <select :key="key+'-state'" class="cell select" v-model="selected_states[key].state"
                        @change="changeState(selected_states[key])">
                    <option class="option" v-for="state in states" :key="state" :value="state">{{state}}</option>
                </select>

            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TableComponent",
        data() {
            return {
                socketData: '',
                fieldData: '',
                states: ['Connected', 'Disconnected', 'Testing'],
                selected_states: []
            }
        },
        mounted: async function () {
            const response = await this.$axios.get('http://localhost:3000/ticket', {withCredentials: true})
            let token = response.data.token
            this.$connect(`ws://localhost:3000/?token=${token}`)
            this.$options.sockets.onmessage = (data) => {
                let self = this
                this.socketData = JSON.parse(data.data)
                this.socketData.forEach(function (obj, key) {
                    self.selected_states[key] = {'_id': self.socketData[key]._id, 'state': self.socketData[key].state}
                })
            }
        },
        beforeDestroy() {
            this.$disconnect()
        },
        methods: {
            changeState: function (row) {
                this.$socket.send(JSON.stringify(row))
            }
        },
    }
</script>

<style lang="sass" scoped>
    .table-wrapper
        .table
            display: grid
            grid-gap: 10px
            grid-template-columns: 1fr 1fr

            .cell
                background: #f5f5f5
                padding: 10px

                &.cell--title
                    font-weight: bold

                &.select
                    border: 1px solid lightgray

                    &:-moz-focusring
                        color: transparent
                        text-shadow: 0 0 0 #000

                    &:focus, &:active
                        outline: none

</style>
