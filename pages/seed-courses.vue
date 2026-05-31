<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <h1 class="text-2xl font-bold text-orange-600 mb-4">Seed Courses to Firestore</h1>

      <div v-if="result" :class="result.success ? 'bg-green-50 text-green-700 border-green-300' : 'bg-red-50 text-red-700 border-red-300'"
        class="border p-4 rounded-lg mb-4">
        {{ result.message }}
      </div>

      <button v-if="!result?.success" @click="seedCourses" :disabled="loading"
        class="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50">
        {{ loading ? 'Seeding...' : 'Seed Existing Courses' }}
      </button>

      <NuxtLink v-else to="/admin" class="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700">
        Go to Admin Panel
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '~/src/firebase/init.js'

const loading = ref(false)
const result = ref(null)

const existingCourses = [
  {
    slug: 'introduction-to-gita',
    shortTitle: 'Introduction to Gita',
    title: 'Introduction to Gita (Beginner – 9 Sessions)',
    subtitle: 'Your first steps into the wisdom of the Bhagavad Gita',
    cardDescription: 'A beginner-friendly course to understand what the Gita is, its core message, and how it can guide your daily life with clarity and purpose.',
    image: '/course-success.svg',
    chapterLabel: 'Session',
    description1: 'The Bhagavad Gita is one of the most revered texts in the world, yet many find it difficult to approach. Where do you begin? What does it actually say, and why does it still matter today?',
    description2: '"Introduction to Gita" is designed for anyone who is curious about the Gita but has never studied it. In 9 clear sessions, you will discover the setting of the Gita, its main characters, key themes like duty and devotion, and how its wisdom applies to modern challenges.',
    chapters: [
      'What is the Bhagavad Gita?',
      'The Setting: Kurukshetra and the Dilemma',
      "Arjuna's Confusion and Krishna's Role",
      'Karma Yoga: Action with Right Attitude',
      'The Nature of the Self',
      'Bhakti: The Path of Devotion',
      'Key Verses and Their Meaning',
      'Bringing Gita into Daily Life',
      'Review and Your Path Forward'
    ],
    totalTime: '4 weeks',
    timePerWeek: '2 hours on weekends',
    level: 'Introductory level',
    certificate: 'Digital Certificate when eligible',
    feeAmount: 500,
    fee: 'Rs. 500/-'
  },
  {
    slug: 'power-of-habits',
    shortTitle: 'Power of Habits',
    title: 'Power of Habits (5 Sessions)',
    subtitle: 'Build habits that align with Gita wisdom',
    cardDescription: 'A practical course on forming lasting habits for focus, discipline, and inner growth using principles from the Gita and modern habit science.',
    image: '/course-mind-management.svg',
    chapterLabel: 'Habit',
    description1: 'Our character and destiny are shaped by the small actions we repeat every day. The Gita speaks of discipline, steady practice, and training the mind—all of which depend on building the right habits.',
    description2: '"Power of Habits" brings together timeless principles from the Bhagavad Gita and simple, evidence-based methods to help you build five core habits: morning routine, focus blocks, reflection, healthy boundaries, and consistency. Each session focuses on one habit and how to sustain it.',
    chapters: [
      'The Science and Spirituality of Habits',
      'Morning Routine: Start the Day with Intention',
      'Focus and Single-Tasking',
      'Daily Reflection and Self-Awareness',
      'Sustaining Change and Building Character'
    ],
    totalTime: '3 weeks',
    timePerWeek: '2 sessions per week',
    level: 'Beginner to Intermediate',
    certificate: 'Digital Certificate when eligible',
    feeAmount: 350,
    fee: 'Rs. 350/-'
  }
]

const seedCourses = async () => {
  loading.value = true
  result.value = null

  try {
    for (const course of existingCourses) {
      await setDoc(doc(db, 'courses', course.slug), {
        ...course,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    result.value = { success: true, message: `✅ ${existingCourses.length} courses seeded to Firestore!` }
  } catch (e) {
    console.error('Seed error:', e)
    result.value = { success: false, message: `❌ Error: ${e.message}` }
  } finally {
    loading.value = false
  }
}
</script>
