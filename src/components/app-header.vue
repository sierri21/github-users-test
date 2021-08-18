<template>
  <v-app-bar app dark height="70">
    <form @click.prevent="">
    <input v-model="searchValue" @input="changeValidation" type="text" style="background: white">
    <v-btn @click="retrieveBySearch" type="submit">
      Поиск
    </v-btn>
      <br>
      <small class="text-danger" v-if="invalid">
        Введите значение
      </small>
    </form>
  </v-app-bar>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex'

export default Vue.extend({
  name: "app-header",
  data: () =>{
    return {
      searchValue: '',
      invalid: false
    }
  },
  methods: {
    ...mapActions([
      'retrieveUsers'
    ]),
    retrieveBySearch() {
      if (this.searchValue.length) {
        this.invalid = false
        if (this.$route.name !== 'home') {
          this.$router.replace('/')
        }
        this.retrieveUsers(this.searchValue)
      } else {
        this.invalid = true
      }
    },
    changeValidation() {
      this.invalid = false
    }
  },

})
</script>

<style scoped>

</style>
