<template>
  <div class="space-y-6">
    <!-- Current Admins List -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Current Admins ({{ admins.length }})</h2>
      <p class="text-sm text-gray-500 mb-4">Admins can sign in via Google at /auth with the shared access password.</p>
      <div v-if="admins.length === 0" class="text-gray-500">No admins found.</div>
      <div v-else class="space-y-3">
        <div v-for="admin in admins" :key="admin.id"
          class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <p class="font-semibold text-gray-800">
              {{ admin.email }}
              <span class="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-bold">
                Admin
              </span>
            </p>
            <p class="text-sm text-gray-500">Added: {{ new Date(admin.createdAt).toLocaleDateString() }}</p>
          </div>
          <span v-if="admin.email === currentUser?.email" class="text-sm text-green-600 font-semibold">You</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useAdminData } from '~/composables/useAdminData'

const { currentUser } = useAuth()
const { admins } = useAdminData()
</script>
