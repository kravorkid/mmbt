<template>
  <q-layout view="hHh LpR fFf">
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <q-header v-show="!introStore.shouldShowIntro" class="mmbt-header">
        <div class="container">
          <q-toolbar class="mmbt-toolbar items-start">
            <q-toolbar-title class="mmbt-logo">
              <router-link to="/" class="mmbt-logo-link">
                <img src="~assets/logo.png" alt="MMBT" class="mmbt-logo-image" />
              </router-link>
            </q-toolbar-title>

            <!-- Desktop Navigation -->
            <nav class="mmbt-nav gt-sm">
              <router-link to="/projects/mmbt" class="mmbt-nav-link">
                {{ $t('nav.about') }}
              </router-link>
              <span class="mmbt-nav-separator">/</span>
              <router-link to="/contact" class="mmbt-nav-link">
                {{ $t('nav.contact') }}
              </router-link>
            </nav>

            <!-- Mobile Menu Button -->
            <q-btn
              flat
              dense
              round
              icon="menu"
              class="lt-md"
              @click="drawerOpen = !drawerOpen"
              color="black"
            />
          </q-toolbar>
        </div>
      </q-header>
    </transition>

    <!-- Mobile Drawer -->
    <q-drawer
      v-model="drawerOpen"
      side="right"
      overlay
      behavior="mobile"
      :width="280"
      class="mmbt-drawer"
    >
      <div class="drawer-content">
        <div class="drawer-header">
          <q-btn flat dense round icon="close" @click="drawerOpen = false" color="black" />
        </div>

        <nav class="drawer-nav">
          <router-link to="/projects/mmbt" class="drawer-nav-link" @click="drawerOpen = false">
            {{ $t('nav.about') }}
          </router-link>
          <router-link to="/contact" class="drawer-nav-link" @click="drawerOpen = false">
            {{ $t('nav.contact') }}
          </router-link>
        </nav>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutLeft"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <q-footer v-show="!introStore.shouldShowIntro">
      <AppFooter />
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import AppFooter from 'components/AppFooter.vue'
import { useIntroStore } from 'stores/intro-store'

const drawerOpen = ref(false)
const introStore = useIntroStore()
</script>

<style scoped lang="scss">
.mmbt-header {
  background: $mmbt-beige;
  box-shadow: none;
  padding: 1rem 0;
}

.mmbt-toolbar {
  padding: 0rem;
  min-height: auto;
}

.mmbt-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mmbt-logo-link {
  color: $mmbt-black;
  text-decoration: none;
  display: inline-block;

  &:hover {
    opacity: 0.7;
  }
}

.mmbt-logo-image {
  height: 2.5rem;
  width: auto;
  display: block;

  @media (max-width: $breakpoint-sm-max) {
    height: 1.3rem;
  }
}

.mmbt-nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.mmbt-nav-link {
  color: $mmbt-black;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.5;
  }

  &.router-link-active {
    font-weight: 700;
  }
}

.mmbt-nav-separator {
  color: $mmbt-black;
  user-select: none;
}

// Mobile Drawer Styles
.mmbt-drawer {
  background: $mmbt-beige;
  border-left: 2px solid $mmbt-black;
}

.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.drawer-title {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: $mmbt-black;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.drawer-nav-link {
  color: $mmbt-black;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 0.5rem 0;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-bottom: 2px solid transparent;

  &:hover {
    letter-spacing: 0.1em;
    border-bottom-color: $mmbt-black;
  }

  &.router-link-active {
    font-weight: 900;
    border-bottom-color: $mmbt-black;
  }
}

.drawer-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 2px solid $mmbt-black;
}
</style>
