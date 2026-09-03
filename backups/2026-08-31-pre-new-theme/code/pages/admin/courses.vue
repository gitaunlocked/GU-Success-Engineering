<template>
  <div class="space-y-6">
    <!-- Create / Edit Course -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ editingCourse ? 'Edit Course' : 'Create New Course' }}</h2>

      <div v-if="courseMsg" :class="courseMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-300' : 'bg-red-50 text-red-700 border-red-300'"
        class="border p-3 rounded-lg mb-4 text-sm">
        {{ courseMsg.text }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Short Title *</label>
          <input v-model="courseForm.shortTitle" type="text" placeholder="e.g. Intro to Gita" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Course URL (auto-generated)</label>
          <div class="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600 min-h-[42px] flex items-center">
            <span v-if="courseForm.slug" class="text-blue-600 break-all">{{ siteBaseUrl }}/courses/{{ courseForm.slug }}</span>
            <span v-else class="text-gray-400">Will be generated from Short Title</span>
          </div>
          <p class="text-xs text-gray-400 mt-1">Auto-generated from the short title. Duplicates are handled automatically.</p>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Full Title *</label>
          <input v-model="courseForm.title" type="text" placeholder="e.g. Introduction to Gita (Beginner – 9 Sessions)" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Subtitle *</label>
          <input v-model="courseForm.subtitle" type="text" placeholder="e.g. Your first steps into wisdom" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Card Description *</label>
          <textarea v-model="courseForm.cardDescription" rows="2" placeholder="Short description for course cards" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Description *</label>
          <textarea v-model="courseForm.description" rows="5" placeholder="Course description (use new lines for multiple paragraphs)" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Course Image *</label>
          <input type="file" accept="image/*" @change="handleImageUpload"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-100 file:text-orange-700 file:font-semibold hover:file:bg-orange-200" />
          <div v-if="imageUploading" class="flex items-center gap-2 text-sm text-orange-600 mt-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Uploading image...
          </div>
          <div v-if="courseForm.image" class="mt-2">
            <img :src="courseForm.image" alt="Preview" class="h-24 w-auto rounded-lg border object-contain bg-gray-50" />
            <p class="text-xs text-green-600 mt-1">✓ Image uploaded</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Chapter Label *</label>
          <input v-model="courseForm.chapterLabel" type="text" placeholder="e.g. Session, Habit, Module" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Total Duration (optional)</label>
          <input v-model="courseForm.totalTime" type="text" placeholder="e.g. 4 weeks"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Time Per Week (optional)</label>
          <input v-model="courseForm.timePerWeek" type="text" placeholder="e.g. 2 hours on weekends"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Level *</label>
          <input v-model="courseForm.level" type="text" placeholder="e.g. Introductory level" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Certificate (optional)</label>
          <input v-model="courseForm.certificate" type="text" placeholder="e.g. Digital Certificate when eligible"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600 mb-1">Fee (₹) *</label>
          <input v-model.number="courseForm.feeAmount" type="number" placeholder="e.g. 500" min="0" required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
        </div>

        <!-- Chapters -->
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-gray-600 mb-2">Chapters / Sessions *</label>
          <div v-for="(chapter, index) in courseForm.chapters" :key="index" class="flex gap-2 mb-2">
            <span class="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-500 min-w-[40px] text-center">{{ index + 1 }}</span>
            <input v-model="courseForm.chapters[index]" type="text" :placeholder="'Chapter ' + (index + 1)"
              class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <button @click="courseForm.chapters.splice(index, 1)" v-if="courseForm.chapters.length > 1"
              class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-bold">✕</button>
          </div>
          <button @click="courseForm.chapters.push('')"
            class="mt-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-semibold">
            + Add Chapter
          </button>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button @click="saveCourse" :disabled="savingCourse"
          class="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50">
          {{ savingCourse ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course') }}
        </button>
        <button v-if="editingCourse" @click="cancelCourseEdit"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </div>

    <!-- Courses List -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">All Courses ({{ coursesList.length }})</h2>
      <div v-if="coursesList.length === 0" class="text-gray-500 text-center py-8">No courses yet. Create one above or seed existing courses at /seed-courses.</div>
      <div v-else class="space-y-4">
        <div v-for="course in coursesList" :key="course.id"
          class="border rounded-lg p-4 hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ course.title }}</h3>
              <p class="text-sm text-gray-500 mt-1">
                URL: <a :href="`/courses/${course.slug}`" target="_blank" class="text-blue-600 hover:underline">{{ siteBaseUrl }}/courses/{{ course.slug }}</a>
                | Fee: ₹{{ course.feeAmount }} | {{ course.chapters?.length || 0 }} chapters | {{ course.level }}
              </p>
              <p class="text-sm text-gray-600 mt-1">{{ course.cardDescription }}</p>
            </div>
            <div v-if="isAdmin || course.createdBy === currentUser?.uid" class="flex gap-2 ml-4 shrink-0">
              <button @click="editCourseItem(course)"
                class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm font-semibold">
                Edit
              </button>
              <button @click="deleteCourse(course)"
                class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-semibold">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '~/src/firebase/init.js'
import { useAuth } from '~/composables/useAuth'
import { useAdminData } from '~/composables/useAdminData'

const { currentUser, isAdmin } = useAuth()
const { coursesList, loadCourses } = useAdminData()

const reqUrl = useRequestURL()
const siteBaseUrl = computed(() => `${reqUrl.protocol}//${reqUrl.host}`)

const editingCourse = ref(null)
const savingCourse = ref(false)
const courseMsg = ref(null)
const imageUploading = ref(false)

const emptyCourseForm = () => ({
  slug: '', shortTitle: '', title: '', subtitle: '', cardDescription: '',
  image: '', chapterLabel: '', description: '',
  chapters: [''], totalTime: '', timePerWeek: '', level: '',
  certificate: '', feeAmount: 0
})
const courseForm = reactive(emptyCourseForm())

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const makeUniqueSlug = (baseSlug) => {
  const existingSlugs = coursesList.value.map(c => c.slug)
  if (editingCourse.value) {
    const idx = existingSlugs.indexOf(editingCourse.value.slug)
    if (idx !== -1) existingSlugs.splice(idx, 1)
  }
  if (!existingSlugs.includes(baseSlug)) return baseSlug
  let counter = 2
  while (existingSlugs.includes(`${baseSlug}-${counter}`)) {
    counter++
  }
  return `${baseSlug}-${counter}`
}

watch(() => courseForm.shortTitle, (newShortTitle) => {
  if (!editingCourse.value && newShortTitle) {
    const baseSlug = generateSlug(newShortTitle)
    courseForm.slug = makeUniqueSlug(baseSlug)
  }
})

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  imageUploading.value = true
  try {
    const formData = new FormData()
    formData.append('image', file)

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || ''
    const res = await $fetch(`${apiBase}/api/upload-image`, {
      method: 'POST',
      body: formData
    })

    courseForm.image = res.url
    courseMsg.value = { type: 'success', text: 'Image uploaded successfully!' }
  } catch (e) {
    console.error('Image upload error:', e)
    courseMsg.value = { type: 'error', text: e.data?.statusMessage || 'Failed to upload image.' }
  } finally {
    imageUploading.value = false
  }
}

const saveCourse = async () => {
  const requiredFields = ['slug', 'shortTitle', 'title', 'subtitle', 'cardDescription',
    'image', 'chapterLabel', 'description', 'level']
  for (const field of requiredFields) {
    if (!courseForm[field] || !String(courseForm[field]).trim()) {
      courseMsg.value = { type: 'error', text: `Field "${field}" is required.` }
      return
    }
  }
  if (!courseForm.feeAmount && courseForm.feeAmount !== 0) {
    courseMsg.value = { type: 'error', text: 'Fee amount is required.' }
    return
  }
  const validChapters = courseForm.chapters.filter(c => c.trim())
  if (validChapters.length === 0) {
    courseMsg.value = { type: 'error', text: 'At least one chapter is required.' }
    return
  }

  savingCourse.value = true
  courseMsg.value = null

  try {
    const courseData = {
      slug: courseForm.slug.trim(),
      shortTitle: courseForm.shortTitle.trim(),
      title: courseForm.title.trim(),
      subtitle: courseForm.subtitle.trim(),
      cardDescription: courseForm.cardDescription.trim(),
      image: courseForm.image.trim(),
      chapterLabel: courseForm.chapterLabel.trim(),
      description: courseForm.description.trim(),
      chapters: validChapters,
      totalTime: (courseForm.totalTime || '').trim(),
      timePerWeek: (courseForm.timePerWeek || '').trim(),
      level: courseForm.level.trim(),
      certificate: (courseForm.certificate || '').trim(),
      feeAmount: Number(courseForm.feeAmount),
      fee: `Rs. ${Number(courseForm.feeAmount)}/-`,
      updatedAt: new Date().toISOString()
    }

    if (!editingCourse.value) {
      courseData.createdAt = new Date().toISOString()
      courseData.createdBy = currentUser.value.uid
    }

    await setDoc(doc(db, 'courses', courseData.slug), courseData, { merge: true })

    courseMsg.value = { type: 'success', text: editingCourse.value ? `Course "${courseData.title}" updated!` : `Course "${courseData.title}" created!` }
    cancelCourseEdit()
    await loadCourses()
  } catch (e) {
    console.error('Save course error:', e)
    courseMsg.value = { type: 'error', text: e.message }
  } finally {
    savingCourse.value = false
  }
}

const editCourseItem = (course) => {
  editingCourse.value = course
  Object.assign(courseForm, {
    slug: course.slug,
    shortTitle: course.shortTitle,
    title: course.title,
    subtitle: course.subtitle,
    cardDescription: course.cardDescription,
    image: course.image,
    chapterLabel: course.chapterLabel,
    description: course.description || [course.description1, course.description2].filter(Boolean).join('\n\n'),
    chapters: [...(course.chapters || [''])],
    totalTime: course.totalTime,
    timePerWeek: course.timePerWeek || '',
    level: course.level,
    certificate: course.certificate || '',
    feeAmount: course.feeAmount
  })
  courseMsg.value = null
}

const cancelCourseEdit = () => {
  editingCourse.value = null
  Object.assign(courseForm, emptyCourseForm())
}

const deleteCourse = async (course) => {
  if (!confirm(`Delete course "${course.title}"? This cannot be undone.`)) return

  try {
    await deleteDoc(doc(db, 'courses', course.id))
    await loadCourses()
  } catch (e) {
    console.error('Delete course error:', e)
  }
}
</script>
