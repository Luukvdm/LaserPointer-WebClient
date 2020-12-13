<template>
  <div class="job-details">
    <div class="page-main-section">
      <div class="content">
        <div class="textblock">
          <h2 class="page-title">Job Details</h2>
          <ul>
            <li><b>ID: </b>{{ job.id }}</li>
            <li><b>Created: </b>{{ job.created }}</li>
            <li><b>Hashtype: </b>{{ job.hashType }}</li>
            <li><b>Status: </b>{{ job.status }}</li>
          </ul>

          <ul class="job-list">
            <li class="list-row">
              <span class="list-col"><b>Hash (in hex)</b></span>
              <span class="list-col"><b>Plain Text</b></span>
            </li>
            <template v-for="hash in job.hashes" v-bind:key="hash.id">
              <li class="list-row">
                <span class="list-col">{{ hash.hexValue }}</span>
                <span class="list-col">{{ hash.plainValue }}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config/config";

export default {
  data() {
    return {
      jobId: this.$route.params.id,
      job: {}
    };
  },
  mounted() {
    axios
      .get(`${config.apiBaseUrl}/jobs/details/${this.jobId}`)
      .then(response => {
        this.job = response.data;
        console.log(this.job);
      });
  },
  methods: {}
};
</script>

<style scoped>
.job-details {
  text-align: left;
}

.list-row .list-col {
  width: 50% !important;
}
</style>
