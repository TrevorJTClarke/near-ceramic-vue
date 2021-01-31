<template>
<header>
  <div class="z-10 relative">
    <div class="mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <router-link to="/" class="inline-flex">
            <img class="h-10 w-auto sm:h-10 mr-5" src="/near-logo-bug.svg" alt="">
            <img class="h-10 w-auto sm:h-10" src="/logo-ceramic.svg" alt="">
          </router-link>
        </div>

        <div v-if="accountId" class="md:flex items-center justify-end md:flex-1 lg:w-0">
          <div class="relative inline-block text-left">
            <div>
              <button type="button" @click.prevent="toggleAccountMenu" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-opacity-0 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                <svg class="-ml-1 mr-2 h-5 w-5 stroke-current text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <span v-if="accountId">{{ accountId }}</span>
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" :class="{hidden: !accountMenuActive}">
              <div @click="accountMenuActive = false" class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button @click.prevent="logout" type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!accountId" class="md:flex items-center justify-end md:flex-1 lg:w-0">
          <a href="" @click.prevent="login" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-200">
            Log in
          </a>
        </div>

      </div>
    </div>

  </div>

</header>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleTheme from './ToggleTheme.vue'

export default {
  name: 'Header',

  components: {
    ToggleTheme,
  },

  data() {
    return {
      accountId: null,
      accountMenuActive: false,
      timer: null,
    }
  },

  methods: {
    ...mapActions(['update']),
    hideAccountMenu() {
      this.accountMenuActive = false
    },
    toggleAccountMenu() {
      if (this.timer) clearTimeout(this.timer)
      if (this.accountMenuActive === false) {
        setTimeout(() => {
          this.accountMenuActive = false
        }, 5000)
      }
      this.accountMenuActive = !this.accountMenuActive
    },

    async login() {
      await this.$near.loginAccount()
    },
    logout() {
      this.$near.logoutAccount()
    },
    setAccount() {
      this.accountId = this.$near.user && this.$near.user.accountId ? this.$near.user.accountId : null
      this.update({ key: 'account_id', value: this.accountId })
      this.update({ key: 'account', value: { ...this.$near.user } })
    },
  },

  mounted() {
    // Just needs to wait for next tick
    setTimeout(() => {
      this.setAccount()
    }, 40)
    setTimeout(() => {
      this.setAccount()
    }, 4000)
  },

  watch: {
    $route: ['hideAccountMenu'],
  },
}
</script>
