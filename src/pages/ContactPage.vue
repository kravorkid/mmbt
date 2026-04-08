<template>
  <q-page class="flex flex-center">
    <div class="container">
      <!-- Contact Content -->
      <div :class="['contact-content', { 'mobile-layout': $q.screen.lt.md }]">
        <div class="row q-col-gutter-md q-col-gutter-md-xl">
          <div class="col-12 col-md-6">
            <h1 class="contact-title q-mb-lg">{{ $t('contact.title') }}</h1>

            <div class="row q-col-gutter-md">
              <div class="col-6 col-md-12">
                <a :href="`tel:${$t('contact.phone').replace(/\s/g, '')}`" class="contact-btn">
                  {{ $t('contact.phone') }}
                  <q-icon name="arrow_forward" size="20px" />
                </a>
              </div>
              <div class="col-6 col-md-12">
                <a :href="`mailto:${$t('contact.email')}`" class="contact-btn">
                  {{ $t('contact.email') }}
                  <q-icon name="arrow_forward" size="20px" />
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="contact-image-wrapper">
              <img src="/img/monk.jpg" alt="Never force, always flow" class="contact-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>

<style scoped lang="scss">
.contact-logo {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 60px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  @media (max-width: $breakpoint-sm-max) {
    font-size: 16px;
    margin-bottom: 40px;
  }
}

.contact-title {
  font-size: 64px;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  @media (max-width: $breakpoint-md-max) {
    font-size: 48px;
  }

  @media (max-width: $breakpoint-sm-max) {
    font-size: 3.3rem;
  }
}

.contact-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;

  @media (max-width: $breakpoint-sm-max) {
    max-width: 100%;
    gap: 12px;
  }
}

.contact-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border: 1.5px solid #000;
  border-radius: 50px;
  background: transparent;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 50%;

  @media (max-width: $breakpoint-sm-max) {
    font-size: 12px;
    padding: 8px 14px;
    width: 100%;
  }

  &:hover {
    background: #000;
    color: #fff;

    .q-icon {
      color: #fff;
    }
  }

  .q-icon {
    color: #000;
    transition: color 0.3s ease;
    margin-left: 8px;
  }
}

.contact-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0;
}

.contact-image {
  max-width: 522px;
  height: auto;
  display: block;
  object-fit: cover;
  @media (max-width: $breakpoint-sm-max) {
    max-width: 100%;
  }
}

.contact-footer {
  margin-top: 60px;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $breakpoint-sm-max) {
    margin-top: 40px;
    padding-top: 40px;
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
}

.footer-logo {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  @media (max-width: $breakpoint-sm-max) {
    font-size: 16px;
  }
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.footer-link {
  color: #000;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.05em;
  transition: opacity 0.3s ease;

  @media (max-width: $breakpoint-sm-max) {
    font-size: 12px;
  }

  &:hover {
    opacity: 0.6;
  }
}

.footer-divider {
  font-size: 14px;
  color: #000;

  @media (max-width: $breakpoint-sm-max) {
    font-size: 12px;
  }
}
</style>
