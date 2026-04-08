<template>
  <div v-if="visible" class="intro-sequence" :class="{ 'intro-exiting': isExiting }">
    <div class="intro-content">
      <div
        class="intro-logo-text"
        :class="{ 'logo-shifted': showEnter }"
        @animationend="handleAnimationEnd"
      >
        MMBT
      </div>
      <transition name="enter-fade">
        <div v-if="showEnter" class="intro-enter-section">
          <span class="intro-tagline">BUILT</span>
          <div
            class="intro-button-wrapper"
            @mouseenter="handleButtonHover"
            @mouseleave="handleButtonLeave"
          >
            <button @click="handleEnter" class="intro-enter-btn">
              <span class="enter-text">
                <span
                  v-for="(letter, index) in visibleButtonLetters"
                  :key="`${letter.char}-${index}`"
                  class="button-letter"
                >
                  {{ letter.char === ' ' ? '\u00A0' : letter.char }}
                </span>
              </span>
              <span class="enter-arrow"><q-icon name="arrow_forward" /></span>
            </button>
          </div>
          <span class="intro-tagline">FOR<br />DISRUPT</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const visible = ref(true)
const showEnter = ref(false)
const isExiting = ref(false)
const buttonLetters = ref(createLetterArray('ENTER'))
let autoEnterTimeout = null
let hoverTimeout = null
let animationTimeouts = []

const emit = defineEmits(['complete'])

// Only show letters that are marked as visible
const visibleButtonLetters = computed(() => {
  return buttonLetters.value.filter((letter) => letter.visible)
})

function createLetterArray(text) {
  return text.split('').map((char) => ({
    char,
    visible: true,
  }))
}

function animateTextChange() {
  const enterText = 'ENTER'
  const newText = "who you lookin' at ?"

  // Phase 1: Remove ENTER letters one by one (backwards)
  for (let i = enterText.length - 1; i >= 0; i--) {
    const timeout = setTimeout(
      () => {
        buttonLetters.value[i].visible = false
      },
      (enterText.length - 1 - i) * 80,
    )
    animationTimeouts.push(timeout)
  }

  // Phase 2: Replace with new text and show letters one by one
  const replaceDelay = enterText.length * 80 + 200
  const replaceTimeout = setTimeout(() => {
    buttonLetters.value = createLetterArray(newText)
    // Initially hide all letters
    buttonLetters.value.forEach((letter) => (letter.visible = false))

    // Show each letter one by one
    buttonLetters.value.forEach((letter, index) => {
      const timeout = setTimeout(() => {
        letter.visible = true
      }, index * 50)
      animationTimeouts.push(timeout)
    })
  }, replaceDelay)
  animationTimeouts.push(replaceTimeout)
}

function resetButtonText() {
  // Clear all animation timeouts
  animationTimeouts.forEach(clearTimeout)
  animationTimeouts = []

  // Reset to ENTER
  buttonLetters.value = createLetterArray('ENTER')
}

const handleAnimationEnd = () => {
  // Show ENTER button after logo animation completes
  showEnter.value = true

  // Auto-trigger after 5 seconds
  // autoEnterTimeout = setTimeout(() => {
  //   handleEnter()
  // }, 15000)
}

const handleEnter = () => {
  if (autoEnterTimeout) {
    clearTimeout(autoEnterTimeout)
  }
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
  animationTimeouts.forEach(clearTimeout)
  animationTimeouts = []

  // Trigger exit animation
  isExiting.value = true

  // Wait for exit animation, then emit complete
  setTimeout(() => {
    visible.value = false
    emit('complete')
  }, 800)
}

const handleButtonHover = () => {
  hoverTimeout = setTimeout(() => {
    animateTextChange()
  }, 3000)
}

const handleButtonLeave = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
  resetButtonText()
}
</script>

<style scoped lang="scss">
@keyframes intro-sequence-animation {
  0% {
    background: $mmbt-black;
  }
  40% {
    background: $mmbt-black;
  }
  75% {
    background: $mmbt-beige;
  }
  100% {
    background: $mmbt-beige;
  }
}

@keyframes intro-text-animation {
  0% {
    color: $mmbt-white;
  }
  40% {
    color: $mmbt-white;
  }
  75% {
    color: $mmbt-black;
  }
  100% {
    color: $mmbt-black;
  }
}

.intro-sequence {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: intro-sequence-animation 3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  &.intro-exiting {
    animation: none;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.intro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.intro-enter-section {
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 2rem;
  font-style: italic;
  font-size: 3.5rem;
  @media (max-width: $breakpoint-sm-max) {
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    gap: 10px;
  }
}

.intro-tagline {
  font-weight: 300;
  color: $mmbt-black;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 1.2;
}

.intro-logo-text {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 20rem;
  line-height: 1;
  letter-spacing: 1rem;
  text-transform: uppercase;
  user-select: none;
  animation: intro-text-animation 3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.logo-shifted {
    transform: translateY(-4rem);
  }

  @media (max-width: $breakpoint-sm-max) {
    font-size: 6rem;
    letter-spacing: 0.3rem;
  }
}

.intro-button-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 0 1rem;

  @media (max-width: $breakpoint-sm-max) {
    min-width: 200px;
  }

  &:hover .intro-enter-btn {
    background: $mmbt-black;
    color: $mmbt-beige;
    transform: translateX(5px);

    .enter-arrow {
      transform: translateX(5px);
    }
  }
}

.intro-enter-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3px 12px;
  background: transparent;
  margin-top: 5px;
  border: 2px solid $mmbt-black;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  color: $mmbt-black;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    background 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background: $mmbt-black;
    color: $mmbt-beige;
    transform: translateX(5px);
  }

  .enter-arrow {
    font-size: 1.5rem;
    transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover .enter-arrow {
    transform: translateX(5px);
  }
}

.button-letter {
  display: inline-block;
  animation: letterSlideIn 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes letterSlideIn {
  from {
    opacity: 0;
    transform: translateY(5px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Fade in up transition for ENTER section
.enter-fade-enter-active {
  transition:
    opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.enter-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.enter-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
