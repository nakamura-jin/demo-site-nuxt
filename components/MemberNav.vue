<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{user.name}}　様
            </v-list-item-title>
            <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-btn width="100%" color="error" class="text-subtitle" @click="logout">logout</v-btn>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
      <v-list-item to="/">
        <v-list-item-title class="text-center">サイト</v-list-item-title>
        <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
      </v-list-item>
<!-------------------- お店 -------------------->
    <v-list-group
        :value="true"
        prepend-icon="mdi-glass-mug"
      >
        <template v-slot:activator>
          <v-list-item-title>お店</v-list-item-title>
        </template>

        <v-list-item
          v-for="(shop, i) in shops"
          :key="i"
          link
          :to="shop.link"
        >

        <v-list-item-title v-text="shop.text" class="text-center"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="shop.icon"></v-icon>
          </v-list-item-icon>

        </v-list-item>
    </v-list-group>


    </v-list>
  </v-card>
</template>

<script>
  import firebase from '@/plugins/firebase'
  export default {
    data: () => ({
      selectedItem: 0,
      shops: [
        { text: 'メニュー', icon: 'mdi-silverware-variant', link: '/admin/menu' },
        { text: 'オーダー', icon: 'mdi-note-edit', link: '/order' },
      ],
    }),
    computed: {
      user() {
        if(JSON.stringify(this.$store.state.user) == []) {
          return false
        }

        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut()
        this.$store.commit('LOGOUT_USER')
        this.$router.push('/top')
      }
    }
  }
</script>