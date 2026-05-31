import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '~/src/firebase/init.js'

export const ADMIN_EMAIL = 'gitaunlocked@gmail.com'

const currentUser = ref(null)
const userRole = ref(null)
const isAdmin = ref(false)
const authLoading = ref(true)
const authReady = ref(false)

let initialized = false
let authReadyResolve = null
const authReadyPromise = new Promise((resolve) => {
  authReadyResolve = resolve
})

export const useAuth = () => {
  const initAuth = () => {
    if (initialized) return
    initialized = true

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser.value = user
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            userRole.value = userDoc.data().role
            isAdmin.value = userDoc.data().role === 'admin'
          }
        } catch (e) {
          console.error('Error fetching user role:', e)
        }
      } else {
        currentUser.value = null
        userRole.value = null
        isAdmin.value = false
      }
      authLoading.value = false
      authReady.value = true
      if (authReadyResolve) {
        authReadyResolve()
        authReadyResolve = null
      }
    })
  }

  // Returns a promise that resolves once Firebase auth state is known
  const waitForAuth = () => {
    if (authReady.value) return Promise.resolve()
    return authReadyPromise
  }

  const logout = async () => {
    await signOut(auth)
    currentUser.value = null
    userRole.value = null
    isAdmin.value = false
    navigateTo('/')
  }

  if (process.client) {
    initAuth()
  }

  return {
    currentUser,
    userRole,
    isAdmin,
    authLoading,
    authReady,
    waitForAuth,
    logout
  }
}
