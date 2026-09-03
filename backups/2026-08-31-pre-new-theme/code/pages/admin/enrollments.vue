<template>
  <div class="space-y-6">
    <!-- Overall Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl shadow p-5 text-center">
        <p class="text-3xl font-bold text-blue-600">{{ enrollments.length }}</p>
        <p class="text-sm text-gray-500 mt-1">Total Enrollments</p>
      </div>
      <div class="bg-white rounded-xl shadow p-5 text-center">
        <p class="text-3xl font-bold text-green-600">{{ enrollments.filter(e => e.status === 'completed').length }}</p>
        <p class="text-sm text-gray-500 mt-1">Completed</p>
      </div>
      <div class="bg-white rounded-xl shadow p-5 text-center">
        <p class="text-3xl font-bold text-yellow-600">{{ enrollments.filter(e => e.status === 'pending_payment').length }}</p>
        <p class="text-sm text-gray-500 mt-1">Pending Payment</p>
      </div>
      <div class="bg-white rounded-xl shadow p-5 text-center">
        <p class="text-3xl font-bold text-purple-600">₹{{ enrollments.filter(e => e.status === 'completed').reduce((sum, e) => sum + (e.total || 0), 0) }}</p>
        <p class="text-sm text-gray-500 mt-1">Total Revenue</p>
      </div>
    </div>

    <!-- Course filter -->
    <div class="bg-white rounded-xl shadow p-4 flex flex-wrap items-center gap-3">
      <span class="text-sm font-semibold text-gray-600">Filter by course:</span>
      <button @click="enrollmentFilter = 'all'"
        :class="enrollmentFilter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'"
        class="px-4 py-2 rounded-lg text-sm font-semibold hover:shadow transition">
        All ({{ enrollments.length }})
      </button>
      <button v-for="group in enrollmentsByCourseSorted" :key="group.courseSlug"
        @click="enrollmentFilter = group.courseSlug"
        :class="enrollmentFilter === group.courseSlug ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'"
        class="px-4 py-2 rounded-lg text-sm font-semibold hover:shadow transition">
        {{ group.courseTitle }} ({{ group.students.length }})
      </button>
    </div>

    <!-- Course-wise sections -->
    <div v-if="enrollments.length === 0" class="bg-white rounded-xl shadow p-8 text-center text-gray-500">
      No enrollments yet.
    </div>

    <div v-for="group in filteredEnrollmentGroups" :key="group.courseSlug"
      class="bg-white rounded-xl shadow overflow-hidden">

      <!-- Course header -->
      <div class="bg-gradient-to-r from-orange-50 to-purple-50 px-6 py-4 border-b flex justify-between items-center">
        <div>
          <h3 class="text-lg font-bold text-gray-800">{{ group.courseTitle }}</h3>
          <p class="text-sm text-gray-500">{{ group.students.length }} student{{ group.students.length !== 1 ? 's' : '' }} enrolled</p>
        </div>
        <div class="flex gap-4 text-sm">
          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            {{ group.students.filter(s => s.status === 'completed').length }} completed
          </span>
          <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
            {{ group.students.filter(s => s.status === 'pending_payment').length }} pending
          </span>
          <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
            ₹{{ group.students.filter(s => s.status === 'completed').reduce((sum, s) => sum + (s.total || 0), 0) }} revenue
          </span>
        </div>
      </div>

      <!-- Students table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">#</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Phone</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Coupon</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Payment ID</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Enrolled On</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, idx) in group.students" :key="student.id"
              class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 text-sm text-gray-400">{{ idx + 1 }}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-800">{{ student.name }}</td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ student.email }}</td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ student.phone }}</td>
              <td class="px-4 py-3 text-sm font-semibold text-gray-700">₹{{ student.total }}</td>
              <td class="px-4 py-3 text-sm">
                <span v-if="student.appliedCoupon" class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">
                  {{ student.appliedCoupon }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-4 py-3 text-sm">
                <span v-if="student.razorpayPaymentId" class="text-blue-600 font-mono text-xs">
                  {{ student.razorpayPaymentId }}
                </span>
                <span v-else-if="student.total === 0" class="text-gray-400 text-xs">Free</span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <span :class="student.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
                    class="px-2 py-1 rounded-full text-xs font-semibold">
                    {{ student.status === 'completed' ? '✓ Completed' : '⏳ Pending' }}
                  </span>
                  <button v-if="isAdmin && student.status === 'pending_payment'"
                    @click="markEnrollmentCompleted(student)"
                    class="text-xs text-green-600 hover:text-green-800 underline font-semibold"
                    title="Manually mark as completed">
                    Mark Paid
                  </button>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">
                {{ student.timestamp ? new Date(student.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/src/firebase/init.js'
import { useAuth } from '~/composables/useAuth'
import { useAdminData } from '~/composables/useAdminData'

const { currentUser, isAdmin } = useAuth()
const { enrollments, loadEnrollments } = useAdminData()

const enrollmentFilter = ref('all')

const enrollmentsByCourseSorted = computed(() => {
  const groups = {}
  for (const e of enrollments.value) {
    const slug = e.courseSlug || 'unknown'
    if (!groups[slug]) {
      groups[slug] = {
        courseSlug: slug,
        courseTitle: e.courseTitle || slug,
        students: []
      }
    }
    groups[slug].students.push(e)
  }
  for (const g of Object.values(groups)) {
    g.students.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
  }
  return Object.values(groups).sort((a, b) => b.students.length - a.students.length)
})

const filteredEnrollmentGroups = computed(() => {
  if (enrollmentFilter.value === 'all') return enrollmentsByCourseSorted.value
  return enrollmentsByCourseSorted.value.filter(g => g.courseSlug === enrollmentFilter.value)
})

const markEnrollmentCompleted = async (student) => {
  if (!confirm(`Mark enrollment for "${student.name}" as completed (paid)?`)) return
  try {
    await updateDoc(doc(db, 'enrollments', student.id), {
      status: 'completed',
      manuallyMarkedBy: currentUser.value.email,
      manuallyMarkedAt: new Date().toISOString()
    })
    await loadEnrollments()
  } catch (e) {
    console.error('Error marking enrollment completed:', e)
    alert('Failed to update enrollment status.')
  }
}
</script>
