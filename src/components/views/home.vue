<template>
  <div class="home section-wrapper">
    <div id="page-top-section" class="top-section">
      <h1>Home</h1>
    </div>
    <div class="main-section">
      <p>
        Welkom bij LaserPointer!
      </p>
      <jobStatus />
    </div>
  </div>
</template>
<script>
import jobStatus from "@/components/ui/jobStatus";

export default {
  name: "Home",
  components: {
    jobStatus
  }
};
</script>
