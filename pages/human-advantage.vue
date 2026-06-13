<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-pink-50 to-white text-gray-800 antialiased">
    <div class="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#7A10FF]/10 blur-3xl"></div>

    <header class="relative z-10 mx-auto flex max-w-3xl items-center justify-center px-4 pt-10">
      <a href="/" class="flex items-center">
        <img src="/logo2.png" alt="Gita Unlocked" class="h-12 w-auto sm:h-14" />
      </a>
    </header>

    <main class="relative z-10 mx-auto max-w-3xl px-4 pb-20 pt-8">
      <!-- Intro -->
      <section v-if="phase === 'intro'" class="text-center">
        <span class="inline-flex items-center gap-2 rounded-full bg-[#D61C75]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D61C75]">
          Application · Shortlisting
        </span>
        <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {{ meta.title }}
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg">{{ meta.subtitle }}</p>
        <p class="mt-3 text-sm font-medium text-gray-500">{{ meta.duration }}</p>

        <div class="mx-auto mt-10 max-w-lg rounded-[2rem] bg-white p-8 text-left shadow-[0_30px_80px_-30px_rgba(214,28,117,0.35)] ring-1 ring-gray-100">
          <p class="text-sm leading-relaxed text-gray-600">{{ meta.instructions }}</p>

          <form class="mt-8 border-t border-gray-100 pt-6" @submit.prevent="startQuiz">
            <p class="text-sm font-semibold text-gray-900">Your details</p>
            <p class="mt-1 text-xs text-gray-500">Required before you begin — so we can reach you if you're shortlisted.</p>
            <div class="mt-4 space-y-4">
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700">Name <span class="text-[#D61C75]">*</span></label>
                <input id="name" v-model="contact.name" type="text" required class="field-input" placeholder="Your full name" />
              </div>
              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700">Phone number <span class="text-[#D61C75]">*</span></label>
                <input id="phone" v-model="contact.phone" type="tel" required class="field-input" placeholder="10-digit mobile number" />
              </div>
              <div>
                <label for="college" class="block text-sm font-semibold text-gray-700">College <span class="text-[#D61C75]">*</span></label>
                <input id="college" v-model="contact.college" type="text" required class="field-input" placeholder="Your institute" />
              </div>
            </div>
            <p v-if="contactError" class="mt-4 text-sm text-red-600">{{ contactError }}</p>
            <button type="submit" class="btn-brand mt-6 w-full justify-center py-3.5 text-lg" :disabled="!canStart">
              Begin Application
            </button>
          </form>
        </div>
      </section>

      <!-- Questions -->
      <section v-else-if="phase === 'quiz'" class="text-center">
        <div class="mb-8">
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
            <span>Question {{ stepIndex + 1 }} of {{ questions.length }}</span>
          </div>
          <div class="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              class="h-full rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <div class="rounded-[2rem] bg-white p-7 text-left shadow-[0_30px_80px_-30px_rgba(214,28,117,0.35)] ring-1 ring-gray-100 sm:p-9">
          <h2 class="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
            {{ currentQuestion.text }}
          </h2>

          <!-- Choice question -->
          <div v-if="currentQuestion.type === 'choice'" class="mt-6 space-y-3">
            <button
              v-for="opt in currentQuestion.options"
              :key="opt.id"
              type="button"
              class="quiz-option"
              :class="{ 'quiz-option--active': answers[currentQuestion.id]?.optionId === opt.id }"
              @click="selectOption(currentQuestion.id, opt.id)"
            >
              <span class="quiz-option__radio" :class="{ 'quiz-option__radio--active': answers[currentQuestion.id]?.optionId === opt.id }"></span>
              <span>{{ opt.label }}</span>
            </button>
          </div>

          <!-- Short-response question -->
          <div v-else class="mt-6">
            <textarea
              v-model="textValue"
              rows="5"
              class="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#D61C75] focus:ring-2 focus:ring-[#D61C75]/20"
              :placeholder="currentQuestion.placeholder"
            ></textarea>
            <p class="mt-2 text-xs text-gray-400">A thoughtful, honest answer helps your application stand out.</p>
          </div>

          <div class="mt-8 flex gap-3">
            <button
              v-if="stepIndex > 0"
              type="button"
              class="btn-ghost flex-1 justify-center py-3"
              @click="prevStep"
            >
              Back
            </button>
            <button
              type="button"
              class="btn-brand flex-1 justify-center py-3"
              :disabled="!canAdvance || submitting"
              @click="nextStep"
            >
              {{ submitting ? 'Submitting…' : stepIndex === questions.length - 1 ? 'Submit Application' : 'Next' }}
            </button>
          </div>
          <p v-if="submitError" class="mt-4 text-center text-sm text-red-600">{{ submitError }}</p>
        </div>
      </section>

      <!-- Thank you -->
      <section v-else-if="phase === 'done'" class="text-center">
        <div class="mx-auto mt-6 max-w-lg rounded-[2rem] bg-white p-9 shadow-[0_30px_80px_-30px_rgba(214,28,117,0.35)] ring-1 ring-gray-100">
          <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-white">
            <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
          </span>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Thank you!</h2>
          <p class="mt-4 text-base leading-relaxed text-gray-600">
            Your application to <strong>The Human Advantage Series</strong> has been received.
            We'll get in touch if you've been shortlisted for the next stage.
          </p>
          <p class="mt-3 text-sm text-gray-500">Keep an eye on your phone and email.</p>

          <a href="/session" class="btn-brand mt-8 w-full justify-center py-3.5">Go to Session Room</a>
          <a href="/" class="btn-ghost mt-3 w-full justify-center py-3">Back to Home</a>
        </div>
      </section>

      <p class="mt-12 text-center text-xs text-gray-400">Presented by Gita Unlocked · Success Engineering</p>
    </main>
  </div>
</template>

<script setup>
import {
  assessmentMeta as meta,
  questions,
} from '~/data/humanAdvantageAssessment'

definePageMeta({ layout: 'landing' })

useHead({
  title: `${meta.title} | Success Engineering`,
  meta: [
    {
      name: 'description',
      content: `${meta.subtitle} ${meta.duration}.`,
    },
  ],
})

const phase = ref('intro')
const stepIndex = ref(0)
const answers = ref({})
const textValue = ref('')
const contact = ref({ name: '', phone: '', college: '' })
const contactError = ref('')
const submitting = ref(false)
const submitError = ref('')

const phoneDigits = (v) => v.replace(/\D/g, '')

const canStart = computed(() =>
  contact.value.name.trim().length > 0
  && contact.value.college.trim().length > 0
  && phoneDigits(contact.value.phone).length >= 10,
)

const currentQuestion = computed(() => questions[stepIndex.value])
const progress = computed(() => ((stepIndex.value + 1) / questions.length) * 100)

const MIN_TEXT_LENGTH = 2

const canAdvance = computed(() => {
  const q = currentQuestion.value
  if (q.type === 'choice') return !!answers.value[q.id]?.optionId
  return textValue.value.trim().length >= MIN_TEXT_LENGTH
})

function startQuiz() {
  contactError.value = ''
  if (!contact.value.name.trim()) {
    contactError.value = 'Please enter your name.'
    return
  }
  if (!contact.value.college.trim()) {
    contactError.value = 'Please enter your college.'
    return
  }
  if (phoneDigits(contact.value.phone).length < 10) {
    contactError.value = 'Please enter a valid 10-digit phone number.'
    return
  }
  phase.value = 'quiz'
  stepIndex.value = 0
  syncTextValue()
}

function selectOption(qId, optionId) {
  answers.value = { ...answers.value, [qId]: { optionId } }
}

function persistText() {
  const q = currentQuestion.value
  if (q.type === 'text') {
    const text = textValue.value.trim()
    if (text) {
      answers.value = { ...answers.value, [q.id]: { text } }
    } else {
      const next = { ...answers.value }
      delete next[q.id]
      answers.value = next
    }
  }
}

function syncTextValue() {
  const q = currentQuestion.value
  textValue.value = q.type === 'text' ? (answers.value[q.id]?.text ?? '') : ''
}

function nextStep() {
  if (!canAdvance.value) return
  persistText()

  if (stepIndex.value < questions.length - 1) {
    stepIndex.value += 1
    syncTextValue()
    return
  }

  submitApplication()
}

function prevStep() {
  persistText()
  if (stepIndex.value > 0) {
    stepIndex.value -= 1
    syncTextValue()
  }
}

async function submitApplication() {
  submitError.value = ''
  persistText()
  submitting.value = true

  try {
    const payload = {
      answers: answers.value,
      name: contact.value.name.trim(),
      phone: contact.value.phone.trim(),
      college: contact.value.college.trim(),
    }

    await $fetch('/api/human-advantage-submit', {
      method: 'POST',
      body: payload,
    })

    phase.value = 'done'
  } catch (err) {
    submitError.value = err?.data?.statusMessage || 'Could not submit your application. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.btn-brand {
  @apply inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#D61C75]/25 transition duration-200 hover:shadow-xl hover:shadow-[#D61C75]/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0;
}

.btn-ghost {
  @apply inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-2.5 font-semibold text-gray-700 transition hover:border-[#D61C75]/40 hover:text-[#D61C75] disabled:cursor-not-allowed disabled:opacity-50;
}

.field-input {
  @apply mt-1.5 w-full rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#D61C75] focus:ring-2 focus:ring-[#D61C75]/20;
}

.quiz-option {
  @apply flex w-full items-start gap-3 rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-left text-sm font-medium text-gray-800 transition hover:border-[#D61C75]/30 hover:bg-white;
}

.quiz-option--active {
  @apply border-[#D61C75] bg-[#D61C75]/5 shadow-sm;
}

.quiz-option__radio {
  @apply mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-gray-300 transition;
}

.quiz-option__radio--active {
  @apply border-[#D61C75] bg-[#D61C75] shadow-[inset_0_0_0_3px_white];
}
</style>
