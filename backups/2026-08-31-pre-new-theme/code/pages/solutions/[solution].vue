<template>
  <div class="px-2">
    <component :is="dynamicComponent" />
  </div>
</template>

<script setup>
import { shallowRef, h, onMounted } from 'vue';

const route = useRoute();
const solution = route.params.solution;

const dynamicComponent = shallowRef(null);

onMounted(async () => {
  try {
    const module = await import(`../../components/${solution}.vue`);
    dynamicComponent.value = module.default;
  } catch (error) {
    console.warn(`Component '${solution}.vue' not found. Loading fallback.`, error);
    
    const fallbackModule = await import('../../components/DefaultFallback.vue');
    dynamicComponent.value = h(fallbackModule.default, { missingPage: solution });
  }
});
</script>
