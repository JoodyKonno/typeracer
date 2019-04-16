<template>
  <section>
    <app-header></app-header>

    <section class="hero is-primary">
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
      <div class="card">
        <div class="card-content">
          <p class="title">
            {{ selectedQuote }}
          </p>
        </div>
      </div>

      <div class="card form-card">
        <div class="card-content">
          <p class="title">
            <textarea v-model='inputedQuote'></textarea>
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
    }
  },

  computed: {

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

