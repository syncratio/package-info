<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless app absolute>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong><a href="https://github.com/syncratio">syncratio</a></strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
