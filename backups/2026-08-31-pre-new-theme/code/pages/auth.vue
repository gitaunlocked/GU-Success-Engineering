<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-orange-600 text-center mb-2">Gita Unlocked</h1>
      <h2 class="text-xl text-gray-600 text-center mb-6">Admin Access</h2>

      <div v-if="error" class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg mb-4">
        ❌ {{ error }}
      </div>

      <div v-if="success" class="bg-green-50 border border-green-300 text-green-700 p-4 rounded-lg mb-4">
        ✅ {{ success }}
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 font-semibold mb-2">Access Password</label>
        <input v-model="accessPassword" type="password" required placeholder="Enter access password"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
      </div>

      <button @click="signInWithGoogle" :disabled="loading"
        class="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 hover:border-orange-500 disabled:opacity-50 transition">
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {{ loading ? 'Signing in...' : 'Sign in with Google' }}
      </button>

      <p class="text-center text-gray-500 text-xs mt-6">
        Enter the access password first, then sign in with Google.<br/>
        Admin access only. General users don't need to log in.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '~/src/firebase/init.js'
import { ADMIN_EMAIL } from '~/composables/useAuth'

const ACCESS_PASSWORD = 'GitaUnlocked@108'

const accessPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const signInWithGoogle = async () => {
  // Validate password first
  if (accessPassword.value !== ACCESS_PASSWORD) {
    error.value = 'Incorrect access password.'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if user doc exists
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const role = userDoc.data().role
      if (role === 'admin') {
        navigateTo('/admin')
      } else {
        // Existing user, not admin — let them view but no admin powers
        navigateTo('/admin')
      }
    } else {
      // New user — only gitaunlocked gets admin, others get user
      const role = user.email === ADMIN_EMAIL ? 'admin' : 'user'
      await setDoc(userDocRef, {
        email: user.email,
        role,
        displayName: user.displayName || '',
        createdAt: new Date().toISOString()
      })
      navigateTo('/admin')
    }
  } catch (e) {
    console.error('Google sign-in error:', e)
    if (e.code === 'auth/popup-closed-by-user') {
      error.value = 'Sign-in was cancelled.'
    } else if (e.code === 'auth/popup-blocked') {
      error.value = 'Pop-up blocked by browser. Please allow pop-ups and try again.'
    } else {
      error.value = e.message
    }
    // Sign out if error
    try { await auth.signOut() } catch (_) {}
  } finally {
    loading.value = false
  }
}
</script>
