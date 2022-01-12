<template>
  <div class="package-search-page">
    <v-data-table
      :items="packages"
      :headers="headers"
      :page="page"
      :server-items-length="totalItems"
      :items-per-page="10"
      :footer-props="{
        'disable-items-per-page': true,
        'disable-pagination': isQuerying,
      }"
      :disable-sort="true"
      :loading="isQuerying"
      item-key="name"
      no-data-text="No items to show, try using search."
      class="row-pointer"
      @update:page="pageChanged"
      @click:row="rowSelected"
    >
      <template slot="top">
        <v-toolbar height="80px">
          <v-container class="toolbar-row">
            <v-form @submit.prevent="searchSubmitted">
              <v-text-field
                :hide-details="true"
                filled
                clearable
                :full-width="true"
                v-model="query"
                label="Search packages"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-toolbar>
      </template>
    </v-data-table>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      query: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Author", value: "author" },
        { text: "Version", value: "version" },
      ],
      page: 1,
      isQuerying: false,
    };
  },
  methods: {
    async searchSubmitted() {
      const page = (this.page = 1);
      this.isQuerying = true;
      await this.$store.dispatch("fetchPackages", { page, query: this.query });
      this.isQuerying = false;
    },
    async pageChanged(page) {
      this.page = page;
      this.isQuerying = true;
      await this.$store.dispatch("fetchPackages", { page, query: this.query });
      this.isQuerying = false;
    },
    rowSelected(item) {
      this.$router.push({
        name: "PackageDetails",
        params: { name: item.name },
      });
    },
  },
  computed: mapGetters(["packages", "totalItems"]),
};
</script>

<style lang="scss" scoped>
.package-search-page {
  .row-pointer::v-deep {
    .v-data-table__wrapper {
      tbody {
        tr:not(.v-data-table__empty-wrapper) {
          cursor: pointer;
        }
      }
    }
  }
}
.toolbar-row {
  max-width: 90rem;
}
</style>
