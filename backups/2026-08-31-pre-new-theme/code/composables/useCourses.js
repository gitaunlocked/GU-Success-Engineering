import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '~/src/firebase/init.js'
import { courses as staticCourses } from '~/data/courses'

// Singleton state — shared across all components
const courses = ref([...staticCourses])
const coursesLoaded = ref(false)
const coursesLoading = ref(false)

export const useCourses = () => {
  const loadCourses = async () => {
    if (coursesLoaded.value || coursesLoading.value) return
    coursesLoading.value = true

    try {
      const snapshot = await getDocs(collection(db, 'courses'))
      if (!snapshot.empty) {
        const firestoreCourses = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        firestoreCourses.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
        courses.value = firestoreCourses
      }
      coursesLoaded.value = true
    } catch (e) {
      console.error('Error loading courses from Firestore, using static fallback:', e)
      // Static fallback is already in courses.value
      coursesLoaded.value = true
    } finally {
      coursesLoading.value = false
    }
  }

  const getCourseBySlug = (slug) => {
    return courses.value.find(c => c.slug === slug)
  }

  const refreshCourses = async () => {
    coursesLoaded.value = false
    coursesLoading.value = false
    await loadCourses()
  }

  // Reliable client-side auto-load using onMounted
  onMounted(() => {
    if (!coursesLoaded.value && !coursesLoading.value) {
      loadCourses()
    }
  })

  return {
    courses,
    coursesLoaded,
    coursesLoading,
    loadCourses,
    getCourseBySlug,
    refreshCourses
  }
}
