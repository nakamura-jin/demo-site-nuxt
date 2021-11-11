<template>
  <v-row justify="center" align-content="center">
    <v-col cols="10" md="6">
      <h1 class="text-center">ログイン</h1>
      <v-col height="140px">
        <v-text-field
          label="email"
          v-model="email"
          dense
        >
        </v-text-field>
        <v-text-field
          label="password"
          v-model="password"
          dense
        >
        </v-text-field>
        <v-col class="text-right">
          <v-btn color="error" @click="baseLogin">ログイン</v-btn>
        </v-col>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'top',
    data() {
      return  {
        email: '',
        password: ''
      }
    },
    methods: {
      baseLogin() {
        if(this.email == 'baselogin@test.com' && this.password == 'password') {
          this.$router.push('/top')
        } else {
          alert('ログインできません')
        }
      }
    }
  }

</script>