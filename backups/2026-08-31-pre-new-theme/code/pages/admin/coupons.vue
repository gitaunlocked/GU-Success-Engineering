<template>
  <div class="space-y-6">
    <!-- Create Coupon -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ editingCoupon ? 'Edit Coupon' : 'Create New Coupon' }}</h2>

      <div v-if="couponMsg" :class="couponMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-300' : 'bg-red-50 text-red-700 border-red-300'"
        class="border p-3 rounded-lg mb-4 text-sm">
        {{ couponMsg.text }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Coupon Code</label>
          <input v-model="couponForm.code" type="text" placeholder="e.g. SAVE50"
            :disabled="!!editingCoupon"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none uppercase disabled:bg-gray-100" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Discount Type</label>
          <select v-model="couponForm.discountType"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
            <option value="fixed">Reduce by Fixed Amount (₹)</option>
            <option value="percentage">Reduce by Percentage (%)</option>
            <option value="final_price">Set Final Price (₹)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">
            {{ couponForm.discountType === 'percentage' ? 'Reduce by (%)' : couponForm.discountType === 'final_price' ? 'Final Price (₹)' : 'Reduce by (₹)' }}
          </label>
          <input v-model.number="couponForm.discountValue" type="number" placeholder="e.g. 100" min="0"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
      </div>

      <!-- Course Applicability -->
      <div class="mt-4">
        <label class="block text-sm font-semibold text-gray-600 mb-2">Applies To</label>
        <div class="flex items-center gap-3 mb-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" :value="true" v-model="couponForm.allCourses"
              class="w-4 h-4 text-orange-600 focus:ring-orange-500" />
            <span class="text-sm text-gray-700">All Courses</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" :value="false" v-model="couponForm.allCourses"
              class="w-4 h-4 text-orange-600 focus:ring-orange-500" />
            <span class="text-sm text-gray-700">Specific Courses</span>
          </label>
        </div>
        <div v-if="!couponForm.allCourses" class="ml-1 space-y-1 max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
          <div v-if="allCoursesList.length === 0" class="text-gray-400 text-sm">No courses found. Create courses first.</div>
          <label v-for="course in allCoursesList" :key="course.slug" class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" :value="course.slug"
              v-model="couponForm.courseIds"
              class="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
            <span class="text-sm text-gray-700">{{ course.shortTitle || course.title }}</span>
          </label>
        </div>
        <p v-if="!couponForm.allCourses && couponForm.courseIds.length === 0" class="text-xs text-red-500 mt-1">Please select at least one course.</p>
      </div>

      <div class="flex gap-3 mt-4">
        <button @click="saveCoupon" :disabled="savingCoupon"
          class="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50">
          {{ savingCoupon ? 'Saving...' : (editingCoupon ? 'Update Coupon' : 'Create Coupon') }}
        </button>
        <button v-if="editingCoupon" @click="cancelEdit"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </div>

    <!-- Coupons List -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Active Coupons ({{ coupons.length }})</h2>
      <div v-if="coupons.length === 0" class="text-gray-500 text-center py-8">No coupons yet. Create one above.</div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="px-4 py-3 text-sm font-semibold text-gray-600">Code</th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-600">Type</th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-600">Value</th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-600">Applies To</th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-600">Created</th>
              <th class="px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-bold text-orange-600">{{ coupon.code }}</td>
              <td class="px-4 py-3 text-sm capitalize">{{ coupon.discountType === 'final_price' ? 'Final Price' : coupon.discountType }}</td>
              <td class="px-4 py-3 text-sm font-semibold">
                <span v-if="coupon.discountType === 'percentage'">{{ coupon.discountValue }}%</span>
                <span v-else>₹{{ coupon.discountValue }}</span>
              </td>
              <td class="px-4 py-3 text-sm">
                <span v-if="coupon.allCourses !== false" class="text-green-600 font-medium">All Courses</span>
                <span v-else class="text-blue-600">
                  {{ coupon.courseIds && coupon.courseIds.length ? coupon.courseIds.join(', ') : 'None' }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ coupon.createdAt ? new Date(coupon.createdAt).toLocaleDateString() : '-' }}</td>
              <td class="px-4 py-3 text-sm space-x-2">
                <button @click="editCoupon(coupon)"
                  class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 font-semibold">
                  Edit
                </button>
                <button @click="deleteCoupon(coupon)"
                  class="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 font-semibold">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '~/src/firebase/init.js'
import { useAuth } from '~/composables/useAuth'
import { useAdminData } from '~/composables/useAdminData'

const { currentUser } = useAuth()
const { coupons, allCoursesList, loadCoupons } = useAdminData()

const editingCoupon = ref(null)
const savingCoupon = ref(false)
const couponMsg = ref(null)
const couponForm = reactive({ code: '', discountType: 'fixed', discountValue: 0, allCourses: true, courseIds: [] })

const saveCoupon = async () => {
  const code = couponForm.code.trim().toUpperCase()
  if (!code) {
    couponMsg.value = { type: 'error', text: 'Please enter a coupon code.' }
    return
  }
  if (couponForm.discountValue <= 0) {
    couponMsg.value = { type: 'error', text: 'Discount value must be greater than 0.' }
    return
  }
  if (couponForm.discountType === 'percentage' && couponForm.discountValue > 100) {
    couponMsg.value = { type: 'error', text: 'Percentage cannot exceed 100%.' }
    return
  }
  if (!couponForm.allCourses && couponForm.courseIds.length === 0) {
    couponMsg.value = { type: 'error', text: 'Please select at least one course for this coupon.' }
    return
  }

  savingCoupon.value = true
  couponMsg.value = null

  try {
    const couponData = {
      code,
      discountType: couponForm.discountType,
      discountValue: couponForm.discountValue,
      allCourses: couponForm.allCourses,
      courseIds: couponForm.allCourses ? [] : [...couponForm.courseIds],
      updatedAt: new Date().toISOString()
    }

    if (!editingCoupon.value) {
      couponData.createdAt = new Date().toISOString()
      couponData.createdBy = currentUser.value.uid
    }

    await setDoc(doc(db, 'coupons', code), couponData, { merge: true })

    couponMsg.value = { type: 'success', text: editingCoupon.value ? `Coupon ${code} updated!` : `Coupon ${code} created!` }
    cancelEdit()
    await loadCoupons()
  } catch (e) {
    console.error('Save coupon error:', e)
    couponMsg.value = { type: 'error', text: e.message }
  } finally {
    savingCoupon.value = false
  }
}

const editCoupon = (coupon) => {
  editingCoupon.value = coupon
  couponForm.code = coupon.code
  couponForm.discountType = coupon.discountType
  couponForm.discountValue = coupon.discountValue
  couponForm.allCourses = coupon.allCourses !== false
  couponForm.courseIds = coupon.courseIds ? [...coupon.courseIds] : []
  couponMsg.value = null
}

const cancelEdit = () => {
  editingCoupon.value = null
  couponForm.code = ''
  couponForm.discountType = 'fixed'
  couponForm.discountValue = 0
  couponForm.allCourses = true
  couponForm.courseIds = []
}

const deleteCoupon = async (coupon) => {
  if (!confirm(`Delete coupon "${coupon.code}"?`)) return

  try {
    await deleteDoc(doc(db, 'coupons', coupon.id))
    await loadCoupons()
  } catch (e) {
    console.error('Delete coupon error:', e)
  }
}
</script>
