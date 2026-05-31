<template>
  <SuccessEngineeringLanding v-if="SHOW_SUCCESS_ENGINEERING" />
  <HomePageComponents v-else />
</template>

<script setup>
import { SHOW_SUCCESS_ENGINEERING } from "~/config/site";
import HomePageComponents from "../components/HomePageComponents.vue";
import SuccessEngineeringLanding from "../components/success-engineering/Landing.vue";

// The landing page is fully self-contained (it ships its own nav + footer),
// so it uses a blank layout. The original homepage keeps the default layout
// (global nav + footer). Flip SHOW_SUCCESS_ENGINEERING in ~/config/site.js to
// bring the original homepage back.
definePageMeta({ layout: "landing" });

if (!SHOW_SUCCESS_ENGINEERING) {
  setPageLayout("default");
}
</script>
