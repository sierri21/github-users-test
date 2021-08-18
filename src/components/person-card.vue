<template>
  <div v-if="user">
    <v-row>
      <v-col cols="4">
        <img :src="user.avatar_url" alt="user avatar" width="200" height="200">
        <h4>
          {{user.login}}
        </h4>
        <div>
          <a :href="user.html_url">Follow</a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "person-card",
  data: () => {
    return {
      user: null,
      repos: null,
    }
  },
  created() {
    if (this.$store.state.users && this.$store.state.users.length) {
      this.user = this.$store.state.users.find( (user) => {
        return user.id == this.$route.params.id
      })
    } else {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
