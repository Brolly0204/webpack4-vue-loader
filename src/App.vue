<template>
  <div id="app">
    <h3 @click="clickHandle">{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Vue SSR App!',
    titleTemplate: null
  },
  data: () => ({
    title: 'Hello Liwenli'
  }),
  methods: {
    clickHandle() {
      console.log('hello world!')
    }
  }
}
</script>

<style lang="stylus" scoped >
  #app
    color blue
    transform translateX(100px)
</style>
