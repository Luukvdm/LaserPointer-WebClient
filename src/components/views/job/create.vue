<template>
  <div id="createJob">
    <div class="content-block-wrapper">
      <div class="content">
        <div class="block-header">
          <h1>Create new job</h1>
        </div>
      </div>
    </div>

    <div class="content-block-wrapper">
      <div class="content-center content">
        <div class="content">

          <div class="fieldset">
            <div class="fieldset-content">
              <div class="fieldset-label">
                <span>Hashtype</span>
              </div>
              <div class="fieldset-field">
                <select v-model="selectedHashType">
                  <template v-for="(type, key) in hashTypes" v-bind:key="key">
                    <option :selected="key == 0" v-bind:value="type">{{ type }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>

          <div class="fieldset">
            <div class="fieldset-content">
              <div class="fieldset-label">
                <span>Hashes</span>
              </div>
              <div class="fieldset-field">
                <template v-for="(hash, key) in hashes" v-bind:key="key">
                  <input v-model.trim="hash.value" @change.once="addHash()" placeholder="Hash in hex format"/>
                  <span v-if="hash.value.length != hashLength">Not a valid hash!</span>
                  <br/><br/> <!-- TODO Fix this with css instead -->
                </template>
              </div>
            </div>
          </div>

          <div class="block-wrapper">
            <div class="block">
              <button v-on:click="send">
                <span>Create job</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import config from "../../../config/config";

export default {
  data() {
    return {
      hashTypes: [],
      selectedHashType: "",
        // TODO length shouldnt be hard coded, replace with value from api
      hashLength: 64,
      hashes: []
    };
  },
  mounted() {
    this.addHash();
    axios
      .get(`${config.apiBaseUrl}/hashes/types`)
      .then(response => (this.hashTypes = response.data));
  },
  methods: {
    addHash() {
      this.hashes.push({
        value: ""
      });
    },
    send() {
      let stringHashes = []
      this.hashes.forEach(h => {
        if(h.value.length != this.hashLength) return;
        stringHashes.push(h.value)
      });
      if(stringHashes.length > 0) {
        let job = {
          HashType: this.selectedHashType,
          HexHashes: stringHashes
        };

        axios
          .post(`${config.apiBaseUrl}/jobs/`, job)
          .then(response => console.log(response));
        // TODO create a nicer message and check response code
        alert("Job created");
      } else {
        alert("Empty hash array!");
      }
    }
  }
};
</script>

<style>
.fieldset > .fieldset-content {
  display: flex;
  height: 100%;
}
.fieldset > .fieldset-content .fieldset-label {
  flex: 0 0 10%;
}
.fieldset > .fieldset-content .fieldset-field {
  flex: 1;
}
.time-input {
  width: 30%;
}
</style>

