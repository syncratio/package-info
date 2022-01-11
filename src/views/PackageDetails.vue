<template>
  <v-row justify="center">
    <v-dialog
      v-model="name"
      persistent
      max-width="600px"
      @click:outside="$router.push({ name: 'PackageSearch' })"
    >
      <v-skeleton-loader
        :loading="loading"
        type="article, image"
        :boilerplate="true"
      >
        <v-card>
          <v-card-title class="text-h4">{{ name }}</v-card-title>
          <v-card-subtitle class="text-subtitle-2">
            <span v-if="author">by {{ author }}</span>
            <span v-if="version">v.{{ version }}</span>
            <span v-if="published">published {{ published }}</span>
          </v-card-subtitle>
          <v-card-text>
            <v-row class="text-body-1 package-description">
              <v-col>{{ description }}</v-col>
            </v-row>
            <v-row v-if="usage.values.length">
              <v-col>
                <span class="text-subtitle-1 text-overline">Yearly downloads</span>
                <v-sparkline
                  :labels="usage.labels"
                  :value="usage.values"
                  :smooth="5"
                  :auto-draw="true"
                  :label-size="10"
                  color="blue-grey"
                >
                </v-sparkline>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: this.$route.params.name,
      usageData: null,
      packageData: null,
      loading: true,
    };
  },

  methods: {
    async loadUsageStats() {
      let response;
      try {
        response = await axios.get(
          `https://data.jsdelivr.com/v1/package/npm/${this.name}/stats/date/year`
        );
      } catch (e) {
        console.error(e);
        return;
      }
      return response.data;
    },

    async loadPackageDetails() {
      let response;
      try {
        response = await axios.get(`https://registry.npmjs.org/-/v1/search`, {
          params: {
            text: this.name,
            size: 1,
          },
        });
      } catch (e) {
        console.error(e);
        return;
      }

      return response.data?.objects?.[0]?.package;
    },
  },

  computed: {
    usage() {
      let values = [];
      let labels = [];

      if (this.usageData) {
        const reducedData = {};
        for (let dateString in this.usageData.dates) {
          const shortDate = dateString.slice(0, -3);
          if (reducedData[shortDate])
            reducedData[shortDate] += this.usageData.dates[dateString].total;
          else reducedData[shortDate] = this.usageData.dates[dateString].total;
        }

        labels = Object.keys(reducedData).map((shortDate) => {
          return new Date(shortDate).toLocaleString("default", {
            month: "short",
          });
        });
        values = Object.values(reducedData);
      }
      return { values, labels };
    },
    author() {
      return this.packageData?.author?.name || "";
    },
    version() {
      return this.packageData?.version || "";
    },
    published() {
      return (
        new Date(this.packageData?.date).toLocaleString(undefined, {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }) || ""
      );
    },
    description() {
      return this.packageData?.description || "";
    },
  },

  async created() {
    this.loading = true;
    [this.usageData, this.packageData] = await Promise.all([
      this.loadUsageStats(),
      this.loadPackageDetails(),
    ]);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.v-data-footer {
  justify-content: end;
}
.v-card__subtitle span:not(:last-child)::after {
  content: " • ";
}
.package-description {
  border-top: 1px dotted #ccc;
  border-bottom: 1px dotted #ccc;
}
</style>
