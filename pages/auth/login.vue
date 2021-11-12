<template>
  <v-container>
    <v-row justify="center" style="height:500px" align="center">
      <v-col cols="12" md="4">
        <h1 class="text-center text-h5">ログイン</h1>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <v-form class="pa-3">

            <!-- メールアドレス -->
            <validation-provider
              v-slot="ProviderProps"
              rules="required|email"
              name="メールアドレス"
            >
              <v-text-field
                label="メールアドレス"
                v-model="email"
                dense
                type="email"
                height="30"
                class="mb-4"
                :error-messages="ProviderProps.errors[0]"
              >
              </v-text-field>
            </validation-provider>

            <!-- パスワード -->
            <validation-provider
              v-slot="ProviderProps"
              rules="required|min:8|alpha_num"
              name="パスワード"
            >
              <v-text-field
                label="パスワード"
                v-model="password"
                dense
                counter="min"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :error-messages="ProviderProps.errors[0]"
                height="30"
              >
              </v-text-field>
            </validation-provider>

            <v-col class="text-right">
              <v-btn
                type="button"
                color="error"
                @click="reset"
              >
                リセット
              </v-btn>
              <v-btn
                type="button"
                color="primary"
                class="ml-8"
                @click="login"
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
              >
                ログイン
              </v-btn>
            </v-col>
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from '@/plugins/firebase'
  export default {
    data() {
      return {
        email: '',
        password: '',
        show1: false,
      }
    },
    methods: {
      async login() {
        if (!this.email || !this.password) {
          alert('メールアドレスまたはパスワードが入力されていません。')
          return
        }
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.dispatch('login_user', {
              email: this.email
            })
            this.$router.push('/top')
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/invalid-email':
                alert('メールアドレスの形式が違います。')
                break
              case 'auth/user-disabled':
                alert('ユーザーが無効になっています。')
                break
              case 'auth/user-not-found':
                alert('ユーザーが存在しません。')
                break
              case 'auth/wrong-password':
                alert('パスワードが間違っております。')
                break
              default:
                alert('エラーが起きました。しばらくしてから再度お試しください。')
                break
            }
          })
      },
      reset() {
        this.email = '',
        this.password = '',
        this.$refs.obs.reset()
      }
    }
  }
</script>