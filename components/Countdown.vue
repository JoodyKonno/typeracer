<template>
  <span>{{ remaining }}</span>
</template>

<script>
export default {
  props: {
    seconds: Number
  },

  data() {
    return {
      decrease: 0,
    };
  },

  computed: {
    remaining: function() {
      return this.seconds - this.decrease;
    }
  },

  mounted() {
    const interval = setInterval(() => {
      this.decrease += 1;

      if (!this.remaining) {
        this.$emit('countdownFinished');
        clearInterval(interval);
      }
    }, 1000);
  }
}
</script>

