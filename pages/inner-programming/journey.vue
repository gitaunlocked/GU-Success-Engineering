<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-pink-50 to-white text-gray-800 antialiased">
    <div class="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#7A10FF]/10 blur-3xl"></div>

    <!-- Header -->
    <header class="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 pt-6 sm:pt-8">
      <a href="/" class="flex items-center gap-3">
        <img :src="brand.logo" :alt="brand.name" class="h-11 w-auto sm:h-12" />
      </a>
      <NuxtLink to="/inner-programming" class="btn-brand px-5 py-2 text-sm">Register Now</NuxtLink>
    </header>

    <main class="relative z-10 mx-auto max-w-4xl px-4 pb-24">
      <!-- Intro -->
      <section class="pt-14 text-center sm:pt-20">
        <NuxtLink to="/inner-programming" class="text-sm font-semibold text-gray-500 transition hover:text-[#D61C75]">← Back to Workshop</NuxtLink>
        <span class="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#D61C75] shadow-sm ring-1 ring-[#D61C75]/10">
          The 9-Session Journey
        </span>
        <h1 class="mt-6 bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text pb-2 text-4xl font-extrabold leading-[1.15] text-transparent sm:text-5xl">
          Explore the Journey
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
          One integrated path made of two tracks. Six sessions build inner mastery; three build a technical
          specialization you choose. Here's exactly what each session unlocks.
        </p>
      </section>

      <!-- Track legend -->
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#D61C75] shadow-sm ring-1 ring-gray-100">
          <span class="h-2.5 w-2.5 rounded-full bg-[#D61C75]"></span> Inner Track · 6 sessions
        </span>
        <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#7A10FF] shadow-sm ring-1 ring-gray-100">
          <span class="h-2.5 w-2.5 rounded-full bg-[#7A10FF]"></span> Technical Master Track · 3 sessions
        </span>
      </div>

      <!-- Timeline -->
      <ol class="relative mt-14 space-y-6 before:absolute before:left-[1.35rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#FF7A00] before:via-[#D61C75] before:to-[#7A10FF] sm:before:left-7">
        <li
          v-for="s in journey"
          :key="s.number"
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 450 } }"
          class="relative flex gap-5 sm:gap-7"
        >
          <div
            class="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white shadow-lg ring-4 ring-white sm:h-14 sm:w-14 sm:text-base"
            :class="s.track === 'Inner Track' ? 'bg-gradient-to-br from-[#FF7A00] to-[#D61C75]' : 'bg-gradient-to-br from-[#D61C75] to-[#7A10FF]'"
          >
            {{ s.number }}
          </div>
          <div class="flex-1 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-[#D61C75]/20">
            <div class="flex items-center justify-between gap-3">
              <span
                class="inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider"
                :class="s.track === 'Inner Track' ? 'bg-[#D61C75]/10 text-[#D61C75]' : 'bg-[#7A10FF]/10 text-[#7A10FF]'"
              >
                {{ s.track }}
              </span>
              <span class="text-2xl">{{ s.track === 'Inner Track' ? '🧘' : '💻' }}</span>
            </div>
            <h3 class="mt-3 text-lg font-extrabold text-gray-900">{{ s.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ s.summary }}</p>
          </div>
        </li>
      </ol>

      <!-- CTA -->
      <section class="mt-16">
        <div class="rounded-[2rem] bg-gradient-to-br from-[#1b1024] via-[#2a0f2e] to-[#120a1f] p-10 text-center text-white shadow-[0_40px_100px_-30px_rgba(122,16,255,0.55)]">
          <h2 class="text-2xl font-extrabold sm:text-3xl">Ready to begin the journey?</h2>
          <p class="mx-auto mt-3 max-w-xl text-sm text-white/80">
            Free · Only 80 seats · Register by 30 July. Secure your place and start becoming the best version of yourself.
          </p>
          <NuxtLink to="/inner-programming" class="btn-brand mx-auto mt-7 justify-center px-10 py-4 text-lg">Register Now</NuxtLink>
        </div>
      </section>

      <p class="pt-12 text-center text-xs text-gray-400">Presented by {{ brand.name }} · Inner Programming Workshop</p>
    </main>
  </div>
</template>

<script setup>
import { brand, journey } from '~/data/innerProgramming'

definePageMeta({ layout: 'landing' })
useHead({
  title: 'Explore the Journey | Inner Programming Workshop',
  meta: [{
    name: 'description',
    content: 'The 9-session Inner Programming Workshop journey — six inner-mastery sessions plus a three-session technical specialization.',
  }],
})
</script>

<style scoped>
h1, h2, h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.02em;
}
h1 { letter-spacing: -0.035em; }

.btn-brand {
  @apply inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#D61C75]/25 transition duration-200 hover:shadow-xl hover:shadow-[#D61C75]/40 hover:-translate-y-0.5;
}
</style>
