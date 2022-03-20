<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="app-main-layout">
      <Navbar />

      <Sidebar />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" data-position="left" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import messages from '@/utils/message.js'


export default {
  name: "main-layout",
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(["isOpen"]),
     error () {
      return this.$store.getters.error
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>