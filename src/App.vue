<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted(){
  }
}
</script>

<style>
html {
    position: relative;
    min-height: 100%;
}

body {
    margin: 0 0 300px !important;
    min-height: 400px;
    margin-bottom: 100px;
    clear: both;
}

</style>

