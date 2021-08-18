<template>
  <div>
    <v-alert :type="getError.type" v-if="getError.show && !isFetching">
      {{getError.message}}
    </v-alert>
    <div v-if="getUsers && getUsers.length && !isFetching" class="mb-3">
      <v-row>
        <v-col>
          Выводить по
          <a @click.prevent="order">
            {{ $store.state.order ? 'возрастанию' : 'убыванию'}}
          </a>
        </v-col>
        <v-col class="text-right">
          Выводить по:
          <v-btn-toggle @change="changePerPage" class="ml-1" v-model="itemsPerPage">
            <v-btn :disabled="itemsPerPage === el" :value="el" small v-for="(el, i) in qtys" :key="i">
              {{el}}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </div>
    <table v-if="getUsers && getUsers.length && !isFetching">
    <tbody>
      <tr  v-for="item in getUsers" :key="item.id" height="50px">
        <td class="pl-3" width="90%"><b>{{item.login}}</b></td>
        <td class="pa-3 text-center" >
          <router-link tag="v-btn" :to="{name: 'person', params: {id: item.id}}">
            Просмотр
          </router-link>
        </td>
      </tr>
    </tbody>
    </table>
    <div v-else-if="isFetching">
      loading
    </div>
    <div v-else-if="!getUsers && !isFetching">
      Для использования приложения воспользуйтесь поиском выше
    </div>
  <div>
    <v-pagination
        v-if="$store.getters.getTotalItems > itemsPerPage"
        v-model="page"
        total-visible="5"
        :length="Math.ceil($store.getters.getTotalItems / itemsPerPage)" @input="transition">
    </v-pagination>
  </div>
</div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "persons",
  data: () => {
    return {
      page: 1,
      itemsPerPage: 10,
      alert: false,
      qtys: [5, 10, 20]
    }
  },
  methods: {
    ...mapMutations([
      'changeOrder',
      'setPage',
      'changePerPageQty'
    ]),
    ...mapActions([
      'retrieveUsers',
    ]),
    changePerPage(){
      this.changePerPageQty(this.itemsPerPage)
      this.retrieveUsers()
    },
    transition() {
      this.setPage(this.page)
      this.retrieveUsers()
    },
    order() {
      this.changeOrder()
      this.retrieveUsers()
    }
  },
  computed: {
    ...mapGetters([
      'getUsers',
      'getPage',
      'isFetching',
      'getError'
    ])
  },
  watch: {
    getPage() {
    this.page = this.getPage
    },
    GET_ERROR() {
      setTimeout( () => {
        this.alert = !this.alert
      }, 1000)
      setTimeout( () => {
        this.alert = !this.alert
      }, 5000)
    }
  }
}
</script>

<style scoped>
  tr:nth-child(odd) {
    background: lightgray;
  }
</style>
