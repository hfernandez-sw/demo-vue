<template>
  <div class="about">
    <h1>This is an about {{ fullTitle }}</h1>
    <Hello />
  </div>
</template>

<script>
import Hello from '@/components/HelloWorld.vue';
export default {
  name: 'About',
  components: {
    Hello
  },
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
