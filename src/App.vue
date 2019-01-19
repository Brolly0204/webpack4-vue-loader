<template>
  <div id="app">
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    title: 'Hello Liwenli'
  })
}
</script>

<style lang="stylus" scoped >
  #app
    color blue
    transform translateX(100px)
</style>
