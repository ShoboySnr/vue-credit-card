<template>
  <v-app>
    <div id="app">
      <Header />
        <v-container>
          <Card />
        </v-container>
      <Footer />
    </div>
  </v-app>
</template>

<style lang="sass">
@import './styles/main.scss'
</style>

<script>
import {Header, Footer } from './components/partials'
import Card from './components/credit-card/Card.vue';
import './assets/styles/main.css';

export default {
  
  components: {
    Header,
    Card,
    Footer,
  }
}
</script>