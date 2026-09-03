<template>
  <div class="flex flex-col min-h-screen">
    <NavLinks />
    <div class="flex-1">
      <slot />
    </div>
    <FooterInHomePage />
  </div>
</template>

<script setup>
import NavLinks from "~/components/NavLinks.vue";
import FooterInHomePage from "~/components/FooterInHomePage.vue";
</script>
