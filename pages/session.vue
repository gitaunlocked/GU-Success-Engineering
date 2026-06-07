<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-pink-50 to-white text-gray-800 antialiased">
    <!-- ambient glows -->
    <div class="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#7A10FF]/10 blur-3xl"></div>

    <!-- top brand bar -->
    <header class="relative z-10 mx-auto flex max-w-3xl items-center justify-center px-4 pt-10">
      <a href="/" class="flex items-center">
        <img src="/logo2.png" alt="Gita Unlocked" class="h-12 w-auto sm:h-14" />
      </a>
    </header>

    <main class="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pb-20 pt-10 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-[#D61C75]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D61C75]">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D61C75]/60"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-[#D61C75]"></span>
        </span>
        {{ session.sessionLabel }} · Session Room
      </span>

      <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        {{ session.title }}
      </h1>
      <p class="mt-3 max-w-xl text-base text-gray-600 sm:text-lg">{{ session.subtitle }}</p>

      <!-- session card -->
      <div class="mt-10 w-full rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_-30px_rgba(214,28,117,0.35)] ring-1 ring-gray-100 sm:p-9">
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl bg-gray-50/80 p-4 ring-1 ring-gray-100">
            <p class="text-[11px] uppercase tracking-wider text-gray-500">Date</p>
            <p class="mt-1 font-semibold text-gray-900">{{ session.dateLabel }}</p>
          </div>
          <div class="rounded-2xl bg-gray-50/80 p-4 ring-1 ring-gray-100">
            <p class="text-[11px] uppercase tracking-wider text-gray-500">Time</p>
            <p class="mt-1 font-semibold text-gray-900">{{ session.timeLabel }}</p>
          </div>
          <div class="rounded-2xl bg-gray-50/80 p-4 ring-1 ring-gray-100">
            <p class="text-[11px] uppercase tracking-wider text-gray-500">Platform</p>
            <p class="mt-1 font-semibold text-gray-900">{{ session.platform }}</p>
          </div>
        </div>

        <!-- join button -->
        <div class="mt-8">
          <a
            v-if="session.joinUrl"
            :href="session.joinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-brand w-full justify-center py-3.5 text-lg"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="13" rx="2.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m9.5 9 5 3-5 3V9Z"/></svg>
            Join Session
          </a>
          <div
            v-else
            class="flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-3.5 text-base font-semibold text-gray-500"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2" /></svg>
            Meeting link will be updated shortly
          </div>
          <p class="mt-4 text-sm text-gray-500">{{ session.note }}</p>

          <a
            v-if="session.assessmentUrl"
            :href="session.assessmentUrl"
            class="btn-ghost mt-4 w-full justify-center py-3.5"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" /></svg>
            Take Success Profile Assessment
          </a>
        </div>
      </div>

      <!-- speaker -->
      <div class="mt-10 w-full">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Speaker</p>
        <div class="mt-4 flex flex-col items-center gap-5 rounded-[2rem] bg-white p-7 text-center shadow-[0_30px_80px_-30px_rgba(214,28,117,0.25)] ring-1 ring-gray-100 sm:flex-row sm:items-center sm:text-left">
          <div class="relative shrink-0">
            <div class="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] blur-[6px] opacity-60"></div>
            <img
              v-if="session.speaker.photo"
              :src="session.speaker.photo"
              :alt="session.speaker.name"
              class="relative h-28 w-28 rounded-full object-cover ring-4 ring-white sm:h-32 sm:w-32"
            />
            <span
              v-else
              class="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-2xl font-bold text-white ring-4 ring-white sm:h-32 sm:w-32"
            >
              {{ initials(session.speaker.name) }}
            </span>
          </div>
          <div>
            <p class="text-xl font-extrabold text-gray-900">{{ session.speaker.name }}</p>
            <ul class="mt-3 space-y-1.5">
              <li
                v-for="c in session.speaker.credentials"
                :key="c"
                class="flex items-center justify-center gap-2 text-sm text-gray-600 sm:justify-start"
              >
                <svg class="h-4 w-4 shrink-0 text-[#D61C75]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
                {{ c }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="mt-12 text-xs text-gray-400">Presented by Gita Unlocked · Success Engineering</p>
    </main>
  </div>
</template>

<script setup>
import { session } from "~/config/session";

definePageMeta({ layout: "landing" });

useHead({
  title: `${session.eventName} | Session Room`,
  meta: [
    { name: "description", content: `${session.title} — ${session.dateLabel}, ${session.timeLabel}. Join the live session here.` },
  ],
});

const initials = (name) =>
  name
    .replace(/^(Mr\.?|Ms\.?|Mrs\.?|Dr\.?)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
</script>

<style scoped>
.btn-brand {
  @apply inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#D61C75]/25 transition duration-200 hover:shadow-xl hover:shadow-[#D61C75]/40 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95;
}

.btn-ghost {
  @apply inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-2.5 font-semibold text-gray-700 transition hover:border-[#D61C75]/40 hover:text-[#D61C75];
}
</style>
