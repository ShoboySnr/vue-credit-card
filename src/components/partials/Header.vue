<template>
 <div id="header">
  <v-toolbar color="white" light flat class="dark-text fixed" app clipped-left>
   <v-toolbar-side-icon
    @click.stop="drawer = !drawer"
    class="hidden-md-and-up hamburger white-text"
   >
    <v-icon class="pr-2" x-small>mdi-menu</v-icon>
   </v-toolbar-side-icon>
   <v-container class="d-flex">
    <v-toolbar-title>
     <v-link to="/" light flat class="logo">{{ title }}</v-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down black--text">
     <v-btn
      text
      v-for="item in menuItems"
      :key="item.icon"
      :to="item.path"
      class="text-capitalize black--text font-weight-bold menu-link"
      flat
     >
      {{ item.title }}
     </v-btn>
      <v-avatar color="blue" size="48" class="avatar-size">
        <img
        src="../../assets/img/avatar-png.png"
        alt="Avatar"
        >
      </v-avatar>
    </v-toolbar-items>
   </v-container>
  </v-toolbar>
  <v-navigation-drawer
   v-model="drawer"
   temporary
   absolute
   width="200"
   id="drawer"
   class="pt-10 pb-10"
  >
   <v-link to="/" light flat class="logo black-text ml-3 text-center">{{ title }}</v-link>
   <v-list>
    <v-btn
     v-for="item in menuItems"
     :key="item.icon"
     :to="item.path"
     class="text-capitalize black-text mt-3 mb-3 headline"
     flat
     text
    >
     {{ item.title }}
    </v-btn>
   </v-list>
  </v-navigation-drawer>
 </div>
</template>

<style scoped  lang="scss">
</style>

<script>
import { menuItems } from '../data/data';

export default {
  data () {
    return {
      fixed: false,
      menuItems,
      drawer: null 
    }
  }
};
</script>