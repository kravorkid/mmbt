<template>
  <div>
    <!-- Intro Sequence -->
    <IntroSequence v-if="!introComplete" @complete="handleIntroComplete" />

    <!-- Main Content (visible beneath intro) -->
    <q-page class="mmbt-page">
      <div class="container">
        <section class="mmbt-hero">
          <h1 class="mmbt-hero-title">
            <span class="hero-line">
              <span
                v-for="(letter, index) in heroLetters.line1"
                :key="'line1-' + index"
                :class="[
                  'hero-letter',
                  { 'hero-letter-visible': letter.visible, 'hero-letter-space': letter.isSpace },
                ]"
              >
                {{ letter.char }}
              </span>
            </span>
            <span class="hero-line">
              <span
                v-for="(letter, index) in heroLetters.line2"
                :key="'line2-' + index"
                :class="[
                  'hero-letter',
                  { 'hero-letter-visible': letter.visible, 'hero-letter-space': letter.isSpace },
                ]"
              >
                {{ letter.char }}
              </span>
            </span>

            <span class="hero-line">
              <span
                v-for="(letter, index) in heroLetters.line3"
                :key="'line3-' + index"
                :class="[
                  'hero-letter',
                  { 'hero-letter-visible': letter.visible, 'hero-letter-space': letter.isSpace },
                ]"
              >
                {{ letter.char }}
              </span>
            </span>
          </h1>
        </section>

        <!-- Animated separator line -->
        <div class="hero-separator" :class="{ 'hero-separator-animated': introComplete }"></div>

        <!-- Projects Grid -->
        <!-- <q-separator color="dark-4 q-mb-xl" /> -->
        <section class="mmbt-projects-grid">
          <router-link
            v-for="(project, index) in projects"
            :key="project.id"
            :to="{ name: 'project-id', params: { id: project.id } }"
            class="mmbt-project-card"
          >
            <span class="flex">
              <span class="q-ml-auto">{{ String(index + 1).padStart(2, '0') }}</span>
            </span>
            <div class="mmbt-project-image">
              <img :src="getProjectImage(project)" :alt="project.name" loading="lazy" />
              <div class="mmbt-project-overlay">
                <div class="column items-center q-gutter-sm q-pa-lg">
                  <h3
                    class="text-h2 text-white fw-900 text-lowercase text-italic text-center q-ma-none"
                    style="letter-spacing: -0.02em; line-height: 1"
                  >
                    {{ project.name }}
                  </h3>
                  <p
                    class="text-body1 text-white text-weight-regular text-center q-ma-none"
                    style="opacity: 0.9"
                  >
                    {{ project.client }}
                  </p>
                  <span
                    class="text-caption text-white text-uppercase text-weight-regular"
                    style="opacity: 0.7; letter-spacing: 0.1em"
                  >
                    {{ project.year }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </section>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta } from 'quasar'
import { getAllProjects } from '../data/projects'
import IntroSequence from 'components/IntroSequence.vue'
import { useIntroStore } from 'stores/intro-store'

const { t } = useI18n()
const projects = computed(() => getAllProjects())
const introStore = useIntroStore()

// Setup page meta
useMeta({
  title: 'MMBT - Visual Archive of Chaos',
  meta: {
    description: {
      name: 'description',
      content:
        'A minimal, brutalist, editorial website showcasing fashion and art direction projects. Visual archive of chaos.',
    },
  },
})

// Intro sequence state
const introComplete = ref(introStore.hasSeenIntro)

const handleIntroComplete = () => {
  introComplete.value = true
  introStore.completeIntro()
  // Start hero animation after intro completes
  setTimeout(() => {
    animateHeroLetters()
  }, 200)
}

// Split hero text into letters
const createLetterArray = (text) => {
  return text.split('').map((char) => ({
    char,
    visible: false,
    isSpace: char === ' ',
  }))
}

const heroLetters = ref({
  line1: createLetterArray(t('home.heroLine1')),
  line2: createLetterArray(t('home.heroLine2')),
  line3: createLetterArray(t('home.heroLine3')),
})

// Animate letters (called after intro completes)
const animateHeroLetters = () => {
  const allLines = [
    ...heroLetters.value.line1,
    ...heroLetters.value.line2,
    ...heroLetters.value.line3,
  ]

  allLines.forEach((letter, index) => {
    setTimeout(() => {
      letter.visible = true
    }, index * 30) // 30ms delay between each letter
  })
}

const getProjectImage = (project) => {
  if (project.featured_img) {
    return `/projects/${project.featured_img}` // Use the featured image as thumbnail
  } else if (project.images && project.images.length > 0) {
    return `/projects/${project.images[0]}` // Fallback to first image if no featured image
  }
  return null
}

watch(
  () => introStore.hasSeenIntro,
  (newVal) => {
    if (newVal) {
      introComplete.value = true
      animateHeroLetters()
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.mmbt-page {
  background: $mmbt-beige;
  padding: 0;
  min-height: 100vh;
  // height: 100vh;
  overflow: hidden;
  // display: flex;
  // flex-direction: column;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mmbt-hero {
  margin-top: 3rem;
  margin-bottom: 2rem;
  flex-shrink: 0;
}

.hero-separator {
  width: 0;
  height: 2px;
  background: $mmbt-black;
  margin-bottom: 2rem;
  transition: width 3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.hero-separator-animated {
    width: 100%;
  }
}

.mmbt-hero-title {
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0;
  color: $mmbt-black;
  text-transform: uppercase;
  @media (max-width: $breakpoint-sm) {
    font-size: 3rem;
    letter-spacing: -0.02em;
  }
}

// Hero letter animation
.hero-line {
  display: block;
}

.hero-letter {
  display: inline-block;
  opacity: 0;
  transform: translateX(-30px);
  transition:
    opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.hero-letter-visible {
    opacity: 1;
    transform: translateX(0);
  }

  &.hero-letter-space {
    width: 0.3em;
  }
}

// Projects Grid
.mmbt-projects-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, 201px);
  // grid-auto-rows: 243px;
  gap: 1.5rem;
  // padding: 2rem 3rem;
  overflow-y: auto;
  overflow-x: hidden;
  // justify-content: center;
  align-content: start;

  // Mobile: 2 columns
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    gap: 1rem;
    padding: 1rem 0rem;
  }

  // Small tablet: 3 columns
  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: 1.5rem;
    padding: 1.5rem 0rem;
  }

  // Medium screens: 4 columns
  @media (min-width: $breakpoint-md-min) and (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(4, 201px);
    gap: 1.5rem;
    padding: 2rem 0rem;
  }

  // Large screens: 5 columns
  @media (min-width: $breakpoint-lg-min) and (max-width: 1600px) {
    grid-template-columns: repeat(5, 201px);
    gap: 1.5rem;
  }
}

.mmbt-project-card {
  position: relative;
  text-decoration: none;
  color: $mmbt-black;
  display: block;
  transition: transform 0.3s ease;
  width: 201px;
  height: 243px;

  @media (max-width: $breakpoint-sm) {
    width: 100%;
    height: auto;
  }

  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md) {
    width: 100%;
    height: auto;
  }

  &:hover {
    transform: translateY(-4px);

    .mmbt-project-image img {
      transform: scale(1.05);
    }

    .mmbt-project-overlay {
      opacity: 1;
    }
  }
}

.mmbt-project-image {
  width: 100%;
  height: 243px;
  overflow: hidden;
  background: $mmbt-black;
  position: relative;

  @media (max-width: $breakpoint-sm) {
    height: auto;
    aspect-ratio: 3/4;
  }

  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md) {
    height: auto;
    aspect-ratio: 3/4;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(0.2) contrast(1.1);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.mmbt-project-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
</style>
