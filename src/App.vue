<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless app absolute color="blue-grey lighten-5">
      <v-col class="text-center" cols="12">
        <span class="text-overline">Vladimir Ganzenko</span>
        <v-btn
          small
          fab
          icon
          href="https://github.com/syncratio"
          target="_blank"
        >
          <v-icon> mdi-github </v-icon>
        </v-btn>
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
