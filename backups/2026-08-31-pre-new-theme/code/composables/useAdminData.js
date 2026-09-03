import { ref, reactive, computed, watch } from 'vue'
import { collection, getDocs, query, where, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '~/src/firebase/init.js'
import { useAuth } from '~/composables/useAuth'

const loaded = ref(false)
const admins = ref([])
const enrollments = ref([])
const coupons = ref([])
const coursesList = ref([])
const allCoursesList = ref([])

export function useAdminData() {
  const { currentUser, isAdmin } = useAuth()

  const loadAdmins = async () => {
    try {
      const q = query(collection(db, 'users'), where('role', '==', 'admin'))
      const snapshot = await getDocs(q)
      admins.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (e) {
      console.error('Error loading admins:', e)
    }
  }

  const loadCourses = async () => {
    try {
      let snapshot
      if (isAdmin.value) {
        snapshot = await getDocs(collection(db, 'courses'))
      } else {
        const q = query(collection(db, 'courses'), where('createdBy', '==', currentUser.value.uid))
        snapshot = await getDocs(q)
      }
      coursesList.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      coursesList.value.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    } catch (e) {
      console.error('Error loading courses:', e)
    }
  }

  const loadAllCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'courses'))
      allCoursesList.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      allCoursesList.value.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    } catch (e) {
      console.error('Error loading all courses:', e)
    }
  }

  const loadCoupons = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'coupons'))
      coupons.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      coupons.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (e) {
      console.error('Error loading coupons:', e)
    }
  }

  const loadEnrollments = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'enrollments'))
      let allEnrollments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      if (!isAdmin.value) {
        const ownCourseSlugs = coursesList.value.map(c => c.slug)
        allEnrollments = allEnrollments.filter(e => ownCourseSlugs.includes(e.courseSlug))
      }
      enrollments.value = allEnrollments
      enrollments.value.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    } catch (e) {
      console.error('Error loading enrollments:', e)
    }
  }

  const loadAllData = async () => {
    if (loaded.value) return
    await loadAdmins()
    await loadCourses()
    await loadAllCourses()
    await loadCoupons()
    await loadEnrollments()
    loaded.value = true
  }

  const refreshData = async () => {
    loaded.value = false
    await loadAdmins()
    await loadCourses()
    await loadAllCourses()
    await loadCoupons()
    await loadEnrollments()
    loaded.value = true
  }

  return {
    loaded,
    admins,
    enrollments,
    coupons,
    coursesList,
    allCoursesList,
    loadAdmins,
    loadCourses,
    loadAllCourses,
    loadCoupons,
    loadEnrollments,
    loadAllData,
    refreshData
  }
}
