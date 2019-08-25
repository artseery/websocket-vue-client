<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style lang="sass">
    body, html
        padding: 0
        margin: 0
    *
        box-sizing: border-box
    #app, select, button, input
        @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap')
        font-family: 'Montserrat', sans-serif
        font-size: 16px
        -webkit-font-smoothing: subpixel-antialiased
    #app
        width: 100%
        height: 100%
        display: flex
        flex-direction: row
        justify-content: center
</style>
