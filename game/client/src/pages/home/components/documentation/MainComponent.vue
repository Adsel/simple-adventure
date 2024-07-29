<template>
  <div>
    Login -
    min. {{ authRequirements.fields.login.min }} znaków,
    maks. {{ authRequirements.fields.login.max }} znaków
    {{ authRequirements.fields.login.unique ? ', unikalny' : '' }}
    Hasło -
    min. {{ authRequirements.fields.password.min }} znaków,
    maks. {{ authRequirements.fields.password.max }} znaków
    1 znak specjalny ({{ authRequirements.fields.password.rules.char}}),
    min 1 cyfra,
    min 1 litera
    Adres e-mail -
    min. {{ authRequirements.fields.mail.min }} znaków,
    maks. {{ authRequirements.fields.mail.max }} znaków
    {{ authRequirements.fields.login.unique ? ', unikalny' : '' }}
    unikalny
  </div>
</template>
<script setup lang="ts">
import {AUTH_REQUIREMENTS} from "@/config/auth.config";

const authRequirements = AUTH_REQUIREMENTS;
</script>
<style scoped lang="scss"></style>
