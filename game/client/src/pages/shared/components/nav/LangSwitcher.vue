<template>
  <div class="language-selector">
    <button @click="toggleDropdown" class="language-button">
      {{ currentLanguage }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </button>
    <div v-if="isOpen" class="dropdown">
      <div
          v-for="lang in languages"
          :key="lang.code"
          class="dropdown-item"
          @click="changeLanguage(lang.code)"
      >
        <img :src="require('@/assets/icons/lang/' + lang.flag)"
             width="48"
             height="48"
             class="pixel-image__img"
             :alt="lang.label" />
        {{ lang.label }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {ref} from "vue";
// import {useI18n} from "vue-i18n";

export default {
  setup() {
    // const { locale } = useI18n();
    const currentLanguage = 'EN'; // locale.value.toUpperCase();
    const languages = [
      // { code: 'en', label: 'English', flag: require('@/assets/flags/en.png') },
      // { code: 'pl', label: 'Polski', flag: require('@/assets/flags/pl.png') },
      { code: 'en', label: 'English', flag: 'icon-flag-en-us-24x24.svg'},
      { code: 'pl', label: 'Polski', flag: 'icon-flag-pl-24x24.svg' },
    ];

    const isOpen = ref(false);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const changeLanguage = () => {
      // locale.value = lang;
      isOpen.value = false;
    };

    return {
      currentLanguage,
      languages,
      isOpen,
      toggleDropdown,
      changeLanguage,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/components/page/buttons";

.language-selector {
  position: relative;
  display: inline-block;
}

.language-button {
  background-color: #444;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow {
  margin-left: 8px;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  border: 1px solid #ccc;
  width: 150px;
  z-index: 10;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: #555;
}

.flag {
  //width: 20px;
  //height: 14px;
  margin-right: 10px;
}
</style>
