<template>
  <section>
    <app-header></app-header>

    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Typeracer
          </h1>
          <h2 class="subtitle">
            Test your Might!!!
          </h2>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="tile is-child notification is-primary" v-show="isFinished">
        <p class="title">Game Over</p>
        <p class="subtitle">Your score: </p>

        <a class="button is-" @click="isFinished = false">Try Again</a>
      </div>

      <div class="card">
        <div class="card-content">
          <p class="title">
            <span class="big-quotes">"</span>
            <span class="has-text-success">{{ matchedText }}</span>
            <span>{{ remainingText }}</span>
            <span class="big-quotes">"</span>
          </p>
        </div>
      </div>

      <div class="card form-card">
        <div class="card-content">
          <p class="title">
            <textarea :disabled="isFinished" v-model='inputedQuote'></textarea>
          </p>
          <p class="subtitle">Type the text and see your score</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  data() {
    return {
      inputedQuote: '',
      selectedQuote: 'They had taken it all away from him now, they had turned away from him and there was nothing for him now. He was alone and there was nothing for him.',
      isFinished: false,
    }
  },

  computed: {
    inputedQuoteLetters: function () {
      return this.inputedQuote
        .split('');
    },

    selectedQuoteLetters: function () {
      return this.selectedQuote
        .split('');
    },

    matchedText: function () {
      const result = [];

      // for performance reasons let's iterate through the inputedQuote that's likely to be the smaller
      for (let i=0; i < this.inputedQuoteLetters.length; i++) {
        if (this.inputedQuoteLetters[i] !== this.selectedQuoteLetters[i]) {
          break;
        }
        result.push(this.inputedQuoteLetters[i]);
      }

      return result.join('');
    },

    remainingText: function () {
      return this.selectedQuoteLetters
        .slice(this.matchedText.length)
        .join('');
    },
  },

  watch: {
    inputedQuote: function (newInput, oldInput) {
      if (this.remainingText === '') {
        this.isFinished = true;
      }
    }
  },

  components: {
    'app-header': Header,
  }
}
</script>

<style scoped>
.form-card textarea {
  width: 100%;
  height: 150px;
  font-size: 18px;
}
</style>

