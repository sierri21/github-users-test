<template>
  <div>
    <v-app >
      <app-header >
      </app-header>
      <v-container >
        <router-view style="padding-top: 100px"></router-view>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  import appHeader from './components/app-header'
  export default {
    components: {
      appHeader
    },
    data: () => {
      return {
      }
    },
  };
</script>

<style lang="scss">
</style>
