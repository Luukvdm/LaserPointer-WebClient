<template>
  <div class="my-jobs">
    <div class="page-main-section">
      <div class="content">
        <div class="textblock">
          <h2>My Jobs</h2>
          <div class="job-list-container">
            <ul class="job-list">
              <li class="list-row">
                <span class="list-col"><b>Creation date</b></span>
                <span class="list-col"><b>Status</b></span>
                <span class="list-col"><b>Data</b></span>
              </li>
              <template v-for="job in jobs" v-bind:key="job.id">
                <li class="list-row">
                  <span class="list-col">{{
                    job.created.toLocaleString()
                  }}</span>
                  <span class="list-col">{{ job.status }}</span>
                  <span class="list-col list-link">
                    <router-link :to="'/job/details/' + job.id">
                      Details
                    </router-link>
                  </span>
                </li>
              </template>
            </ul>
          </div>
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
      jobs: []
    };
  },
  mounted() {
    axios.get(`${config.apiBaseUrl}/jobs/my`).then(response => {
      let theJobs = response.data.jobs;
      theJobs.forEach(j => {
        j.created = new Date(j.created);
      });
      this.jobs = response.data.jobs;
    });
  },
  methods: {}
};
</script>

<style scoped>
.job-list {
  list-style: none;
}

.job-list-container {
  text-align: left;
  margin: auto;
}

ul {
  list-style-type: none;
}

.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  transform: rotate(90deg);
}

.nested {
  display: none;
  margin-top: 0;
}

.active {
  display: block;
}
</style>
