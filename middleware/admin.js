import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on client side
  if (process.server) return

  const { waitForAuth, currentUser } = useAuth()

  // Wait for Firebase auth to finish initializing (handles refresh)
  await waitForAuth()

  if (!currentUser.value) {
    return navigateTo('/auth')
  }
})
