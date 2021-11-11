<template>
  <v-app dark>
    <div class="text-center page" v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" style="width: 90%; padding:20px 0;">
      <!-- <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1> -->
      <p v-if="error.statusCode === 404">操作にミスがあります。<br>最初からやり直してください。</p>
      <!-- <h1 v-else>
        {{ otherError }}
      </h1> -->
      <p v-else>システムがダウンしています。<br>時間をおいてやり直してください。</p>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </div>


    <div class="text-center page" v-else style="padding: 40px">
      <!-- <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1> -->
      <h1 v-if="error.statusCode === 404">操作にミスがあります。<br>最初からやり直してください。</h1>
      <!-- <h1 v-else>
        {{ otherError }}
      </h1> -->
      <h1 v-else>システムがダウンしています。<br>時間をおいてやり直してください。</h1>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      // pageNotFound: '404 Not Found',
      // otherError: 'An error occurred'
      pageNotFound: '操作にミスがあります。最初からやり直してください。',
      otherError: 'システムがダウンしています。時間をおいてやり直してください。'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
body {
  width: 100%;
  height: 100%;
}
h1 {
  font-size: 20px;
}

.page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
}
</style>
