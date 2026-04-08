import { defineStore } from 'pinia'

export const useIntroStore = defineStore('intro', {
  state: () => ({
    hasSeenIntro: false,
  }),

  getters: {
    shouldShowIntro: (state) => !state.hasSeenIntro,
  },

  actions: {
    completeIntro() {
      this.hasSeenIntro = true
    },

    resetIntro() {
      this.hasSeenIntro = false
    },
  },
})
