<template>
  <div>
    <button @click="changeLanguage('en')">
      EN
    </button>
    <button @click="changeLanguage('pl')">
      PL
    </button>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function changeLanguage(lang) {
  locale.value = lang;
}
</script>
