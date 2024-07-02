<template>
  <div class="language-selector__wrapper">
    <button @click="toggleDropdown" class="language-button language-selector-toggler__wrapper">
      <span class="language-selector-toggler__label">
        {{ $t(localeLabel) }}
      </span>
      <img src="@/assets/icons/nav/arrow-down-12x12.png"
           alt="Arrow down icon"
           class="language-selector-toggler__image pixel-image__img"
           :class="{ 'language-selector-toggler__image--open': isOpen }"
           width="24"
           height="24"
      />
    </button>
    <div v-if="isOpen" class="language-selector-dropdown__wrapper">
      <div v-for="lang in languages"
           :key="lang.code"
           class="language-selector-dropdown__item"
           @click="changeLanguage(lang.code)"
      >
        <img :src="require('@/assets/icons/lang/' + lang.flag)"
             width="48"
             height="48"
             class="pixel-image__img language-selector-dropdown__flag"
             :alt="$t(lang.label)"/>
        {{ $t(lang.label) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {APP_LANGUAGES} from "@/constants/nav/languages.constant";
import {LanguageService} from "@/services/language.service";

export default {
  setup() {
    const {locale} = useI18n();
    const localeLabel = ref<string>('');
    const languages = APP_LANGUAGES;
    const isOpen = ref(false);
    let LanguageServiceInstance = null;

    onMounted(() => {
      LanguageServiceInstance = LanguageService;
      changeLanguage(LanguageServiceInstance.getLanguage());
    });

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const changeLanguage = (newLocaleCode: string) => {
      const newLocaleObject = languages.find(item => item.code === newLocaleCode);
      isOpen.value = false;
      if (!newLocaleObject) {
        return;
      }

      locale.value = newLocaleObject.code;
      localeLabel.value = newLocaleObject.label;
      LanguageServiceInstance.changeLanguage(newLocaleObject.code);
    };

    return {
      localeLabel,
      languages,
      isOpen,
      toggleDropdown,
      changeLanguage,
    };
  },
};
</script>
<style lang="scss" scoped>
@import 'lang-switcher';
</style>
