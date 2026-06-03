<template>
  <div id="top" class="relative overflow-x-hidden bg-white text-gray-800 antialiased selection:bg-[#D61C75]/20">
    <!-- ===================== NAV ===================== -->
    <header
      :class="[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-3',
      ]"
    >
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <a href="#top" @click.prevent="scrollTo('top')" class="flex items-center">
          <img src="/logo2.png" alt="Gita Unlocked" class="w-28 sm:w-36 h-12 sm:h-14" />
        </a>

        <ul class="hidden md:flex items-center gap-9 lg:gap-12 text-lg font-medium text-gray-700">
          <li><a href="#top" @click.prevent="scrollTo('top')" class="hover:text-[#D61C75] transition">HOME</a></li>
          <li><a href="#about" @click.prevent="scrollTo('about')" class="hover:text-[#D61C75] transition">ABOUT US</a></li>
          <li><a href="#contact" @click.prevent="scrollTo('contact')" class="hover:text-[#D61C75] transition">CONTACT US</a></li>
        </ul>

        <div class="hidden md:block">
          <a href="#register" @click.prevent="scrollTo('register')" class="btn-brand text-sm">Register Now</a>
        </div>

        <button class="md:hidden text-gray-700" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
          <svg v-if="!mobileOpen" class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg v-else class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </nav>

      <!-- Mobile menu -->
      <div v-if="mobileOpen" class="md:hidden mx-4 mt-3 rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-5 space-y-4">
        <a href="#top" @click.prevent="scrollTo('top')" class="block font-medium text-gray-700 hover:text-[#D61C75]">HOME</a>
        <a href="#about" @click.prevent="scrollTo('about')" class="block font-medium text-gray-700 hover:text-[#D61C75]">ABOUT US</a>
        <a href="#contact" @click.prevent="scrollTo('contact')" class="block font-medium text-gray-700 hover:text-[#D61C75]">CONTACT US</a>
        <a href="#register" @click.prevent="scrollTo('register')" class="btn-brand w-full justify-center text-sm">Register Now</a>
      </div>
    </header>

    <!-- ===================== HERO ===================== -->
    <section class="relative flex items-center pt-36 pb-24 lg:min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-white">
      <div class="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-[#FF7A00]/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#7A10FF]/10 blur-3xl"></div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div v-motion="heroReveal" class="text-center lg:text-left">
          <h1 class="font-bold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight brand-gradient-text heading-script">
            <span class="block">Success</span>
            <span class="block">Engineering</span>
          </h1>

          <!-- Tagline / heading above the series description -->
          <h2 class="mt-7 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 max-w-xl mx-auto lg:mx-0">
            {{ event.tagline }}
          </h2>

          <!-- Interactive podcast series description -->
          <p class="mt-4 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-gray-600">
            <span class="inline-flex items-center gap-2 align-middle rounded-full bg-[#D61C75]/10 px-3 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D61C75]">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
              Interactive Podcast Series
            </span>
            <span class="mt-3 block">
              A 3-part live, interactive podcast series with
              <span class="font-semibold text-gray-800">IIT alumni, industry leaders and global technology professionals.</span>
            </span>
          </p>

          <div class="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#register" @click.prevent="scrollTo('register')" class="btn-brand">Register Now</a>
            <a href="#speakers" @click.prevent="scrollTo('speakers')" class="btn-ghost">View Speakers</a>
          </div>

          <div class="mt-10 grid sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div class="info-card group">
              <span class="info-ico">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path stroke-linecap="round" d="M3 9h18M8 2.5v4m8-4v4"/></svg>
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-500 group-hover:text-[#D61C75] transition">Start Date</p>
                <p class="mt-1 font-semibold text-gray-900 text-sm">{{ event.date }}</p>
              </div>
            </div>
            <div class="info-card group">
              <span class="info-ico">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="13" rx="2.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m9.5 9 5 3-5 3V9Z"/></svg>
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-gray-500 group-hover:text-[#D61C75] transition">Venue</p>
                <p class="mt-1 font-semibold text-gray-900 text-sm">{{ event.venue }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero live-podcast visual -->
        <div class="relative hidden lg:block" v-motion="heroReveal">
          <!-- ambient gradient glow -->
          <div class="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-[#FF7A00]/25 via-[#D61C75]/20 to-[#7A10FF]/25 blur-3xl"></div>

          <!-- main now-playing card -->
          <div class="relative mx-auto max-w-md rounded-[2rem] bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] p-8 text-white shadow-[0_30px_80px_-20px_rgba(214,28,117,0.55)]">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70"></span>
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                Live Podcast
              </span>
              <span class="text-xs font-medium text-white/80">3 Episodes</span>
            </div>

            <!-- mic + title -->
            <div class="mt-8 flex items-center gap-4">
              <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
              </div>
              <div>
                <p class="text-xl font-bold leading-tight">Building the Human Edge</p>
                <p class="text-sm text-white/80">in the Age of AI</p>
              </div>
            </div>

            <!-- animated equalizer -->
            <div class="mt-8 flex h-20 items-end gap-1.5">
              <span
                v-for="(b, i) in eqBars"
                :key="i"
                class="eq-bar h-full flex-1 rounded-full bg-white/85"
                :style="{ animationDelay: b.delay, animationDuration: b.dur }"
              ></span>
            </div>

            <!-- play + progress -->
            <div class="mt-6 flex items-center gap-4">
              <div class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#D61C75] shadow-md">
                <svg class="h-5 w-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25">
                <div class="h-full w-2/5 rounded-full bg-white"></div>
              </div>
              <span class="text-xs font-medium text-white/80">On air</span>
            </div>
          </div>

          <!-- floating: free for students -->
          <div class="absolute -top-5 -right-3 z-10 animate-float rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5">
            <p class="text-xs text-gray-500">Access</p>
            <p class="text-sm font-bold brand-gradient-text">Free for Students</p>
          </div>

          <!-- floating: speaker stack -->
          <div class="absolute -bottom-6 -left-6 z-10 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5">
            <div class="flex items-center gap-3">
              <div class="flex -space-x-2.5">
                <img
                  v-for="s in speakers"
                  :key="s.name"
                  :src="s.photo"
                  :alt="s.name"
                  class="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">Expert Speakers</p>
                <p class="text-[11px] text-gray-500">IITs &amp; global tech</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== ABOUT ===================== -->
    <section id="about" class="relative py-20 sm:py-24 bg-white">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 text-center" v-motion="fadeUp">
        <p class="kicker">Who We Are</p>
        <h2 class="section-title">
          <span class="brand-gradient-text">IIT · IITM · LEAD</span>
          <span class="mt-2 block text-gray-900">Youth Lead Initiative</span>
        </h2>
        <p class="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed">
          A society of intellectual minds from premier institutes &amp; industry — guiding students toward clarity, purpose, and meaningful success.
        </p>

        <p class="mt-8 text-base sm:text-lg leading-relaxed text-gray-600">
          Gita Unlocked brings together students, alumni of premier institutes, and working professionals — combining timeless wisdom with modern approaches to personal growth.
        </p>
      </div>
    </section>

    <!-- ===================== WHY ===================== -->
    <section id="why" class="relative py-20 sm:py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto" v-motion="fadeUp">
          <p class="kicker">The Case For It</p>
          <h2 class="section-title">Why Success Engineering?</h2>
        </div>
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(card, i) in whyCards"
            :key="card.title"
            class="group card-hover rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            v-motion="fadeUp"
          >
            <div class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#FF7A00]/10 via-[#D61C75]/10 to-[#7A10FF]/10 text-[#D61C75] group-hover:from-[#FF7A00] group-hover:via-[#D61C75] group-hover:to-[#7A10FF] group-hover:text-white transition">
              <svg v-if="card.icon === 'chip'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/><path stroke-linecap="round" d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3"/></svg>
              <svg v-else-if="card.icon === 'trophy'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 21h8m-4-4v4m-5-17h10v4a5 5 0 0 1-10 0V4Zm10 1h3v2a3 3 0 0 1-3 3m-10-5H4v2a3 3 0 0 0 3 3"/></svg>
              <svg v-else-if="card.icon === 'spark'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l1.8 4.8L18 9.6l-4.2 1.8L12 16l-1.8-4.6L6 9.6l4.2-1.8L12 3Zm6 9 .9 2.4L21 15l-2.1.6L18 18l-.9-2.4L15 15l2.1-.6L18 12Z"/></svg>
              <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 9-2 4-4 2 2-4 4-2Z"/></svg>
            </div>
            <h3 class="mt-5 font-semibold text-lg text-gray-900">{{ card.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ card.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SPEAKERS ===================== -->
    <section id="speakers" class="relative py-20 sm:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto" v-motion="fadeUp">
          <p class="kicker">Learn From The Best</p>
          <h2 class="section-title">Meet The Speakers</h2>
          <p class="mt-4 text-gray-600">IIT alumni, industry leaders and global technology professionals guiding the series.</p>
        </div>
        <div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(s, i) in speakers"
            :key="s.name"
            class="flip h-[26rem] cursor-pointer select-none"
            :class="{ 'is-flipped': flipped.has(i) }"
            v-motion="fadeUp"
            @click="toggleFlip(i)"
          >
            <div class="flip-inner">
              <!-- ===== FRONT ===== -->
              <div class="flip-face group flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:shadow-2xl hover:shadow-[#D61C75]/10 hover:border-[#D61C75]/20">
                <span class="absolute inset-x-10 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] opacity-0 group-hover:opacity-100 transition"></span>
                <div class="mx-auto h-36 w-36 rounded-full p-[3px] bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] transition duration-300 group-hover:scale-105">
                  <div class="h-full w-full rounded-full bg-white p-[3px]">
                    <img v-if="s.photo" :src="s.photo" :alt="s.name" class="h-full w-full rounded-full object-cover" />
                    <div v-else class="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-3xl font-bold brand-gradient-text">
                      {{ initials(s.name) }}
                    </div>
                  </div>
                </div>
                <h3 class="mt-6 text-lg font-semibold text-gray-900">{{ s.name }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ s.designation }}</p>
                <p v-if="s.designation2" class="mt-0.5 text-xs font-medium text-[#D61C75]">{{ s.designation2 }}</p>

                <!-- Company logo + name on a clean white pill -->
                <div class="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 shadow-sm transition duration-300 group-hover:border-[#D61C75]/30 group-hover:shadow-md">
                  <img v-if="s.companyLogo" :src="s.companyLogo" :alt="s.company" class="h-5 w-auto max-w-[84px] object-contain" />
                  <span class="text-sm font-semibold text-gray-900">{{ s.company }}</span>
                </div>

                <span class="mt-auto inline-flex items-center gap-1.5 rounded-full border border-[#D61C75]/20 bg-[#D61C75]/5 px-4 py-1.5 text-xs font-semibold text-[#D61C75] transition duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF7A00] group-hover:via-[#D61C75] group-hover:to-[#7A10FF] group-hover:text-white group-hover:border-transparent">
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M5 9a7 7 0 0 1 12-2.5L20 9M19 15a7 7 0 0 1-12 2.5L4 15"/></svg>
                  Tap to know more
                </span>
              </div>

              <!-- ===== BACK ===== -->
              <div class="flip-face flip-back flex flex-col rounded-3xl border border-[#D61C75]/25 bg-white p-7 text-left shadow-xl">
                <h3 class="text-lg font-bold text-gray-900">{{ s.name }}</h3>
                <p class="mt-0.5 text-xs font-semibold text-[#D61C75]">{{ s.designation }} · {{ s.company }}</p>
                <p class="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{{ s.bio }}</p>
                <div v-if="s.tags" class="mt-3 flex flex-wrap gap-1.5">
                  <span v-for="t in s.tags" :key="t" class="rounded-md bg-[#D61C75]/8 px-2 py-0.5 text-[11px] font-medium text-[#D61C75]">{{ t }}</span>
                </div>
                <a
                  v-if="s.linkedin"
                  :href="s.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004182]"
                  @click.stop
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
                  View LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== GAINS ===================== -->
    <section id="gains" class="relative py-20 sm:py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto" v-motion="fadeUp">
          <p class="kicker">The Takeaways</p>
          <h2 class="section-title">What You Will Gain</h2>
        </div>
        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(g, i) in gains"
            :key="g.title"
            class="group flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1.5"
            :class="g.highlight
              ? 'border-transparent bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-white shadow-lg shadow-[#D61C75]/30 hover:shadow-xl hover:shadow-[#D61C75]/40'
              : 'border-gray-100 bg-white hover:border-[#D61C75]/30 hover:shadow-xl hover:shadow-[#D61C75]/10'"
            v-motion="fadeUp"
          >
            <span
              class="grid h-12 w-12 shrink-0 place-items-center rounded-xl transition duration-300"
              :class="g.highlight
                ? 'bg-white/20 text-white'
                : 'bg-gradient-to-br from-[#FF7A00]/10 via-[#D61C75]/10 to-[#7A10FF]/10 text-[#D61C75] group-hover:from-[#FF7A00] group-hover:via-[#D61C75] group-hover:to-[#7A10FF] group-hover:text-white'"
            >
              <svg v-if="g.icon === 'certificate'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-2.5 2.5L5 22l4-2 4 2-1.5-6.5M5 5h-1v14M20 5h-6"/></svg>
              <svg v-else-if="g.icon === 'trophy'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 21h8m-4-4v4M7 4h10v4a5 5 0 0 1-10 0V4Zm10 1h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>
              <svg v-else-if="g.icon === 'trip'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.5 20 12 5l8.5 15M12 5v15M7 20l5-6 5 6"/></svg>
              <svg v-else-if="g.icon === 'rocket'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15c-1 0-3 .5-4 1.5C4 18 4 21 4 21s3 0 4.5-1c1-1 1.5-3 1.5-4M9 15l-3-3c1-4 5-9 9.5-9 1.5 0 2.5.5 2.5.5s.5 1 .5 2.5C18.5 10 13.5 14 9.5 15M14.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/></svg>
              <svg v-else-if="g.icon === 'users'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 18v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm13 9v-1a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11"/></svg>
              <svg v-else-if="g.icon === 'spark'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>
              <svg v-else-if="g.icon === 'frameworks'" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
              <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 22V4m0 0 4-1 6 2 4-1v9l-4 1-6-2-4 1"/></svg>
            </span>
            <p class="font-semibold leading-snug" :class="g.highlight ? 'text-white' : 'text-gray-800'">{{ g.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== JOURNEY ===================== -->
    <section id="journey" class="relative py-20 sm:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center max-w-3xl mx-auto" v-motion="fadeUp">
          <p class="kicker">The Roadmap</p>
          <h2 class="section-title">Your Journey Through Success Engineering</h2>
        </div>

        <div class="relative mt-16">
          <div class="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D61C75]/40 to-transparent"></div>
          <ol class="grid gap-8 lg:grid-cols-4">
            <li v-for="(step, i) in journey" :key="step.title" class="group relative" v-motion="fadeUp">
              <div class="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                <span
                  class="relative z-10 grid h-12 w-12 place-items-center rounded-full text-sm font-bold shrink-0 shadow-sm bg-white border-2 border-[#D61C75]/40 text-[#D61C75] transition duration-300 group-hover:border-transparent group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#FF7A00] group-hover:via-[#D61C75] group-hover:to-[#7A10FF]"
                >
                  {{ i + 1 }}
                </span>
                <div class="lg:mt-6 rounded-2xl border border-gray-100 bg-white p-5 w-full shadow-sm card-hover">
                  <p class="text-xs uppercase tracking-wider text-[#D61C75] font-semibold">{{ step.label }}</p>
                  <h3 class="mt-1 font-semibold text-gray-900 leading-snug">{{ step.title }}</h3>
                  <p v-if="step.date" class="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <svg class="h-3.5 w-3.5 shrink-0 text-[#D61C75]" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path stroke-linecap="round" d="M3 9h18M8 2.5v4m8-4v4"/></svg>
                    {{ step.date }}
                  </p>
                  <p v-if="step.topic" class="mt-2 text-sm leading-snug text-gray-600">{{ step.topic }}</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ===================== TEAM ===================== -->
    <section id="team" class="relative py-20 sm:py-24 bg-white">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto" v-motion="fadeUp">
          <p class="kicker">The People Behind It</p>
          <h2 class="section-title">Meet Our Team</h2>
        </div>
        <div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(m, i) in team"
            :key="m.name"
            class="group flex flex-col items-center text-center"
            v-motion="fadeUp"
          >
            <div class="h-32 w-32 rounded-full p-[3px] bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] transition group-hover:-translate-y-1 group-hover:shadow-lg">
              <div class="h-full w-full rounded-full bg-white p-[3px]">
                <img v-if="m.photo" :src="m.photo" :alt="m.name" class="h-full w-full rounded-full object-cover" />
                <div v-else class="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-2xl font-bold brand-gradient-text">
                  {{ initials(m.name) }}
                </div>
              </div>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">{{ m.name }}</h3>
            <p v-if="m.role" class="mt-1 text-sm font-medium brand-gradient-text">{{ m.role }}</p>
            <span class="mt-2 inline-block rounded-full border border-[#D61C75]/15 bg-[#D61C75]/5 px-3 py-0.5 text-xs font-semibold text-[#D61C75]">{{ m.detail }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== REGISTRATION ===================== -->
    <section id="register" class="relative py-20 sm:py-24 bg-gradient-to-b from-pink-50 via-orange-50 to-white">
      <div class="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div class="text-center" v-motion="fadeUp">
          <p class="kicker">Limited Seats</p>
          <h2 class="section-title">Reserve Your Seat</h2>
          <p class="mt-3 text-gray-600">Apply the <span class="font-semibold text-[#D61C75]">access code shared with you</span> below to unlock</p>
        </div>

        <div class="mt-10 rounded-3xl border border-gray-100 bg-white p-6 sm:p-9 shadow-xl">
          <!-- Success state -->
          <div v-if="state === 'success'" class="text-center py-10">
            <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-white">
              <svg class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" /></svg>
            </div>
            <h3 class="mt-5 text-2xl font-bold text-gray-900">You're in! 🎉</h3>
            <p class="mt-3 text-gray-600">Your seat for <strong class="text-[#D61C75]">Success Engineering</strong> is reserved. The Zoom link and reminders will be sent to your email and WhatsApp before the sessions.</p>
            <button class="btn-ghost mt-8" @click="resetForm">Register another student</button>
          </div>

          <!-- Duplicate state -->
          <div v-else-if="state === 'duplicate'" class="text-center py-10">
            <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-600">
              <svg class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" /></svg>
            </div>
            <h3 class="mt-5 text-2xl font-bold text-gray-900">Already registered</h3>
            <p class="mt-3 text-gray-600">This email is already on the list. Check your inbox for the confirmation — we'll see you at the sessions!</p>
            <button class="btn-ghost mt-8" @click="resetForm">Use a different email</button>
          </div>

          <!-- Form -->
          <form v-else class="grid sm:grid-cols-2 gap-5" novalidate @submit.prevent="submit">
            <div class="sm:col-span-2">
              <label class="field-label">Full Name <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.name" type="text" class="field" :class="errors.name && 'field-error'" placeholder="e.g. Aarav Sharma" />
              <p v-if="errors.name" class="field-msg">{{ errors.name }}</p>
            </div>

            <div>
              <label class="field-label">College <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.college" type="text" class="field" :class="errors.college && 'field-error'" placeholder="e.g. IIT" />
              <p v-if="errors.college" class="field-msg">{{ errors.college }}</p>
            </div>

            <div>
              <label class="field-label">Branch <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.branch" type="text" class="field" :class="errors.branch && 'field-error'" placeholder="e.g. Computer Science" />
              <p v-if="errors.branch" class="field-msg">{{ errors.branch }}</p>
            </div>

            <div>
              <label class="field-label">Year <span class="text-[#D61C75]">*</span></label>
              <select v-model="form.year" class="field" :class="errors.year && 'field-error'">
                <option value="" disabled>Select year</option>
                <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
              </select>
              <p v-if="errors.year" class="field-msg">{{ errors.year }}</p>
            </div>

            <div>
              <label class="field-label">Home Town <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.city" type="text" class="field" :class="errors.city && 'field-error'" placeholder="e.g. Bengaluru" />
              <p v-if="errors.city" class="field-msg">{{ errors.city }}</p>
            </div>

            <div>
              <label class="field-label">Email <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.email" type="email" class="field" :class="errors.email && 'field-error'" placeholder="you@example.com" />
              <p v-if="errors.email" class="field-msg">{{ errors.email }}</p>
            </div>

            <div>
              <label class="field-label">Phone Number <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.phone" type="tel" inputmode="tel" class="field" :class="errors.phone && 'field-error'" placeholder="10-digit mobile" />
              <p v-if="errors.phone" class="field-msg">{{ errors.phone }}</p>
            </div>

            <div>
              <label class="field-label">WhatsApp Number <span class="text-[#D61C75]">*</span></label>
              <input v-model.trim="form.whatsapp" type="tel" inputmode="tel" class="field" :class="errors.whatsapp && 'field-error'" placeholder="For Zoom link & reminders" />
              <p v-if="errors.whatsapp" class="field-msg">{{ errors.whatsapp }}</p>
            </div>

            <div class="sm:col-span-2">
              <label class="field-label">Why are you interested?</label>
              <textarea v-model.trim="form.reason" rows="3" class="field resize-none" placeholder="Tell us what you'd love to get out of this series"></textarea>
            </div>

            <!-- Access code + price summary -->
            <div class="sm:col-span-2 rounded-2xl border border-dashed border-[#D61C75]/30 bg-pink-50/40 p-4 sm:p-5">
              <label class="field-label">Access Code</label>
              <p class="-mt-1 mb-2 text-xs text-gray-500">Please check the details shared with you for your access code.</p>
              <div class="flex flex-col sm:flex-row gap-2">
                <input
                  v-model="couponInput"
                  type="text"
                  class="field flex-1 uppercase tracking-widest font-mono"
                  :class="couponStatus.state === 'error' && 'field-error'"
                  placeholder="Enter your access code"
                  @input="onCouponInput"
                  @keydown.enter.prevent="applyCoupon"
                />
                <button
                  type="button"
                  class="btn-brand justify-center px-6 whitespace-nowrap disabled:opacity-60"
                  :disabled="!!appliedCoupon"
                  @click="applyCoupon"
                >
                  {{ appliedCoupon ? "Applied" : "Apply" }}
                </button>
              </div>
              <p
                v-if="couponStatus.message"
                class="mt-2 text-sm font-medium"
                :class="couponStatus.state === 'success' ? 'text-green-600' : 'text-red-500'"
              >
                {{ couponStatus.message }}
              </p>

              <!-- Price summary -->
              <div class="mt-4 flex items-center justify-between border-t border-[#D61C75]/15 pt-3">
                <span class="text-sm text-gray-600">Registration fee</span>
                <span class="flex items-baseline gap-2">
                  <span
                    class="text-lg font-semibold"
                    :class="appliedCoupon ? 'text-gray-400 line-through decoration-[#D61C75] decoration-2' : 'text-gray-900'"
                  >
                    {{ event.currency }}{{ event.basePrice }}
                  </span>
                  <span
                    v-if="appliedCoupon"
                    class="text-xl font-extrabold bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text text-transparent"
                  >
                    FREE
                  </span>
                </span>
              </div>
            </div>

            <div class="sm:col-span-2">
              <p v-if="state === 'error'" class="mb-3 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">{{ serverMessage }}</p>
              <button
                type="submit"
                :disabled="!appliedCoupon || state === 'submitting'"
                class="btn-brand w-full justify-center text-base py-3.5 transition disabled:cursor-not-allowed"
                :class="!appliedCoupon ? 'blur-[2px] opacity-50' : ''"
              >
                <span v-if="state === 'submitting'" class="flex items-center gap-2">
                  <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"/></svg>
                  Reserving your seat…
                </span>
                <span v-else>Register Now</span>
              </button>
              <p v-if="!appliedCoupon" class="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-[#D61C75]">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path stroke-linecap="round" d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
                Apply a valid access code above to unlock registration.
              </p>
              <p v-else class="mt-3 text-center text-xs text-gray-400">We respect your privacy. Your details are used only for this event.</p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- ===================== FAQ ===================== -->
    <section id="faq" class="relative py-20 sm:py-24 bg-gray-50">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <div class="text-center" v-motion="fadeUp">
          <p class="kicker">Good To Know</p>
          <h2 class="section-title">Frequently Asked Questions</h2>
        </div>
        <div class="mt-12 space-y-3">
          <div v-for="(f, i) in faqs" :key="f.q" class="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <button class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left" @click="openFaq = openFaq === i ? -1 : i">
              <span class="font-medium text-gray-900">{{ f.q }}</span>
              <svg class="h-5 w-5 shrink-0 text-[#D61C75] transition-transform duration-300" :class="openFaq === i && 'rotate-45'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
            </button>
            <div v-show="openFaq === i" class="px-6 pb-5 -mt-1 text-gray-600 leading-relaxed">{{ f.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== FOOTER ===================== -->
    <footer id="contact" class="relative bg-gray-50 pt-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 text-center pb-12">
        <img src="/logo2.png" alt="Gita Unlocked" class="mx-auto w-36 h-auto" />
        <p class="mt-3 text-[#D61C75] tracking-[0.2em] text-sm uppercase font-semibold">Unveiling The Open Secret</p>
        <p class="mt-4 mx-auto max-w-xl text-gray-600 text-sm">Empowering youth through timeless wisdom, modern insights and meaningful growth.</p>

        <a href="#register" @click.prevent="scrollTo('register')" class="btn-brand mt-8 text-sm">Reserve Your Seat</a>
      </div>
      <!-- Brand gradient copyright bar (matches the main site footer) -->
      <div class="w-full flex justify-center items-center shadow-md tracking-[0.2em] px-4 py-3 font-bold text-base md:text-xl bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-white">
        Copyright © {{ year }} Gita Unlocked - All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import {
  event,
  speakers,
  whyCards,
  gains,
  journey,
  team,
  faqs,
  contact,
  yearOptions,
  validCoupons,
  couponColleges,
} from "~/data/successEngineering";

const year = new Date().getFullYear();

useHead({
  title: "Success Engineering — Building the Human Edge in the Age of AI | Gita Unlocked",
  meta: [
    {
      name: "description",
      content:
        "A free 3-part live interactive series for IIT & NIT students with IIT alumni, industry leaders and global technology professionals. Build your human edge for the age of AI. Register now.",
    },
    { property: "og:title", content: "Success Engineering — Building the Human Edge in the Age of AI" },
    { property: "og:description", content: "Free 3-part live series for IIT/NIT students. AI-era skills, human potential, leadership. Register now." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" },
  ],
});

// ---- Motion variants (snappy, no laggy spring delay) ----
// Hero animates immediately on mount; sections reveal quickly when scrolled into view.
const heroReveal = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 500, ease: "easeOut" } },
};
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 420, ease: "easeOut" } },
};

// ---- UI state ----
const scrolled = ref(false);
const mobileOpen = ref(false);
const openFaq = ref(0);

// Speaker flip cards — track which cards are flipped to their bio side.
const flipped = ref(new Set());
const toggleFlip = (i) => {
  const next = new Set(flipped.value);
  next.has(i) ? next.delete(i) : next.add(i);
  flipped.value = next;
};

const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

const scrollTo = (id) => {
  mobileOpen.value = false;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const initials = (name) =>
  name
    .replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Hero audio equalizer — varied delays/durations give a lively, organic bounce.
const eqBars = Array.from({ length: 26 }, (_, i) => ({
  delay: `-${((i * 0.13) % 1.1).toFixed(2)}s`,
  dur: `${(0.85 + (i % 5) * 0.18).toFixed(2)}s`,
}));

// ---- Registration form ----
const form = reactive({
  name: "",
  college: "",
  branch: "",
  year: "",
  email: "",
  phone: "",
  whatsapp: "",
  city: "",
  reason: "",
});
const errors = reactive({});
const state = ref("idle"); // idle | submitting | success | duplicate | error
const serverMessage = ref("");

// ---- Access code / coupon ----
const couponInput = ref("");
const appliedCoupon = ref("");
const couponStatus = reactive({ state: "", message: "" }); // '' | 'success' | 'error'

const onCouponInput = () => {
  couponInput.value = couponInput.value.toUpperCase();
  // If the field is changed after applying, clear the applied state.
  if (appliedCoupon.value && couponInput.value.trim() !== appliedCoupon.value) {
    appliedCoupon.value = "";
    couponStatus.state = "";
    couponStatus.message = "";
  }
};

// Resolve a code (case-insensitive) to its college, or "" if unknown.
const collegeForCode = (code) => {
  const entry = Object.entries(couponColleges).find(
    ([c]) => c.toUpperCase() === code.toUpperCase(),
  );
  return entry ? entry[1] : "";
};

const applyCoupon = () => {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    couponStatus.state = "error";
    couponStatus.message = "Please enter your access code.";
    return;
  }
  const college = collegeForCode(code);
  if (college) {
    appliedCoupon.value = code;
    // The code is college-specific — auto-fill the college so it matches
    // the code and the personalised confirmation email.
    form.college = college;
    couponStatus.state = "success";
    couponStatus.message = `Code applied for ${college} — your registration is free!`;
  } else {
    appliedCoupon.value = "";
    couponStatus.state = "error";
    couponStatus.message = "Invalid or expired code. Please check and try again.";
  }
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!form.name) errors.name = "Please enter your full name.";
  if (!form.college) errors.college = "Please enter your college.";
  if (!form.branch) errors.branch = "Please enter your branch.";
  if (!form.year) errors.year = "Please select your year.";
  if (!form.city) errors.city = "Please enter your city.";
  if (!EMAIL_RE.test(form.email)) errors.email = "Enter a valid email address.";
  if (form.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  if (form.whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "Enter a valid WhatsApp number.";
  return Object.keys(errors).length === 0;
};

const resetForm = () => {
  Object.keys(form).forEach((k) => (form[k] = ""));
  Object.keys(errors).forEach((k) => delete errors[k]);
  couponInput.value = "";
  appliedCoupon.value = "";
  couponStatus.state = "";
  couponStatus.message = "";
  state.value = "idle";
  serverMessage.value = "";
};

const submit = async () => {
  // Registration is gated behind a valid access code.
  if (!appliedCoupon.value) {
    couponStatus.state = "error";
    couponStatus.message = "Please apply a valid access code to unlock registration.";
    return;
  }
  if (!validate()) return;
  state.value = "submitting";
  serverMessage.value = "";

  const payload = {
    name: form.name,
    college: form.college,
    branch: form.branch,
    year: form.year,
    email: form.email.toLowerCase(),
    phone: form.phone,
    whatsapp: form.whatsapp,
    city: form.city,
    reason: form.reason,
    couponCode: appliedCoupon.value || "",
  };

  try {
    // Stored in MongoDB via a server route (handles dedupe + confirmation emails).
    const res = await $fetch("/api/se-register", { method: "POST", body: payload });

    if (res?.duplicate) {
      state.value = "duplicate";
      return;
    }

    state.value = "success";
  } catch (err) {
    console.error("Registration error:", err);
    serverMessage.value =
      err?.data?.statusMessage ||
      "Something went wrong while saving your registration. Please try again.";
    state.value = "error";
  }
};
</script>

<style scoped>
/* Brand heading font (matches the main Gita Unlocked site) */
.heading-script {
  font-family: "Kaushan Script", cursive;
}

/* Signature orange -> magenta -> purple brand gradient text */
.brand-gradient-text {
  @apply bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text text-transparent;
}

.kicker {
  @apply inline-block rounded-full bg-[#D61C75]/10 px-3.5 py-1 text-xs uppercase tracking-[0.25em] text-[#D61C75] font-semibold mb-4;
}
.section-title {
  @apply text-3xl sm:text-4xl font-bold text-gray-900 leading-tight;
}
/* Subtle gradient underline accent under each centered section title */
.section-title::after {
  content: "";
  display: block;
  width: 3.25rem;
  height: 4px;
  margin: 1rem auto 0;
  border-radius: 9999px;
  background: linear-gradient(to right, #ff7a00, #d61c75, #7a10ff);
}
.btn-brand {
  @apply inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#D61C75]/25 transition duration-200 hover:shadow-xl hover:shadow-[#D61C75]/40 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95;
}
.btn-ghost {
  @apply inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D61C75]/30 px-6 py-2.5 font-semibold text-[#D61C75] transition duration-200 hover:border-[#D61C75] hover:bg-[#D61C75]/5 hover:-translate-y-0.5;
}
.card-hover {
  @apply transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D61C75]/10 hover:border-[#D61C75]/30;
}

/* Speaker flip cards */
.flip {
  perspective: 1400px;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}
.flip.is-flipped .flip-inner {
  transform: rotateY(180deg);
}
.flip-face {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
}
.flip-back {
  transform: rotateY(180deg);
}
@media (prefers-reduced-motion: reduce) {
  .flip-inner {
    transition: none;
  }
}

/* Hero date/venue info cards with hover lift + gradient icon */
.info-card {
  @apply flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D61C75]/10 hover:border-[#D61C75]/30;
}
.info-ico {
  @apply grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#FF7A00]/10 via-[#D61C75]/10 to-[#7A10FF]/10 text-[#D61C75] transition duration-300;
}
.info-card:hover .info-ico {
  @apply bg-gradient-to-br from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-white;
}
.field-label {
  @apply block text-sm font-medium text-gray-700 mb-1.5;
}
.field {
  @apply w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#D61C75]/60 focus:ring-2 focus:ring-[#D61C75]/20 focus:bg-white;
}
.field-error {
  @apply border-red-400 focus:border-red-400 focus:ring-red-200;
}
.field-msg {
  @apply mt-1 text-xs text-red-500;
}
.contact-card {
  @apply flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg;
}
.contact-ico {
  @apply h-7 w-7 text-[#D61C75];
}
.contact-k {
  @apply mt-1 text-xs uppercase tracking-wider text-gray-400;
}
.contact-v {
  @apply text-sm font-medium text-gray-700 break-all;
}
.social-btn {
  @apply grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#D61C75]/40 hover:text-white hover:bg-gradient-to-br hover:from-[#FF7A00] hover:via-[#D61C75] hover:to-[#7A10FF];
}

/* Offset anchor jumps so sections aren't hidden behind the fixed nav */
section[id] {
  scroll-margin-top: 5rem;
}

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 28s linear infinite;
}
.animate-spin-slower {
  animation: spin-slow 42s linear infinite reverse;
}

/* ---- Hero audio equalizer ---- */
.eq-bar {
  transform-origin: bottom;
  animation: eq-bounce 1s ease-in-out infinite;
  will-change: transform;
}
@keyframes eq-bounce {
  0%,
  100% {
    transform: scaleY(0.18);
  }
  50% {
    transform: scaleY(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .eq-bar {
    animation: none;
    transform: scaleY(0.5);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}

/* Respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-spin-slow,
  .animate-spin-slower,
  .animate-float {
    animation: none;
  }
}
</style>
