<script>
export default {
  render() { },

  props: {
    start: {
      type: Boolean,
      default: false,
    },
    end: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      interval: null,
      timer: 0,
      tick: 100,
    };
  },

  watch: {
    start: function (newStart) {
      if (newStart) {
        this.interval = setInterval(() => {
          this.timer += this.tick;
        }, this.tick);
      }
    },

    end: function (newEnd) {
      if (newEnd) {
        clearInterval(this.interval);
        this.$emit('onEndTracking', this.timer);
      }
    },

    timer: function (newTimer) {
      this.$emit('onUpdateTracking', newTimer);
    }
  }
}
</script>

