<template>
  <main class="bg-gray-50">
    <Header />

    <router-view />
  </main>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header,
  },
}
</script>