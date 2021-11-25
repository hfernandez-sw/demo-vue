<template>
  <div class="about">
    <h1>This is an about {{ fullTitle }}</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      title: 'sample'
    };
  },
  computed: {
    fullTitle() {
      return `${this.title} page`;
    }
  }
};
</script>
