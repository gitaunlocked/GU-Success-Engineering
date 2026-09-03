<script setup>
import { useAuth } from '~/composables/useAuth'

const { isAdmin, waitForAuth } = useAuth()

onMounted(async () => {
  await waitForAuth()
  if (isAdmin.value) {
    navigateTo('/admin/admins', { replace: true })
  } else {
    navigateTo('/admin/courses', { replace: true })
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-32">
    <p class="text-gray-400">Redirecting...</p>
  </div>
</template>
