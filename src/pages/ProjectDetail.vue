<template>
  <q-page class="bg-white project-detail-page" :style-fn="styleFn">
    <div
      class="column items-center justify-between no-wrap"
      :class="$q.screen.gt.sm ? 'desktop-layout' : 'mobile-layout'"
      :style="$q.screen.gt.sm ? { height: pageStyle.height - pageStyle.offset + 'px' } : {}"
    >
      <div
        class="container full-width"
        :class="$q.screen.gt.sm ? 'desktop-container' : 'mobile-container'"
      >
        <div class="row full-height">
          <!-- Left: Project Description -->
          <div class="col-12 col-lg-8 column">
            <div class="q-my-auto">
              <h1
                class="q-mb-md"
                :class="$q.screen.gt.sm ? 'text-h1' : 'text-h3'"
                :style="{
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  fontSize: $q.screen.gt.sm ? '5rem' : '2rem',
                }"
              >
                {{ project.name }}
              </h1>
              <h2
                class="text-h4 q-mb-lg"
                style="letter-spacing: -0.01em; font-variant-caps: all-small-caps"
                v-if="project.client"
              >
                {{ project.client }}
              </h2>
              <p class="font-courrier" style="line-height: 1.6; max-width: 500px">
                {{ project.description }}
              </p>

              <q-btn
                v-if="nextProject"
                outline
                color="black"
                :to="{ name: 'project-id', params: { id: nextProject.id } }"
                class="q-mt-lg text-none next-project-btn"
                style="border-width: 2px"
                rounded
              >
                <span class="text-weight-medium">Next: {{ nextProject.name }}</span>
                <q-icon name="arrow_forward" class="q-ml-sm next-arrow" />
              </q-btn>
            </div>
          </div>

          <!-- Right: Main Image (Desktop only) -->
          <div class="col-12 col-lg-4 gt-sm full-height">
            <div class="img-right-container">
              <img
                v-if="currentImage"
                :src="getImagePath(currentImage)"
                :alt="project.name"
                class="main-image"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Carousel (Desktop only) -->
      <div class="carousel-container gt-sm">
        <swiper
          :modules="modules"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :slides-per-view="'auto'"
          :space-between="12"
          :free-mode="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          class="carousel-swiper"
        >
          <swiper-slide
            v-for="(image, index) in project.images"
            :key="index"
            class="carousel-slide"
          >
            <img
              :src="getImagePath(image)"
              :alt="`${project.name} ${index + 1}`"
              class="cursor-pointer"
              @click="slideToImage(index)"
            />
          </swiper-slide>
        </swiper>
      </div>
      <!-- Mobile: All Images Scrollable -->
      <div class="lt-md mobile-images-container q-pa-md">
        <div
          v-for="(image, index) in project.images"
          :key="index"
          class="mobile-image-wrapper q-mb-md"
        >
          <img
            :src="getImagePath(image)"
            :alt="`${project.name} ${index + 1}`"
            class="mobile-image font-courrier"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar, useMeta } from 'quasar'
import { getProjectById, getAllProjects } from '../data/projects'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'

const route = useRoute()
const $q = useQuasar()
const modules = [Autoplay, FreeMode]

const project = computed(() => {
  const projectId = route.params.id
  return getProjectById(projectId)
})

// Setup page meta
useMeta(() => ({
  title: `${project.value?.name || 'Project'} - MMBT`,
  meta: {
    description: {
      name: 'description',
      content: project.value?.description || 'Visual archive of chaos - MMBT project details',
    },
  },
  link: {
    courierPrime: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap',
    },
  },
}))

const nextProject = computed(() => {
  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.id === project.value.id)
  if (currentIndex === -1) return null
  const nextIndex = (currentIndex + 1) % allProjects.length
  return allProjects[nextIndex]
})

const currentImage = ref(project.value.images?.[0] || '')
const swiperInstance = ref(null)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
  console.log(swiperInstance.value)
}

const slideToImage = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index)
  }
}

const onSlideChange = (swiper) => {
  const realIndex = swiper.realIndex
  if (!project.value) return
  if (project.value.images?.[realIndex]) {
    currentImage.value = project.value.images[realIndex]
  }
}

const pageStyle = ref({
  offset: 0,
  height: 0,
})
// const pageOffset = ref(null)

const getImagePath = (filename) => {
  return `/projects/${filename}`
}

const styleFn = (offset, height) => {
  pageStyle.value = {
    offset,
    height,
  }
  return {
    offset: offset,
    height: height,
  }
}
</script>

<style scoped lang="scss">
.project-detail-page {
  @media (max-width: $breakpoint-sm-max) {
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (min-width: $breakpoint-md-min) {
    overflow: hidden;
  }
}

.desktop-layout {
  @media (min-width: $breakpoint-md-min) {
    overflow: hidden;
    gap: 0;
  }
}

.mobile-layout {
  @media (max-width: $breakpoint-sm-max) {
    height: auto !important;
    min-height: 100vh;
  }
}

.desktop-container {
  @media (min-width: $breakpoint-md-min) {
    height: 68%;
    flex-shrink: 0;
    overflow: hidden;
    width: 100%;
  }
}

.mobile-container {
  @media (max-width: $breakpoint-sm-max) {
    height: auto;
    flex-shrink: 1;
  }
}

.carousel-container {
  flex-shrink: 0;
  width: 100%;

  @media (min-width: $breakpoint-md-min) {
    height: 30%;
  }
}

.mobile-images-container {
  width: 100%;
  max-width: 800px;
}

.mobile-image-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
}

.mobile-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1340px;
  width: 100%;
}

.next-project-btn {
  letter-spacing: 0rem;
  transition: letter-spacing 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    letter-spacing: 0.03em;
  }

  .next-arrow {
    margin-left: 2px;
    transition: margin 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover .next-arrow {
    margin-left: 8px;
  }
}

.img-right-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  overflow: hidden;
}

.main-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  display: block;
}

.carousel-swiper {
  height: 100%;
  width: 100%;
}

.carousel-slide {
  width: 138px !important;
  height: 170px !important;
  aspect-ratio: 139/196;
  overflow: hidden;
  display: flex;
  align-items: center;

  img {
    width: 138px;
    object-fit: cover;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
}

.font-courrier {
  font-family: 'Courier Prime', monospace;
}
</style>
