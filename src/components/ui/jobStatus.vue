<template>
  <div class="jobstatus">
    <template v-for="goal in goals" v-bind:key="goal">
      <b>{{ goal }}</b>
      <span>{{ getByStatus(goal).length }}</span>
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
      goals: []
    };
  },
  mounted() {
    axios
      .get(`${config.apiBaseUrl}/jobEvents/getactive`)
      .then(response => (this.jobs = response.data.jobs));
    axios
      .get(`${config.apiBaseUrl}/jobs/goals`)
      .then(response => (this.goals = response.data));
  },
  created() {
    this.setupStream();
  },
  methods: {
    setupStream() {
      let es = new EventSource(
        `${config.apiBaseUrl}/jobEvents/getactivestream`
      );

      es.addEventListener(
        "message",
        event => {
          let data = JSON.parse(event.data);
          console.log("Received data:");
          console.log(data);
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
