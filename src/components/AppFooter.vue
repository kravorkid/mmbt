<template>
  <div class="mmbt-footer">
    <div class="container">
      <div class="mmbt-footer-content">
        <span class="mmbt-copyright">
          <img src="~assets/logo.png" alt="MMBT" class="mmbt-copyright-logo" />
        </span>
        <span>MMXXIV</span>
        <span>/</span>
        <a
          :href="socialLinks.instagram.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mmbt-social-link"
        >
          {{ socialLinks.instagram.name.toUpperCase() }}
        </a>
        <span>/</span>
        <a
          :href="socialLinks.twitter.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mmbt-social-link"
        >
          {{ socialLinks.twitter.name.toUpperCase() }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { socialLinks } from '../data/projects'
</script>

<style scoped lang="scss">
.mmbt-footer {
  padding: 0.5rem 2rem;
  text-align: center;
  background: $mmbt-beige;
}

.mmbt-footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: $mmbt-black;
}

.mmbt-copyright {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.mmbt-copyright-logo {
  height: 0.875rem;
  width: auto;
  display: inline-block;
  vertical-align: middle;
}

.mmbt-social-link {
  color: $mmbt-black;
  text-decoration: none;

  &:hover {
    opacity: 0.5;
  }
}
</style>
