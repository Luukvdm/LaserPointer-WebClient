<template>
  <div class="jobstatus">
    <template v-for="status in states" v-bind:key="status">
      <b>{{ status }}</b>
      <span>{{ getByStatus(status).length }}</span>
      <br />
    </template>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config/config";

export default {
  data() {
    return {
      jobs: [],
      states: []
    };
  },
  mounted() {
    axios
      .get(`${config.apiBaseUrl}/jobEvents/active`)
      .then(response => (this.jobs = response.data.jobs));
    axios
      .get(`${config.apiBaseUrl}/jobs/states`)
      .then(response => (this.states = response.data));
  },
  created() {
    this.setupStream();
  },
  methods: {
    setupStream() {
      let es = new EventSource(`${config.apiBaseUrl}/jobEvents/activestream`);

      es.addEventListener(
        "statusChange",
        event => {
          let data = JSON.parse(event.data);

          data.forEach(newJob => {
            let toReplace = this.jobs.find(oldJob => oldJob.id == newJob.jobId);
            if (toReplace) {
              toReplace.id = newJob.jobId;
              toReplace.status = newJob.newStatus;
            }
          });
        },
        false
      );

      es.addEventListener(
        "new",
        event => {
          let data = JSON.parse(event.data);
          data.forEach(j => {
            let job = {
              id: j.jobId,
              status: "inQueue"
            };
            this.jobs.push(job);
          });
        },
        false
      );
    },
    getByStatus(status) {
      return this.jobs.filter(j => j.status == status);
    }
  }
};
</script>
