<template>
  <v-container>
    <v-row justify="center">
      <v-col class="mt-6" md="6">
        <h1 class="text-center mb-4">新規登録</h1>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <!-- name -->
          <validation-provider v-slot="ProviderProps" rules="required" name="名前">
            <v-text-field
              label="名前"
              v-model="name"
              dense
              height="30"
              class="mb-4"
              :error-messages="ProviderProps.errors[0]"
            >
            </v-text-field>
          </validation-provider>

          <!-- email -->
          <validation-provider v-slot="ProviderProps" rules="required|email" name="メールアドレス">
            <v-text-field
              label="メールアドレス"
              v-model="email"
              dense
              height="30"
              class="mb-4"
              :error-messages="ProviderProps.errors"
            >
            </v-text-field>
          </validation-provider>

          <!-- password -->
          <validation-provider v-slot="ProviderProps" rules="required|min:8" name="パスワード">
            <v-text-field
              label="パスワード"
              v-model="password"
              dense
              height="30"
              class="mb-4"
              :counter="8"
              :error-messages="ProviderProps.errors"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            >
            </v-text-field>
          </validation-provider>

          <!-- password_confirm -->

          <validation-provider v-slot="ProviderProps" rules="required|min:8|confirmed:パスワード" name="パスワード確認">
            <v-text-field
              label="パスワード確認"
              v-model="password_confirmation"
              dense
              height="30"
              class="mb-4"
              :counter="8"
              :error-messages="ProviderProps.errors"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
            >
            </v-text-field>
          </validation-provider>

          <v-col class="text-right">
            <v-btn
              @click="clear"
              color="error"
            >
              リセット
            </v-btn>
            <v-btn
              @click="register"
              color="primary"
              class="ml-8"
              :disabled="ObserverProps.invalid || !ObserverProps.validated"
            >
              送信
            </v-btn>
          </v-col>

        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  data(){
    return {
      show1: false,
      show2: false,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: 3
    }
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() =>{
          this.$store.dispatch('create_user', {
            name: this.name,
            email: this.email,
            password: this.password,
            role_id: this.role_id
          })
          this.$router.push('/auth/done')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
    clear() {
        this.name = ''
        this.email = ''
        this.password = ''
        this.password_confirmation = ''
        this.$refs.obs.reset()
    }
  }
}
</script>

<style>

</style>