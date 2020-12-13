<template>
  <footer>
    <div class="content">
      Released under the
      <a
        href="https://www.gnu.org/licenses/gpl-3.0.en.html"
        target="_blank"
        rel="noopener"
        >GPL License</a
      >
      <br />
      Copyright &copy; 2020-{{ currentyear }} LaserPointer
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: function() {
    return {
      currentyear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
footer {
  position: relative;
  padding: 40px 0;
  text-align: center;
}
</style>
