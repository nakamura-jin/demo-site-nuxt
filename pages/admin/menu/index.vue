<template>
  <v-container>
    <h1 class="mb-4 text-center text-h5">メニュー一覧</h1>
    <v-col class="text-right">
      <v-btn v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" small color="error" @click="createMenu">料理を追加する</v-btn>
      <v-btn v-else color="error" class="text-bold" large @click="createMenu">料理を追加する</v-btn>
    </v-col>
    <MenuList />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      photo: ''
    }
  },
  methods: {
    createMenu() {
      this.$router.push('/admin/menu/create_menu')
    }
  }
}
</script>

<style>

</style>