<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-pink-50 to-white text-gray-800 antialiased">
    <!-- ambient glows -->
    <div class="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
    <div class="pointer-events-none absolute top-[40%] -left-40 h-[32rem] w-[32rem] rounded-full bg-[#7A10FF]/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[#D61C75]/10 blur-3xl"></div>

    <!-- Header -->
    <header class="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 sm:pt-8">
      <a href="/" class="flex items-center gap-3">
        <img :src="brand.logo" :alt="brand.name" class="h-11 w-auto sm:h-12" />
      </a>
      <div class="flex items-center gap-3">
        <NuxtLink to="/inner-programming/journey" class="hidden text-sm font-semibold text-gray-600 transition hover:text-[#D61C75] sm:inline">
          Explore the Journey
        </NuxtLink>
        <button type="button" class="btn-brand px-5 py-2 text-sm" @click="openForm">Register Now</button>
      </div>
    </header>

    <main class="relative z-10">
      <!-- Hero -->
      <section class="mx-auto max-w-4xl px-4 pt-10 text-center sm:pt-14">
        <span
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#D61C75] shadow-sm ring-1 ring-[#D61C75]/10"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D61C75] opacity-60"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-[#D61C75]"></span>
          </span>
          {{ brand.name }} · For IIT Students
        </span>
        <h1
          v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="mt-5 bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text pb-2 text-4xl font-extrabold leading-[1.15] text-transparent sm:text-6xl"
        >
          {{ hero.title }}
        </h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg font-bold text-gray-900 sm:text-2xl">{{ hero.subtitle }}</p>
        <p class="mx-auto mt-2 max-w-2xl text-xs font-semibold uppercase tracking-[0.15em] text-[#D61C75] sm:text-sm">{{ hero.supporting }}</p>

        <div class="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" class="btn-brand w-full justify-center py-3.5 text-lg sm:w-auto" @click="openForm">
            {{ hero.primaryCta }}
            <span aria-hidden="true">→</span>
          </button>
          <NuxtLink to="/inner-programming/journey" class="btn-ghost w-full justify-center py-3.5 text-lg sm:w-auto">
            {{ hero.secondaryCta }}
          </NuxtLink>
        </div>

        <!-- Registration quick facts -->
        <div class="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
          <div class="stat-card">
            <span class="stat-icon bg-gradient-to-br from-[#D61C75] to-[#7A10FF]">🎟️</span>
            <p class="mt-3 text-2xl font-extrabold text-[#D61C75] sm:text-3xl">80</p>
            <p class="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">{{ registration.seats }}</p>
          </div>
          <div class="stat-card">
            <span class="stat-icon !flex flex-col overflow-hidden !p-0 bg-gradient-to-br from-[#7A10FF] to-[#4C1D95] text-white">
              <span class="flex w-full items-center justify-center bg-white/20 text-[0.5rem] font-bold uppercase leading-none tracking-wider">Jul</span>
              <span class="flex flex-1 items-center justify-center text-base font-extrabold leading-none">30</span>
            </span>
            <p class="mt-3 text-2xl font-extrabold text-[#7A10FF] sm:text-3xl">30 July</p>
            <p class="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">Deadline</p>
          </div>
          <div class="stat-card">
            <span class="stat-icon bg-gradient-to-br from-[#FF7A00] to-[#D61C75]">✨</span>
            <p class="mt-3 text-2xl font-extrabold text-[#FF7A00] sm:text-3xl">Free</p>
            <p class="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">With Access Code</p>
          </div>
        </div>

        <p class="mt-6 text-sm font-medium text-gray-500">
          <span class="font-bold text-gray-900">15,000+</span> students trust Gita Unlocked across India
        </p>
      </section>

      <!-- Featured guest — Avelo Roy (highlighted up front) -->
      <section v-motion-fade-visible-once class="mx-auto max-w-5xl px-4 pt-16 sm:pt-20">
        <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1b1024] via-[#2a0f2e] to-[#120a1f] p-6 text-white shadow-[0_40px_100px_-30px_rgba(122,16,255,0.55)] sm:rounded-[2.5rem] sm:p-10">
          <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF7A00]/20 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#7A10FF]/20 blur-3xl"></div>

          <p class="relative text-center text-xs font-bold uppercase tracking-[0.25em] text-[#FF9A3C]">{{ launchSession.label }}</p>

          <div class="relative mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-9">
            <!-- Photo -->
            <div class="relative shrink-0">
              <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#7A10FF] blur-lg opacity-60"></div>
              <img :src="launchSession.image" :alt="launchSession.name" class="relative h-36 w-36 rounded-full object-cover ring-4 ring-white/20 sm:h-44 sm:w-44" />
            </div>

            <!-- Identity + hook -->
            <div class="flex-1 text-center sm:text-left">
              <h3 class="text-3xl font-extrabold sm:text-4xl">{{ launchSession.name }}</h3>
              <p class="mt-1 text-base font-semibold text-[#FF9A3C]">{{ launchSession.role }}</p>
              <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:mx-0">{{ launchSession.hook }}</p>

              <!-- Punchy stats -->
              <div class="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                <div v-for="s in launchSession.stats" :key="s.label" class="rounded-2xl bg-white/10 px-2 py-2.5 ring-1 ring-white/10">
                  <p class="text-lg font-extrabold leading-none text-white sm:text-xl">{{ s.value }}</p>
                  <p class="mt-1 text-[0.6rem] font-semibold uppercase leading-tight tracking-wide text-white/60">{{ s.label }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Achievements -->
          <div class="relative mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            <span v-for="h in launchSession.highlights" :key="h" class="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/15 sm:text-sm">
              {{ h }}
            </span>
          </div>

          <!-- Offline meet highlight -->
          <div class="relative mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#D61C75] px-5 py-4 shadow-lg sm:flex-row">
            <p class="flex items-center gap-2 text-center text-sm font-bold text-white sm:text-left sm:text-base">
              <span aria-hidden="true" class="text-xl">🤝</span> {{ launchSession.meetNote }}
            </p>
            <button type="button" class="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#D61C75] shadow transition hover:-translate-y-0.5 hover:shadow-xl" @click="openForm">
              Grab Your Seat
            </button>
          </div>
        </div>
      </section>

      <!-- Certification + Retreat (right below the guest intro) -->
      <section class="mx-auto max-w-5xl px-4 pt-6 sm:pt-8">
        <div class="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <!-- Certification with MIT logo -->
          <div v-motion-slide-visible-once-left class="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_-30px_rgba(122,16,255,0.4)] ring-2 ring-[#7A10FF]/15 transition hover:-translate-y-1.5 hover:shadow-2xl sm:p-9">
            <div class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#7A10FF]/10 blur-2xl"></div>
            <span class="inline-flex rounded-full bg-[#7A10FF]/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#7A10FF]">Certified</span>
            <div class="mt-4 flex items-center gap-3">
              <span class="text-4xl">🎓</span>
              <h3 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">{{ certification.heading }}</h3>
            </div>
            <p class="mt-4 text-base leading-relaxed text-gray-600">{{ certification.body }}</p>
            <div class="mt-6 flex items-center gap-4 rounded-2xl border border-[#A31F34]/15 bg-gray-50/80 px-4 py-3.5">
              <img src="/logos/mit.svg" alt="MIT logo" class="h-9 w-auto sm:h-10" />
              <div class="h-9 w-px bg-gray-200"></div>
              <div class="text-left">
                <p class="text-sm font-extrabold text-gray-900">Completion Certificate</p>
                <p class="text-xs font-semibold uppercase tracking-wider text-[#A31F34]">Issued by VVF, MIT</p>
              </div>
            </div>
          </div>
          <!-- Retreat / offline meet -->
          <div v-motion-slide-visible-once-right class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] p-7 text-white shadow-[0_30px_80px_-30px_rgba(214,28,117,0.55)] ring-1 ring-white/10 transition hover:-translate-y-1.5 hover:shadow-2xl sm:p-9">
            <div class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl"></div>
            <span class="inline-flex rounded-full bg-white/20 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white ring-1 ring-white/25">Most Exclusive</span>
            <div class="mt-4 flex items-center gap-3">
              <span class="text-4xl">🏔️</span>
              <h3 class="text-2xl font-extrabold sm:text-3xl">{{ retreat.heading }}</h3>
            </div>
            <p class="mt-4 text-base leading-relaxed text-white/95">{{ retreat.body }}</p>
            <span class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#D61C75] shadow-lg">
              <span aria-hidden="true">🤝</span> Get a chance to meet Mr. Avelo Roy — offline, in person
            </span>
          </div>
        </div>
      </section>

      <!-- About -->
      <section v-motion-fade-visible-once class="mx-auto max-w-4xl px-4 pt-28 text-center">
        <p class="eyebrow">The Big Picture</p>
        <h2 class="section-title mt-3">{{ about.heading }}</h2>
        <div class="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF]"></div>
        <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600">{{ about.body }}</p>
      </section>

      <!-- Two tracks -->
      <section class="mx-auto max-w-6xl px-4 pt-16">
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Inner track -->
          <article v-motion-slide-visible-once-left class="track-card group">
            <span class="accent-bar bg-gradient-to-r from-[#FF7A00] to-[#D61C75]"></span>
            <div class="flex items-center justify-between">
              <span class="inline-flex rounded-full bg-[#D61C75]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D61C75]">{{ innerTrack.label }}</span>
              <span class="text-4xl">🧘</span>
            </div>
            <h3 class="mt-4 text-2xl font-extrabold text-gray-900">{{ innerTrack.sessions }}</h3>
            <p v-if="innerTrack.orientation" class="mt-3 rounded-xl bg-[#FF7A00]/10 px-3 py-2 text-sm font-semibold text-[#C2410C]">
              {{ innerTrack.orientation }}
            </p>
            <p class="mt-5 text-xs font-bold uppercase tracking-wider text-gray-400">Focus Areas</p>
            <ul class="mt-3 space-y-2.5">
              <li v-for="(item, i) in innerTrack.focus" :key="item" class="flex items-center gap-3 text-sm font-medium text-gray-700">
                <span class="num-badge bg-gradient-to-br from-[#FF7A00] to-[#D61C75]">{{ i + 1 }}</span>{{ item }}
              </li>
            </ul>
            <p class="mt-6 text-xs font-bold uppercase tracking-wider text-gray-400">Learning Outcomes</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="o in innerTrack.outcomes" :key="o" class="pill">{{ o }}</span>
            </div>
          </article>

          <!-- Technical track -->
          <article v-motion-slide-visible-once-right class="track-card group">
            <span class="accent-bar bg-gradient-to-r from-[#D61C75] to-[#7A10FF]"></span>
            <div class="flex items-center justify-between">
              <span class="inline-flex rounded-full bg-[#7A10FF]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#7A10FF]">{{ technicalTrack.label }}</span>
              <span class="text-4xl">💻</span>
            </div>
            <h3 class="mt-4 text-2xl font-extrabold text-gray-900">{{ technicalTrack.sessions }}</h3>
            <p class="mt-5 text-sm font-medium text-gray-600">{{ technicalTrack.note }}</p>
            <div class="mt-3 grid gap-2.5">
              <div v-for="s in technicalTrack.specializations" :key="s" class="spec-card group/spec">
                <span class="grid h-9 w-9 place-items-center rounded-xl bg-[#7A10FF]/10 text-lg">⚡</span>
                <span class="font-bold text-gray-800">{{ s }}</span>
              </div>
            </div>
            <p class="mt-6 text-xs font-bold uppercase tracking-wider text-gray-400">Learning Outcomes</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="o in technicalTrack.outcomes" :key="o" class="pill pill--purple">{{ o }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Mentors -->
      <section v-motion-fade-visible-once class="mx-auto max-w-5xl px-4 pt-28 text-center">
        <p class="eyebrow">Your Guides</p>
        <h2 class="section-title mt-3">Learn From The Best</h2>
        <div class="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF]"></div>
        <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="(m, i) in mentors" :key="m" class="mentor-card group">
            <span class="grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-sm" :class="mentorIconBg(i)">{{ mentorIcon(i) }}</span>
            <p class="mt-4 text-sm font-bold text-gray-800">{{ m }}</p>
          </div>
        </div>
      </section>

      <!-- What makes different -->
      <section v-motion-fade-visible-once class="mx-auto max-w-5xl px-4 pt-28">
        <p class="eyebrow text-center">The Edge</p>
        <h2 class="section-title mt-3 text-center">What Makes This Different?</h2>
        <div class="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF]"></div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="d in differentiators" :key="d" class="diff-card group">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-sm text-white shadow-sm transition group-hover:scale-110">★</span>
            <p class="text-sm font-medium text-gray-700">{{ d }}</p>
          </div>
        </div>
      </section>

      <!-- Outcomes -->
      <section v-motion-fade-visible-once class="mx-auto max-w-4xl px-4 pt-28">
        <div class="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_-30px_rgba(214,28,117,0.35)] ring-1 ring-gray-100 sm:p-10">
          <span class="accent-bar bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF]"></span>
          <p class="eyebrow">The Transformation</p>
          <h2 class="section-title mt-3">Workshop Outcomes</h2>
          <p class="mt-2 text-sm text-gray-500">After completing the workshop, participants will:</p>
          <ul class="mt-6 grid gap-3 sm:grid-cols-2">
            <li v-for="o in outcomes" :key="o" class="flex items-start gap-3 rounded-2xl bg-gray-50/70 p-3.5 text-sm font-medium text-gray-700 transition hover:bg-[#D61C75]/5">
              <span class="check">✓</span>{{ o }}
            </li>
          </ul>
        </div>
      </section>

      <!-- FAQ -->
      <section v-motion-fade-visible-once class="mx-auto max-w-3xl px-4 pt-28">
        <p class="eyebrow text-center">Got Questions?</p>
        <h2 class="section-title mt-3 text-center">Frequently Asked Questions</h2>
        <div class="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF]"></div>
        <div class="mt-10 space-y-3">
          <details v-for="(f, i) in faqs" :key="i" class="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:ring-[#D61C75]/20">
            <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-gray-900">
              {{ f.q }}
              <span class="ml-4 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#D61C75]/10 text-[#D61C75] transition group-open:rotate-45">+</span>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">{{ f.a }}</p>
          </details>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="mx-auto max-w-4xl px-4 pb-24 pt-28">
        <div v-motion-fade-visible-once class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1b1024] via-[#2a0f2e] to-[#120a1f] p-10 text-center text-white shadow-[0_40px_100px_-30px_rgba(122,16,255,0.55)] sm:p-14">
          <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF7A00]/20 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#7A10FF]/25 blur-3xl"></div>
          <h2 class="relative mx-auto max-w-2xl text-2xl font-extrabold sm:text-4xl">{{ finalCta.heading }}</h2>
          <p class="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">{{ finalCta.body }}</p>
          <div class="relative mt-8 flex flex-wrap justify-center gap-3">
            <span v-for="p in finalCta.points" :key="p" class="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/15">
              {{ p }}
            </span>
          </div>
          <button type="button" class="btn-brand relative mx-auto mt-9 justify-center px-10 py-4 text-lg" @click="openForm">
            Register Now
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <p class="pb-10 text-center text-xs text-gray-400">Presented by {{ brand.name }} · Inner Programming Workshop</p>
    </main>

    <!-- Registration modal -->
    <transition name="fade">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeForm">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9">
          <button type="button" class="absolute right-5 top-5 text-gray-400 transition hover:text-gray-700" @click="closeForm" aria-label="Close">✕</button>

          <!-- Success state -->
          <div v-if="submitted" class="py-8 text-center">
            <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-2xl text-white">✓</div>
            <h3 class="mt-6 text-2xl font-extrabold text-gray-900">You're registered!</h3>
            <p class="mt-3 text-sm text-gray-600">
              Thank you for registering for the Inner Programming Workshop. We'll reach out on your WhatsApp with joining details before 30 July.
            </p>
            <button type="button" class="btn-brand mx-auto mt-7 justify-center px-8 py-3" @click="closeForm">Done</button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submit">
            <h3 class="text-2xl font-extrabold text-gray-900">Register — Inner Programming Workshop</h3>
            <p class="mt-1 text-sm text-gray-500">Only 80 seats · Deadline 30 July · Free with a valid access code</p>

            <div class="mt-6 space-y-4">
              <div>
                <label class="lbl">Full Name <span class="req">*</span></label>
                <input v-model="form.name" type="text" required class="field-input" placeholder="Your full name" />
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="lbl">Email <span class="req">*</span></label>
                  <input v-model="form.email" type="email" required class="field-input" placeholder="you@example.com" />
                </div>
                <div>
                  <label class="lbl">Phone <span class="req">*</span></label>
                  <input v-model="form.phone" type="tel" required class="field-input" placeholder="10-digit mobile" />
                </div>
              </div>
              <div>
                <label class="lbl">WhatsApp Number <span class="req">*</span></label>
                <input v-model="form.whatsapp" type="tel" required class="field-input" placeholder="Where we'll send joining details" />
              </div>
              <div>
                <label class="lbl">College <span class="req">*</span></label>
                <input v-model="form.college" type="text" required class="field-input" placeholder="Your IIT / institute" />
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="lbl">Branch <span class="req">*</span></label>
                  <div class="select-wrap">
                    <select v-model="form.branch" required class="field-select" :class="!form.branch && 'text-gray-400'">
                      <option value="" disabled>Select branch</option>
                      <option v-for="b in branchOptions" :key="b" :value="b">{{ b }}</option>
                    </select>
                    <span class="select-chevron" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4"><path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                  </div>
                  <input
                    v-if="form.branch === 'Other'"
                    v-model="form.branchOther"
                    type="text"
                    class="field-input mt-2"
                    placeholder="Enter your branch"
                  />
                </div>
                <div>
                  <label class="lbl">Year <span class="req">*</span></label>
                  <div class="select-wrap">
                    <select v-model="form.year" required class="field-select" :class="!form.year && 'text-gray-400'">
                      <option value="" disabled>Select year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>5th Year</option>
                    </select>
                    <span class="select-chevron" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4"><path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label class="lbl">Technical Specialization <span class="text-gray-400">(optional)</span></label>
                <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    v-for="s in technicalTrack.specializations"
                    :key="s"
                    type="button"
                    class="track-chip"
                    :class="{ 'track-chip--active': form.track === s }"
                    @click="form.track = form.track === s ? '' : s"
                  >
                    {{ s }}
                  </button>
                </div>
              </div>
              <div>
                <label class="lbl">Why do you want to join? <span class="text-gray-400">(optional)</span></label>
                <textarea v-model="form.reason" rows="3" class="field-input resize-none" placeholder="A line or two about what you hope to gain"></textarea>
              </div>
            </div>

            <!-- Access code / coupon -->
            <div class="mt-6 rounded-2xl border border-dashed border-[#D61C75]/30 bg-[#D61C75]/5 p-4">
              <label class="lbl">Access Code <span class="req">*</span></label>
              <p class="mt-0.5 text-xs text-gray-500">Enter your campus code to unlock free registration.</p>
              <div class="mt-2 flex gap-2">
                <input
                  v-model="couponInput"
                  type="text"
                  class="field-input mt-0 flex-1 uppercase"
                  :class="couponStatus.state === 'error' && '!border-red-400'"
                  placeholder="Enter your coupon code"
                  :disabled="!!appliedCoupon"
                  @input="onCouponInput"
                  @keydown.enter.prevent="applyCoupon"
                />
                <button
                  type="button"
                  class="shrink-0 rounded-2xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
                  :disabled="!!appliedCoupon"
                  @click="applyCoupon"
                >
                  {{ appliedCoupon ? 'Applied' : 'Apply' }}
                </button>
              </div>
              <p v-if="couponStatus.message" class="mt-2 text-xs font-medium" :class="couponStatus.state === 'success' ? 'text-green-600' : 'text-red-500'">
                {{ couponStatus.message }}
              </p>

              <!-- Price line -->
              <div class="mt-4 flex items-center justify-between border-t border-[#D61C75]/15 pt-3">
                <span class="text-sm font-semibold text-gray-600">Workshop Fee</span>
                <span class="flex items-baseline gap-2">
                  <span
                    class="text-lg font-extrabold"
                    :class="appliedCoupon ? 'text-gray-400 line-through decoration-[#D61C75] decoration-2' : 'text-gray-900'"
                  >
                    {{ pricing.currency }}{{ pricing.basePrice }}
                  </span>
                  <span v-if="appliedCoupon" class="text-lg font-extrabold text-green-600">FREE</span>
                </span>
              </div>
            </div>

            <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
            <button
              type="submit"
              class="btn-brand mt-6 w-full justify-center py-3.5 text-lg"
              :class="!appliedCoupon ? 'opacity-50' : ''"
              :disabled="submitting || !appliedCoupon"
            >
              {{ submitting ? 'Registering…' : appliedCoupon ? 'Confirm Free Registration' : 'Apply Access Code to Continue' }}
            </button>
            <p class="mt-3 text-center text-xs text-gray-400">Your details are stored securely and used only for this workshop.</p>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {
  brand, hero, registration, pricing, couponColleges, about, innerTrack, technicalTrack,
  launchSession, mentors, differentiators, outcomes, retreat,
  certification, faqs, finalCta, seo,
} from '~/data/innerProgramming'

definePageMeta({ layout: 'landing' })
useHead({
  title: seo.title,
  meta: [{ name: 'description', content: seo.description }],
})

const showForm = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

// Decorative icons for mentor cards (cycled).
const MENTOR_ICONS = ['🎓', '🚀', '💡', '📿']
const MENTOR_ICON_BG = [
  'bg-gradient-to-br from-[#FF7A00]/15 to-[#D61C75]/15',
  'bg-gradient-to-br from-[#D61C75]/15 to-[#7A10FF]/15',
  'bg-gradient-to-br from-[#7A10FF]/15 to-[#4C1D95]/15',
  'bg-gradient-to-br from-[#FF7A00]/15 to-[#7A10FF]/15',
]
const mentorIcon = (i) => MENTOR_ICONS[i % MENTOR_ICONS.length]
const mentorIconBg = (i) => MENTOR_ICON_BG[i % MENTOR_ICON_BG.length]

const form = ref({
  name: '', email: '', phone: '', whatsapp: '',
  college: '', branch: '', branchOther: '', year: '', track: '', reason: '',
})

const branchOptions = [
  'Computer Science (CSE)',
  'Electronics (ECE)',
  'Electrical (EE)',
  'Mechanical',
  'Civil',
  'Chemical',
  'Aerospace',
  'Metallurgy & Materials',
  'Mathematics & Computing',
  'Engineering Physics',
  'Biotechnology',
  'Other',
]

// ---- Access code / coupon ----
const couponInput = ref('')
const appliedCoupon = ref('')
const couponStatus = reactive({ state: '', message: '' }) // '' | 'success' | 'error'

function onCouponInput() {
  couponInput.value = couponInput.value.toUpperCase()
  // Reset an applied code if the text changes.
  if (appliedCoupon.value && couponInput.value.trim() !== appliedCoupon.value) {
    appliedCoupon.value = ''
    couponStatus.state = ''
    couponStatus.message = ''
  }
}

function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase()
  if (!code) {
    couponStatus.state = 'error'
    couponStatus.message = 'Please enter your access code.'
    return
  }
  const college = couponColleges[code]
  if (college) {
    appliedCoupon.value = code
    couponStatus.state = 'success'
    couponStatus.message = `Code applied for ${college} — your registration is free!`
    // Prefill college if empty.
    if (!form.value.college.trim()) form.value.college = college
  } else {
    appliedCoupon.value = ''
    couponStatus.state = 'error'
    couponStatus.message = 'Invalid or expired code. Please check and try again.'
  }
}

function resetCoupon() {
  couponInput.value = ''
  appliedCoupon.value = ''
  couponStatus.state = ''
  couponStatus.message = ''
}

function openForm() {
  showForm.value = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
}
function closeForm() {
  showForm.value = false
  error.value = ''
  if (import.meta.client) document.body.style.overflow = ''
  if (submitted.value) {
    submitted.value = false
    form.value = { name: '', email: '', phone: '', whatsapp: '', college: '', branch: '', branchOther: '', year: '', track: '', reason: '' }
    resetCoupon()
  }
}

const digits = (v) => (v || '').replace(/\D/g, '')

async function submit() {
  error.value = ''
  const f = form.value
  if (!appliedCoupon.value) {
    couponStatus.state = 'error'
    couponStatus.message = 'Please apply a valid access code to unlock registration.'
    return
  }
  if (!f.name.trim() || !f.college.trim() || !f.branch.trim() || !f.year) {
    error.value = 'Please fill all required fields.'
    return
  }
  if (f.branch === 'Other' && !f.branchOther.trim()) {
    error.value = 'Please enter your branch.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }
  if (digits(f.phone).length < 10) {
    error.value = 'Please enter a valid 10-digit phone number.'
    return
  }
  if (digits(f.whatsapp).length < 10) {
    error.value = 'Please enter a valid WhatsApp number.'
    return
  }

  submitting.value = true
  try {
    const branch = f.branch === 'Other' ? f.branchOther.trim() : f.branch
    const res = await $fetch('/api/inner-programming-register', {
      method: 'POST',
      body: { ...f, branch, couponCode: appliedCoupon.value },
    })
    if (res?.duplicate) {
      error.value = 'This email is already registered. See you at the workshop!'
      return
    }
    submitted.value = true
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Could not save your registration. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
:deep(h1),
h1, h2, h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.02em;
}
h1 { letter-spacing: -0.035em; }

.section-title {
  @apply text-3xl font-extrabold text-gray-900 sm:text-4xl;
}
.eyebrow {
  @apply text-xs font-bold uppercase tracking-[0.25em] text-[#D61C75];
}

.btn-brand {
  @apply inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#D61C75]/25 transition duration-200 hover:shadow-xl hover:shadow-[#D61C75]/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0;
}
.btn-ghost {
  @apply inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-2.5 font-semibold text-gray-700 transition hover:border-[#D61C75]/40 hover:text-[#D61C75] hover:-translate-y-0.5;
}

.stat-card {
  @apply relative overflow-hidden rounded-2xl bg-white/80 px-5 py-5 text-center shadow-sm ring-1 ring-gray-100 backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-lg;
}
.stat-icon {
  @apply mx-auto grid h-11 w-11 place-items-center rounded-xl text-lg shadow-sm;
}

.track-card {
  @apply relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_-30px_rgba(214,28,117,0.28)] ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-30px_rgba(214,28,117,0.4)];
}
.accent-bar {
  @apply absolute inset-x-0 top-0 h-1.5;
}
.num-badge {
  @apply grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-white;
}
.spec-card {
  @apply flex items-center gap-3 rounded-2xl border-2 border-gray-100 bg-gray-50/60 px-4 py-3 text-sm transition hover:border-[#7A10FF]/40 hover:bg-white;
}
.mentor-card {
  @apply flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:ring-[#D61C75]/20;
}
.diff-card {
  @apply flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-[#D61C75]/20;
}
.field-input {
  @apply mt-1.5 w-full rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#D61C75] focus:ring-2 focus:ring-[#D61C75]/20;
}
.select-wrap {
  @apply relative mt-1.5;
}
.field-select {
  @apply w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3 pr-11 text-sm text-gray-800 outline-none transition focus:border-[#D61C75] focus:ring-2 focus:ring-[#D61C75]/20;
}
.select-chevron {
  @apply pointer-events-none absolute right-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-lg text-[#D61C75];
}
.lbl { @apply block text-sm font-semibold text-gray-700; }
.req { @apply text-[#D61C75]; }
.check {
  @apply grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FF7A00] to-[#D61C75] text-[0.65rem] font-bold text-white;
}
.pill {
  @apply rounded-full bg-[#D61C75]/10 px-3 py-1 text-xs font-semibold text-[#D61C75] ring-1 ring-[#D61C75]/15;
}
.pill--purple {
  @apply bg-[#7A10FF]/10 text-[#7A10FF] ring-[#7A10FF]/15;
}
.track-chip {
  @apply rounded-2xl border-2 border-gray-100 bg-gray-50/60 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#7A10FF]/30;
}
.track-chip--active {
  @apply border-[#7A10FF] bg-[#7A10FF]/5 text-[#7A10FF] shadow-sm;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
