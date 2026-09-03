<template>
  <div>
    <!-- Admin Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3">
            <NuxtLink to="/" class="text-xl font-bold text-orange-600 hover:text-orange-700">
              GITA UNLOCKED
            </NuxtLink>
            <span class="text-gray-300">|</span>
            <span class="text-gray-600 font-medium">Admin Panel</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
              <p class="text-sm text-gray-700 font-medium">{{ currentUser?.email }}</p>
              <p class="text-xs">
                <span v-if="isAdmin" class="text-orange-600 font-semibold">Admin</span>
                <span v-else class="text-blue-600 font-semibold">Creator</span>
              </p>
            </div>
            <NuxtLink to="/" class="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              View Site
            </NuxtLink>
            <button @click="handleLogout" class="px-3 py-1.5 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Tab Navigation -->
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-1 overflow-x-auto">
          <NuxtLink v-if="isAdmin" to="/admin/admins"
            :class="route.path === '/admin/admins' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition">
            👥 Manage Admins
          </NuxtLink>
          <NuxtLink to="/admin/coupons"
            :class="route.path === '/admin/coupons' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition">
            🎟️ Coupons
          </NuxtLink>
          <NuxtLink to="/admin/courses"
            :class="route.path === '/admin/courses' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition">
            📚 Courses
          </NuxtLink>
          <NuxtLink to="/admin/enrollments"
            :class="route.path === '/admin/enrollments' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition">
            📋 Enrollments
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading -->
    <div v-if="authLoading" class="flex justify-center items-center h-64">
      <p class="text-gray-500 text-lg">Loading...</p>
    </div>

    <!-- Page Content -->
    <main v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useAdminData } from '~/composables/useAdminData'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const route = useRoute()
const { currentUser, isAdmin, authLoading, waitForAuth, logout } = useAuth()
const { loadAllData } = useAdminData()

const handleLogout = async () => {
  await logout()
}

onMounted(async () => {
  await waitForAuth()
  if (currentUser.value) {
    await loadAllData()
  }
})
</script>
