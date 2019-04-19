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
        <p class="subtitle">
          <span>Your typed</span>
          <strong>{{ selectedQuoteSize }}</strong>
          <span>characters in </span>
          <strong>{{ formattedTimeElapsed }}</strong>
          <span>seconds. Your typing rate is</span>
          <strong>{{ formattedCharsPerSecond }}</strong>
          <span>characters per second</span>
        </p>

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

      <div class="timer" v-show="!gameHasStarted">
        <span>The game will start in</span>
        <countdown @countdownFinished="startGame" :seconds="secondsToStart"></countdown>
        <span>seconds</span>
      </div>

      <div class="card form-card" >
        <div class="card-content">
          <p class="title">
            <textarea ref="inputedQuote" :disabled="!gameHasStarted || isFinished" v-model='inputedQuote'></textarea>
          </p>
          <p class="subtitle">
            Type the text and see your score
            <p>Time Elapsed: {{ formattedTimeElapsed }}</p>
          </p>
        </div>
      </div>
    </div>

    <time-tracker
      :start="gameHasStarted"
      :end="isFinished"
      @onUpdateTracking="updateTimer"></time-tracker>
  </section>
</template>

<script>
import io from 'socket.io-client';
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import TimeTracker from '@/components/TimeTracker';

export default {
  mounted() {
    this.socket.on('player.joined', () => {
      console.log('New Player has joined');
    });

    this.socket.on('game.start', () => {
      console.log('Game can start');
    });
  },

  data() {
    return {
      inputedQuote: '',
      selectedQuote: 'They had taken it all away from him now, they had turned away from him and there was nothing for him now. He was alone and there was nothing for him.',
      isFinished: false,
      secondsToStart: 10,
      gameHasStarted: false,
      timeElapsed: 0.0,
      socket: io('localhost:3001'),
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

    formattedTimeElapsed: function () {
      return this.timeElapsed / 1000;
    },

    selectedQuoteSize() {
      return this.selectedQuote.length;
    },

    charsPerSecond: function () {
      if (this.isFinished) {
        return this.selectedQuoteSize / this.formattedTimeElapsed;
      }
      return 0;
    },

    formattedCharsPerSecond: function () {
      return this.charsPerSecond.toFixed(2);
    },
  },

  methods: {
    startGame() {
      this.gameHasStarted = true;
      this.$nextTick(() => {
        this.$refs.inputedQuote.focus();
      });
    },

    updateTimer(time) {
      this.timeElapsed = time;
    }
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
    'countdown': Countdown,
    'time-tracker': TimeTracker,
  }
}
</script>

<style scoped>
.form-card textarea {
  width: 100%;
  height: 150px;
  font-size: 18px;
}

.timer {
  padding: 0 1.5em;
}
</style>
