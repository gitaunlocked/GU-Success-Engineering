<template>
  <div class="refresh-retreat">
    <!-- ======================================================================
         DEV-ONLY WARNING — content that is still placeholder
         Shown only while developing. A banner like this on the live page would
         read as a broken site to a student, but it must be impossible to miss
         while the quotes are drafts and the payment details are unset.
         ====================================================================== -->
    <div
      v-if="isDev && blockers.length"
      class="sticky top-0 z-[60] bg-[#7F1D1D] px-4 py-2 text-center text-xs font-semibold text-white"
    >
      DEV ONLY — not ready to publish: {{ blockers.join(' · ') }}
    </div>

    <!-- ======================================================================
         NAV
         ====================================================================== -->
    <header
      class="sticky top-0 z-50 transition duration-300"
      :class="scrolled ? 'bg-[#F8FAFC]/90 shadow-[0_1px_0_rgba(10,37,64,0.08)] backdrop-blur-xl' : 'bg-transparent'"
    >
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img :src="brand.logo" alt="" class="h-9 w-auto" />
          <span class="hidden text-sm font-semibold tracking-tight text-[#0A2540] sm:block">
            {{ brand.presenter }}
          </span>
        </NuxtLink>
        <div class="hidden items-center gap-8 lg:flex">
          <button v-for="l in navLinks" :key="l.id" type="button" class="nav-link" @click="scrollToId(l.id)">
            {{ l.label }}
          </button>
        </div>
        <button type="button" class="btn-primary px-5 py-2.5 text-sm" @click="scrollToId('register')">
          {{ hero.primaryCta }}
        </button>
      </nav>
    </header>

    <!-- ======================================================================
         HERO
         ====================================================================== -->
    <section id="hero" class="relative isolate overflow-hidden">
      <!-- Full-bleed photograph. The gradient wash sits behind it so the hero
           still reads as designed if the image is ever missing. -->
      <div class="hero-wash absolute inset-0 -z-20"></div>
      <img
        v-if="!heroImageBroken"
        ref="heroImgEl"
        :src="hero.image"
        alt=""
        class="absolute inset-0 -z-10 h-full w-full object-cover"
        @error="heroImageBroken = true"
      />
      <div class="hero-scrim absolute inset-0 -z-10"></div>

      <div class="mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
        <span class="badge-accent">{{ hero.badge }}</span>

        <h1 class="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] sm:text-7xl">
          {{ hero.title }}
        </h1>
        <p class="mt-4 font-serif text-2xl italic text-[#7DD3FC] drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-3xl">
          {{ hero.subtitle }}
        </p>

        <div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#34D399] to-transparent"></div>

        <p class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/90">{{ hero.tagline }}</p>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">{{ hero.intro }}</p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button type="button" class="btn-primary px-8 py-3.5 text-base" @click="scrollToId('register')">
            {{ hero.primaryCta }}
          </button>
          <button type="button" class="btn-hero-secondary px-7 py-3.5 text-base" @click="scrollToId('destinations')">
            {{ hero.secondaryCta }}
          </button>
        </div>

        <!-- Destination ticker -->
        <div class="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <template v-for="(d, i) in destinations" :key="d.id">
            <span class="text-sm font-medium tracking-wide text-white/85">{{ d.name }}</span>
            <span v-if="i < destinations.length - 1" class="text-[#34D399]" aria-hidden="true">◆</span>
          </template>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         ELIGIBILITY
         ====================================================================== -->
    <section id="eligibility" class="relative mx-auto max-w-5xl px-6 pb-20">
      <div class="rounded-[2rem] border border-[#0071E3]/[0.25] bg-white p-8 shadow-[0_24px_70px_-40px_rgba(10,37,64,0.35)] sm:p-12">
        <div class="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div class="shrink-0">
            <span class="grid h-14 w-14 place-items-center rounded-2xl bg-[#EFF6FF] text-[#0071E3] ring-1 ring-[#0071E3]/20">
              <component :is="icon('seal')" />
            </span>
          </div>
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl">
              {{ eligibility.title }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-[#4A5568]">{{ eligibility.body }}</p>
            <ul class="mt-6 grid gap-3 sm:grid-cols-2">
              <li v-for="p in eligibility.points" :key="p" class="flex items-start gap-2.5 text-sm text-[#4A5568]">
                <span class="mt-[0.3rem] text-[#0071E3]" aria-hidden="true">◆</span>
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         DESTINATIONS — one panel per destination, each with its own departure
         ====================================================================== -->
    <section id="destinations" class="relative bg-[#F1F5F9] py-24 sm:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center">
          <p class="eyebrow">The Destinations</p>
          <h2 class="section-title mt-3">{{ destinations.length }} places that still teach</h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4A5568]">
            Each destination travels as one group. Your campus decides which one you join — you will see yours
            the moment you pick your college in the form below.
          </p>
        </div>

        <div class="mt-16 space-y-10">
          <article
            v-for="(d, i) in destinations"
            :key="d.id"
            class="destination-card"
            :style="{ '--accent': d.accent }"
          >
            <div class="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]" :class="i % 2 === 1 && 'lg:[direction:rtl]'">
              <!-- Photo plate. The place name sits in the top corner, over the image. -->
              <div class="destination-plate lg:[direction:ltr]">
                <img
                  :src="d.photo"
                  :alt="d.photoAlt"
                  class="destination-photo"
                  loading="lazy"
                  decoding="async"
                />
                <div class="destination-scrim" :style="{ '--accent': d.accent }"></div>

                <div class="destination-plate-top">
                  <span class="destination-index">{{ String(i + 1).padStart(2, '0') }}</span>
                  <h3 class="mt-2 text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl">
                    {{ d.name }}
                  </h3>
                  <p class="mt-1.5 text-sm font-medium uppercase tracking-[0.25em] text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)]">
                    {{ d.state }}
                  </p>
                </div>

                <div class="destination-plate-bottom">
                  <span v-if="d.unesco" class="inline-flex items-center gap-2 self-start rounded-full bg-black/35 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm">
                    UNESCO World Heritage
                  </span>
                  <p class="mt-3 font-serif text-xl italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                    {{ d.tagline }}
                  </p>
                </div>

                <!-- Licence attribution; required wherever the photo is shown.
                     Omitted for CC0 images, which carry no such condition. -->
                <p v-if="d.credit" class="destination-credit">Photo: {{ d.credit.author }} · {{ d.credit.license }}</p>
              </div>

              <!-- Detail -->
              <div class="destination-body lg:[direction:ltr]">
                <div class="flex flex-wrap items-center gap-2.5">
                  <!-- Only Guruvayur carries a fixed date; the rest are set per campus. -->
                  <span v-if="d.date" class="meta-pill meta-pill--date">
                    <component :is="icon('calendar')" /> {{ d.date }}
                  </span>
                  <span class="meta-pill"><component :is="icon('clock')" /> {{ d.duration }}</span>
                </div>

                <p class="mt-6 text-base leading-relaxed text-[#4A5568]">{{ d.blurb }}</p>

                <ul class="mt-6 space-y-2.5">
                  <li v-for="h in d.highlights" :key="h" class="flex items-start gap-2.5 text-sm text-[#4A5568]">
                    <span class="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full" :style="{ background: d.accent }" aria-hidden="true"></span>
                    <span>{{ h }}</span>
                  </li>
                </ul>

                <p class="mt-7 border-l-2 pl-4 font-serif text-base italic text-[#0A2540]" :style="{ borderColor: d.accent }">
                  {{ d.lens }}
                </p>
              </div>
            </div>
          </article>
        </div>

        <!-- The six above are this edition, not the whole map. -->
        <div class="more-places">
          <p class="eyebrow">{{ moreDestinations.title }}</p>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4A5568]">
            {{ moreDestinations.body }}
          </p>
          <ul class="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            <li v-for="n in moreDestinations.names" :key="n" class="more-pill">{{ n }}</li>
            <li class="more-pill more-pill--muted">and more to come</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         INCLUSIONS
         ====================================================================== -->
    <section id="included" class="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div class="text-center">
        <p class="eyebrow">What's Included</p>
        <h2 class="section-title mt-3">Everything, arranged</h2>
      </div>
      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in inclusions" :key="item.label" class="inclusion-card">
          <span class="inclusion-icon"><component :is="icon(item.icon)" /></span>
          <div>
            <p class="detail-label">{{ item.label }}</p>
            <p class="detail-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         HOW IT WORKS
         ====================================================================== -->
    <section id="how" class="relative bg-[#0A2540] py-24 sm:py-28">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center">
          <p class="inline-block rounded-full bg-white/[0.08] px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0A84FF]">
            How It Works
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Four steps to your seat</h2>
        </div>
        <ol class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="s in steps" :key="s.n" class="step-card">
            <span class="font-serif text-4xl italic text-[#0A84FF]">{{ s.n }}</span>
            <h3 class="mt-4 text-lg font-semibold tracking-tight text-white">{{ s.title }}</h3>
            <p class="mt-2.5 text-sm leading-relaxed text-white/70">{{ s.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ======================================================================
         REGISTRATION
         ====================================================================== -->
    <section id="register" class="relative mx-auto max-w-3xl scroll-mt-24 px-6 py-24 sm:py-32">
      <!-- ---------- Thank you ---------- -->
      <div v-if="submitState === 'success'" class="premium-card p-10 text-center sm:p-14">
        <div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#059669] to-[#34D399] shadow-[0_20px_40px_-15px_rgba(5,150,105,0.6)]">
          <svg class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path class="check-path" d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 class="mt-8 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">Thank you — we have your registration</h2>
        <p class="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#4A5568]">
          Your details and payment proof have reached us. Our team verifies every payment by hand and will write to
          you once your seat is confirmed.
        </p>
        <div v-if="confirmedDestination" class="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-[#0071E3]/25 bg-[#EFF6FF] px-8 py-5">
          <span class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B]">Your destination</span>
          <span class="mt-1.5 text-2xl font-semibold tracking-tight text-[#0A2540]">{{ confirmedDestination }}</span>
          <span v-if="confirmedSpot" class="mt-1 font-serif text-base italic text-[#4A5568]">
            {{ confirmedSpot.tagline }}
          </span>
          <span v-if="confirmedSpot" class="mt-2 text-xs text-[#64748B]">
            <template v-if="confirmedSpot.date">{{ confirmedSpot.date }} · </template>{{ confirmedSpot.duration }}
          </span>
        </div>
        <p class="mx-auto mt-8 max-w-lg text-sm text-[#94A3B8]">
          Please keep your transaction reference safe until you hear from us. Submitting this form does not by itself
          reserve a seat.
        </p>
        <div class="mt-10">
          <NuxtLink to="/" class="btn-secondary px-8 py-3.5 text-base">Back to Home</NuxtLink>
        </div>
      </div>

      <!-- ---------- Already registered ---------- -->
      <div v-else-if="submitState === 'duplicate'" class="premium-card p-10 text-center sm:p-12">
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-3xl text-amber-600">!</div>
        <h2 class="mt-6 text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl">Already registered</h2>
        <p class="mx-auto mt-3 max-w-md text-base text-[#4A5568]">
          A registration with this mobile number is already on record. Our team will reach out with next steps.
        </p>
        <button type="button" class="btn-secondary mt-8 px-6 py-3" @click="resetForm">
          Use a different mobile number
        </button>
      </div>

      <!-- ---------- Form ---------- -->
      <template v-else>
        <div class="text-center">
          <p class="eyebrow">Registration</p>
          <h2 class="section-title mt-3">Reserve your place</h2>
          <p class="mt-4 text-sm text-[#94A3B8]">Two steps: your details, then payment. Allow about five minutes.</p>
        </div>

        <!-- Step rail -->
        <div class="mx-auto mt-10 flex max-w-sm items-center gap-3">
          <template v-for="s in 2" :key="s">
            <div class="flex items-center gap-2.5">
              <span class="step-dot" :class="step >= s ? 'step-dot--on' : ''">{{ s }}</span>
              <span class="text-xs font-semibold uppercase tracking-[0.16em]" :class="step >= s ? 'text-[#0A2540]' : 'text-[#94A3B8]'">
                {{ s === 1 ? 'Your details' : 'Payment' }}
              </span>
            </div>
            <span v-if="s === 1" class="h-px flex-1 bg-[#E2E8F0]"></span>
          </template>
        </div>

        <form class="premium-card mt-10 p-8 sm:p-10" novalidate @submit.prevent="onSubmit">
          <!-- ================= STEP 1 ================= -->
          <div v-show="step === 1" class="grid gap-9">
            <!-- ---- About you ---- -->
            <fieldset class="grid gap-5">
              <legend class="fieldset-legend">About you</legend>

              <div class="grid gap-5 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label for="hw-name" class="lbl">Full Name <span class="req">*</span></label>
                  <input
                    id="hw-name"
                    v-model.trim="form.fullName"
                    type="text"
                    class="field"
                    :class="errors.fullName && 'field-error'"
                    placeholder="e.g. Aarav Sharma"
                    autocomplete="name"
                  />
                  <p v-if="errors.fullName" class="field-msg">{{ errors.fullName }}</p>
                </div>

                <div>
                  <label for="hw-mobile" class="lbl">Mobile Number <span class="req">*</span></label>
                  <input
                    id="hw-mobile"
                    v-model.trim="form.mobile"
                    type="tel"
                    inputmode="tel"
                    class="field"
                    :class="errors.mobile && 'field-error'"
                    placeholder="10-digit mobile"
                    autocomplete="tel"
                  />
                  <p v-if="errors.mobile" class="field-msg">{{ errors.mobile }}</p>
                </div>

                <div>
                  <label for="hw-gender" class="lbl">Gender <span class="req">*</span></label>
                  <div class="relative">
                    <select
                      id="hw-gender"
                      v-model="form.gender"
                      class="field appearance-none pr-11"
                      :class="[errors.gender && 'field-error', !form.gender && 'text-[#94A3B8]']"
                    >
                      <option value="" disabled>Select</option>
                      <option v-for="g in genderOptions" :key="g" :value="g">{{ g }}</option>
                    </select>
                    <span class="select-caret" aria-hidden="true"><component :is="icon('caret')" /></span>
                  </div>
                  <p v-if="errors.gender" class="field-msg">{{ errors.gender }}</p>
                </div>

                <div class="sm:col-span-2">
                  <label for="hw-email" class="lbl">Email <span class="req">*</span></label>
                  <input
                    id="hw-email"
                    v-model.trim="form.email"
                    type="email"
                    inputmode="email"
                    class="field"
                    :class="errors.email && 'field-error'"
                    placeholder="you@example.com"
                    autocomplete="email"
                  />
                  <p v-if="errors.email" class="field-msg">{{ errors.email }}</p>
                </div>
              </div>
            </fieldset>

            <!-- ---- Your campus ---- -->
            <fieldset class="grid gap-5">
              <legend class="fieldset-legend">Your campus</legend>

              <div>
                <label for="hw-college" class="lbl">College <span class="req">*</span></label>
                <div class="relative">
                  <select
                    id="hw-college"
                    v-model="form.college"
                    class="field appearance-none pr-11"
                    :class="[errors.college && 'field-error', !form.college && 'text-[#94A3B8]']"
                  >
                    <option value="" disabled>Select your college</option>
                    <option v-for="c in collegeOptions" :key="c" :value="c">{{ c }}</option>
                  </select>
                  <span class="select-caret" aria-hidden="true"><component :is="icon('caret')" /></span>
                </div>
                <p v-if="errors.college" class="field-msg">{{ errors.college }}</p>
              </div>

              <!-- Allotted destination, revealed as soon as a college is picked -->
              <Transition name="reveal">
                <div v-if="allottedSpot" class="allotment" :style="{ '--accent': allottedSpot.accent }">
                  <div class="flex items-start gap-4">
                    <span class="allotment-icon"><component :is="icon('pin')" /></span>
                    <div>
                      <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B]">
                        Your destination
                      </p>
                      <p class="mt-1 text-2xl font-semibold tracking-tight text-[#0A2540]">
                        {{ allottedSpot.name }}<span class="text-[#64748B]">, {{ allottedSpot.state }}</span>
                      </p>
                      <p class="mt-1.5 font-serif text-base italic text-[#4A5568]">{{ allottedSpot.tagline }}</p>
                      <p class="mt-3 text-xs text-[#94A3B8]">
                        <template v-if="allottedSpot.date">{{ allottedSpot.date }} · {{ allottedSpot.duration }} · allotted by your campus</template>
                        <template v-else>{{ allottedSpot.duration }} · allotted by your campus · dates shared once your group is confirmed</template>
                      </p>
                      <!-- The full detail lives in its own section rather than
                           inside the form, which got crowded fast. -->
                      <button
                        v-if="isFeaturedCollege"
                        type="button"
                        class="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] transition hover:gap-2.5"
                        @click="scrollToId('retreat-detail')"
                      >
                        See the full retreat details, inclusions and pricing
                        <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M10 4v12m0 0-5-5m5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>

            </fieldset>

            <div class="flex justify-end">
              <button type="button" class="btn-primary px-8 py-3.5 text-base" @click="goToStep2">
                Continue to payment
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <!-- ================= STEP 2 ================= -->
          <div v-show="step === 2" class="grid gap-7">
            <!-- Summary of step 1 -->
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] px-5 py-4">
              <div class="text-sm text-[#4A5568]">
                <span class="font-semibold text-[#0A2540]">{{ form.fullName }}</span>
                <span class="mx-2 text-[#CBD5E1]">·</span>{{ form.college }}
                <template v-if="allottedSpot">
                  <span class="mx-2 text-[#CBD5E1]">·</span>
                  <span class="font-semibold" :style="{ color: allottedSpot.accent }">{{ allottedSpot.name }}</span>
                </template>
              </div>
              <button type="button" class="text-xs font-semibold text-[#0071E3] underline-offset-4 hover:underline" @click="step = 1">
                Edit
              </button>
            </div>

            <!-- Amount -->
            <div class="rounded-2xl border border-[#0071E3]/25 bg-[#EFF6FF] p-6 text-center">
              <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B]">Your contribution</p>
              <p class="mt-2 flex items-baseline justify-center gap-3">
                <span v-if="payment.fullCost" class="text-xl font-medium text-[#94A3B8] line-through">
                  {{ payment.currency }}{{ payment.fullCost.toLocaleString('en-IN') }}
                </span>
                <span class="text-4xl font-semibold tracking-tight text-[#0A2540]">
                  {{ payment.currency }}{{ payment.amount.toLocaleString('en-IN') }}
                </span>
              </p>
              <p v-if="payment.fullCost" class="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#047857]">
                {{ payment.currency }}{{ (payment.fullCost - payment.amount).toLocaleString('en-IN') }} sponsored by
                {{ form.college ? `${form.college} alumni` : 'alumni' }}
              </p>
              <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4A5568]">{{ payment.note }}</p>
            </div>

            <!-- QR + UPI -->
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B]">Scan to pay</p>
                <img
                  v-if="!qrBroken"
                  ref="qrImgEl"
                  :src="payment.qrImage"
                  alt="UPI QR code for the Heritage Walk contribution"
                  class="mt-4 h-44 w-44 rounded-xl object-contain ring-1 ring-black/5"
                  @error="qrBroken = true"
                />
                <div v-else class="mt-4 grid h-44 w-44 place-items-center rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 text-center">
                  <span class="text-xs leading-relaxed text-[#64748B]">
                    <template v-if="payment.upiId">QR code not uploaded yet.<br />Use the UPI ID alongside.</template>
                    <template v-else>QR code not uploaded yet.</template>
                  </span>
                </div>
              </div>

              <div class="flex flex-col justify-center rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B]">Or pay by UPI ID</p>
                <template v-if="payment.upiId">
                  <p class="mt-3 break-all text-base font-semibold text-[#0A2540]">{{ payment.upiId }}</p>
                  <p v-if="payment.accountName" class="mt-1 text-sm text-[#94A3B8]">{{ payment.accountName }}</p>
                  <button type="button" class="btn-copy mt-4 self-start" :class="upiCopied && 'btn-copy--done'" @click="copyUpi">
                    {{ upiCopied ? 'Copied' : 'Copy UPI ID' }}
                  </button>
                </template>
                <p v-else-if="!qrBroken" class="mt-3 text-sm leading-relaxed text-[#64748B]">
                  UPI details are being finalised. Please pay using the QR code alongside.
                </p>
                <p v-else class="mt-3 text-sm leading-relaxed text-[#64748B]">
                  Payment details are being finalised. Please write to
                  <a :href="`mailto:${footer.email}`" class="font-semibold text-[#0A2540] underline">{{ footer.email }}</a>
                  and we will send them to you directly.
                </p>
                <p class="mt-5 text-xs leading-relaxed text-[#94A3B8]">
                  After paying, take a screenshot of the transaction and upload it below.
                </p>
              </div>
            </div>

            <!-- Upload -->
            <div>
              <label class="lbl">Payment Screenshot <span class="req">*</span></label>
              <div
                class="upload-drop"
                :class="{ 'upload-drop--active': isDragging, 'upload-drop--filled': !!file, 'field-error': errors.file }"
                role="button"
                tabindex="0"
                @click="fileInputRef?.click()"
                @keydown.enter.prevent="fileInputRef?.click()"
                @keydown.space.prevent="fileInputRef?.click()"
                @dragenter.prevent="isDragging = true"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="onDrop"
              >
                <input
                  ref="fileInputRef"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  class="hidden"
                  @change="onFileChange"
                />

                <div v-if="!file" class="text-center">
                  <span class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#0071E3] shadow-sm ring-1 ring-black/5" aria-hidden="true">
                    <component :is="icon('upload')" />
                  </span>
                  <p class="mt-4 text-sm font-semibold text-[#0A2540]">Click to upload, or drag your screenshot here</p>
                  <p class="mt-1 text-xs text-[#64748B]">PNG, JPG or PDF · up to 4 MB</p>
                </div>

                <div v-else class="flex w-full items-center gap-4">
                  <img v-if="filePreview" :src="filePreview" alt="" class="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-black/5" />
                  <span v-else class="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] text-[#0071E3] ring-1 ring-black/5">
                    <component :is="icon('file')" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-[#0A2540]">{{ file.name }}</p>
                    <p class="mt-0.5 text-xs text-[#64748B]">{{ formatBytes(file.size) }}</p>
                  </div>
                  <button type="button" class="shrink-0 text-xs font-semibold text-[#0071E3] underline-offset-4 hover:underline" @click.stop="clearFile">
                    Replace
                  </button>
                </div>
              </div>
              <p v-if="errors.file" class="field-msg">{{ errors.file }}</p>
            </div>

            <!-- Consent -->
            <div>
              <div class="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B]">Participation terms</p>
                <ul class="mt-3 space-y-2">
                  <li v-for="c in consent.points" :key="c" class="flex items-start gap-2.5 text-xs leading-relaxed text-[#4A5568]">
                    <span class="mt-[0.3rem] text-[#0071E3]" aria-hidden="true">◆</span>
                    <span>{{ c }}</span>
                  </li>
                </ul>
              </div>

              <label class="checkbox-row mt-3" :class="errors.consent && 'ring-red-300'">
                <input v-model="form.consentAccepted" type="checkbox" class="checkbox-input" />
                <span class="text-sm text-[#4A5568]">{{ consent.label }} <span class="req">*</span></span>
              </label>
              <p v-if="errors.consent" class="field-msg">Please accept the participation terms to submit.</p>
            </div>

            <p v-if="serverError" class="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {{ serverError }}
            </p>

            <div class="flex flex-wrap items-center justify-between gap-3">
              <button type="button" class="btn-secondary px-6 py-3" @click="step = 1">Back</button>
              <button type="submit" class="btn-primary px-8 py-3.5 text-base" :disabled="submitState === 'submitting'">
                {{ submitState === 'submitting' ? 'Submitting…' : 'Submit registration' }}
              </button>
            </div>
          </div>
        </form>
      </template>
    </section>

    <!-- ======================================================================
         RETREAT DETAIL — full width, revealed for the featured campus
         Every campus has its own retreat, so this describes NIT Calicut's and
         appears only once that college is selected in the form above. It lives
         out here rather than inside the form, which got crowded fast.
         ====================================================================== -->
    <Transition name="reveal">
      <section
        v-if="isFeaturedCollege"
        id="retreat-detail"
        class="relative scroll-mt-24 bg-[#0A2540] py-24 sm:py-28"
      >
        <div class="retreat-detail-wash absolute inset-0"></div>
        <div class="relative mx-auto max-w-6xl px-6">
          <div class="text-center">
            <p class="eyebrow-on-dark">{{ featuredCollege }}</p>
            <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Your retreat, in full
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Everything {{ featuredCollege }} students travelling to {{ guruvayur.name }} on
              {{ retreatDate }} need to know.
            </p>
          </div>

          <!-- Retreat Details -->
          <dl class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="d in retreatDetails" :key="d.label" class="detail-card">
              <span class="detail-icon"><component :is="icon(d.icon)" /></span>
              <div class="min-w-0">
                <dt class="detail-label">{{ d.label }}</dt>
                <dd class="detail-value">{{ d.value }}</dd>
              </div>
            </div>
          </dl>

          <!-- What You'll Experience -->
          <div class="mt-20">
            <h3 class="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What You'll Experience
            </h3>
            <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="e in experiences" :key="e.title" class="experience-card">
                <span class="experience-emoji" aria-hidden="true">{{ e.emoji }}</span>
                <p class="mt-5 text-base font-semibold tracking-tight text-white">{{ e.title }}</p>
                <p class="mt-2 text-sm leading-relaxed text-white/65">{{ e.body }}</p>
              </div>
            </div>
          </div>

          <!-- Transparent pricing -->
          <div class="mt-20">
            <h3 class="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Transparent Pricing — Registration Fee
            </h3>
            <p class="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-white/60">
              The real cost of the day, and how much of it the alumni carry.
            </p>
            <div class="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9">
              <ul class="divide-y divide-white/10">
                <li v-for="b in pricing.breakdown" :key="b.label" class="flex items-center justify-between py-3">
                  <span class="text-sm text-white/70">{{ b.label }}</span>
                  <span class="text-sm font-semibold text-white">
                    {{ pricing.currency }}{{ b.amount.toLocaleString('en-IN') }}
                  </span>
                </li>
                <li class="flex items-center justify-between py-3">
                  <span class="text-sm font-semibold text-white">Actual cost per student</span>
                  <span class="text-sm font-semibold text-white">
                    {{ pricing.currency }}{{ pricing.actualCost.toLocaleString('en-IN') }}
                  </span>
                </li>
                <li class="flex items-center justify-between py-3">
                  <span class="text-sm text-white/70">Covered by {{ featuredCollege }} alumni</span>
                  <span class="text-sm font-semibold text-[#34D399]">
                    − {{ pricing.currency }}{{ (pricing.actualCost - pricing.studentContribution).toLocaleString('en-IN') }}
                  </span>
                </li>
              </ul>
              <div class="mt-6 flex items-center justify-between rounded-2xl border border-[#34D399]/25 bg-[#34D399]/10 px-6 py-5">
                <span class="text-sm font-semibold uppercase tracking-[0.16em] text-[#34D399]">You pay</span>
                <span class="text-3xl font-semibold tracking-tight text-white">
                  {{ pricing.currency }}{{ pricing.studentContribution.toLocaleString('en-IN') }}
                </span>
              </div>
            </div>

            <div class="mt-10 text-center">
              <button type="button" class="btn-primary px-8 py-3.5 text-base" @click="scrollToId('register')">
                Continue your registration
              </button>
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <!-- ======================================================================
         VOICES
         ====================================================================== -->
    <section id="voices" class="relative bg-[#F1F5F9] py-24 sm:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center">
          <p class="eyebrow">In Appreciation</p>
          <h2 class="section-title mt-3">Voices on Gita Unlocked — Success Engineering</h2>
        </div>
        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <figure v-for="t in testimonials" :key="t.name" class="voice-card">
            <span class="font-serif text-5xl leading-none text-[#0071E3]/40" aria-hidden="true">&ldquo;</span>
            <blockquote class="mt-2 flex-1 text-sm leading-relaxed text-[#4A5568]">{{ t.quote }}</blockquote>
            <figcaption class="mt-6 flex items-center gap-3.5 border-t border-[#E2E8F0] pt-5">
              <img v-if="t.photo" :src="t.photo" :alt="t.name" class="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-1 ring-black/5" />
              <span v-else class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0A2540] text-sm font-semibold text-[#0A84FF]">
                {{ initials(t.name) }}
              </span>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-[#0A2540]">{{ t.name }}</p>
                <p class="truncate text-xs text-[#64748B]">{{ t.role }}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         TEAM
         ====================================================================== -->
    <section id="team" class="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div class="text-center">
        <p class="eyebrow">Who You Travel With</p>
        <h2 class="section-title mt-3">The team on ground</h2>
      </div>
      <div class="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <div v-for="m in team" :key="m.name" class="team-card">
          <img v-if="m.photo" :src="m.photo" :alt="m.name" class="h-24 w-24 rounded-full object-cover object-top ring-2 ring-[#0071E3]/20" />
          <span v-else class="grid h-24 w-24 place-items-center rounded-full bg-[#0A2540] text-lg font-semibold text-[#0A84FF]">
            {{ initials(m.name) }}
          </span>
          <p class="mt-4 text-sm font-semibold leading-snug text-[#0A2540]">{{ m.name }}</p>
          <p class="mt-1 text-xs text-[#64748B]">{{ m.detail }}</p>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         FAQ
         ====================================================================== -->
    <section id="faq" class="relative bg-[#F8FAFC] py-24 sm:py-28">
      <div class="mx-auto max-w-3xl px-6">
        <div class="text-center">
          <p class="eyebrow">Questions</p>
          <h2 class="section-title mt-3">Before you register</h2>
        </div>
        <div class="mt-12 space-y-3">
          <details v-for="(f, i) in faqs" :key="i" class="faq-item">
            <summary class="faq-summary">
              <span>{{ f.q }}</span>
              <span class="faq-chevron" aria-hidden="true">
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                  <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </summary>
            <p class="px-6 pb-5 text-sm leading-relaxed text-[#4A5568]">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         FOOTER
         ====================================================================== -->
    <footer class="bg-[#0A2540] py-14">
      <div class="mx-auto max-w-6xl px-6 text-center">
        <p class="font-serif text-2xl italic text-[#0A84FF]">{{ footer.name }}</p>
        <p class="mt-1.5 text-sm text-white/70">{{ footer.tagline }}</p>
        <div class="mx-auto mt-6 h-px w-20 bg-white/[0.15]"></div>
        <p class="mt-6 text-sm font-semibold text-white">{{ footer.presenter }}</p>
        <p class="mt-1 text-xs text-white/50">{{ footer.ecosystem }}</p>
        <p class="mt-8 text-xs text-white/40">© {{ year }} Gita Unlocked. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { h, reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  brand,
  hero,
  eligibility,
  destinations,
  destinationById,
  moreDestinations,
  collegeOptions,
  genderOptions,
  spotForCollege,
  unmappedColleges,
  featuredCollege,
  retreatDetails,
  experiences,
  pricing,
  inclusions,
  steps,
  payment,
  consent,
  testimonials,
  team,
  faqs,
  seo,
  footer,
  guruvayur,
  retreatDate,
} from '~/data/refreshRetreat2026'

definePageMeta({ layout: 'landing' })
useHead({
  title: seo.title,
  meta: [
    { name: 'description', content: seo.description },
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&display=swap',
    },
  ],
})

const year = new Date().getFullYear()
const isDev = import.meta.dev
const unapprovedCount = testimonials.filter((t) => !t.approved).length

// A college listed in couponColleges but missing from collegeRegions would
// appear in the dropdown and then allot nothing. Surface it while developing
// rather than letting a student hit it.
if (import.meta.dev && unmappedColleges.length) {
  console.warn(
    `[refresh-retreat] no destination mapped for: ${unmappedColleges.join(', ')}. ` +
      'Add them to collegeRegions in data/refreshRetreat2026.js.',
  )
}

const navLinks = [
  { id: 'destinations', label: 'Destinations' },
  { id: 'included', label: 'Included' },
  { id: 'how', label: 'How It Works' },
  { id: 'voices', label: 'Voices' },
  { id: 'faq', label: 'FAQ' },
]

// --- Nav shadow on scroll ---
const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 30
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const initials = (name) =>
  name
    .replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

// --- Form state ---
const step = ref(1)
const form = reactive({
  fullName: '',
  mobile: '',
  email: '',
  gender: '',
  college: '',
  consentAccepted: false,
})
const errors = reactive({})
// 'idle' | 'submitting' | 'success' | 'duplicate'
const submitState = ref('idle')
const serverError = ref('')
const confirmedSpot = ref(null)
const confirmedDestination = ref('')

// The destination follows from the college — the student never picks it.
const allottedSpot = computed(() => (form.college ? spotForCollege(form.college) : null))

// Every campus runs its own retreat. The detail, experience and pricing blocks
// describe the featured campus's, so they stay hidden until it is selected.
const isFeaturedCollege = computed(() => form.college === featuredCollege)

// --- Images that fall back when the file is missing ---
const qrBroken = ref(false)
const qrImgEl = ref(null)
const heroImageBroken = ref(false)
const heroImgEl = ref(null)

// The browser starts loading these from the server-rendered HTML, so a 404 can
// fire before Vue hydrates and @error is never seen. Re-check once on mount.
onMounted(() => {
  const broken = (img) => img?.complete && img.naturalWidth === 0
  if (broken(qrImgEl.value)) qrBroken.value = true
  if (broken(heroImgEl.value)) heroImageBroken.value = true
})

// Everything on this page that is still a placeholder, gathered into the one
// dev banner so nothing ships half-finished.
const blockers = computed(() => {
  const list = []
  if (unapprovedCount) list.push(`${unapprovedCount} testimonial quotes unapproved`)
  if (qrBroken.value) list.push('payment QR missing')
  if (!payment.upiId) list.push('UPI ID unset')
  if (unmappedColleges.length) list.push(`${unmappedColleges.length} colleges unmapped`)
  return list
})
const upiCopied = ref(false)
async function copyUpi() {
  try {
    if (import.meta.client && payment.upiId) {
      await navigator.clipboard.writeText(payment.upiId)
      upiCopied.value = true
      setTimeout(() => (upiCopied.value = false), 1800)
    }
  } catch {
    // Non-fatal — the UPI ID is on screen to read.
  }
}

// --- File upload ---
const fileInputRef = ref(null)
const file = ref(null)
const filePreview = ref('')
const isDragging = ref(false)
const MAX_FILE_BYTES = 4 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']

function acceptFile(f) {
  if (!f) return
  if (!ALLOWED_TYPES.includes(f.type)) {
    errors.file = 'Please upload a PNG, JPG or PDF file.'
    return
  }
  if (f.size > MAX_FILE_BYTES) {
    errors.file = 'File is too large. Please keep it under 4 MB.'
    return
  }
  delete errors.file
  file.value = f
  filePreview.value = ''
  if (f.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      filePreview.value = e.target?.result || ''
    }
    reader.readAsDataURL(f)
  }
}
const onFileChange = (e) => acceptFile(e.target.files?.[0])
function onDrop(e) {
  isDragging.value = false
  acceptFile(e.dataTransfer?.files?.[0])
}
function clearFile() {
  file.value = null
  filePreview.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

// --- Validation ---
const STEP_1_FIELDS = ['fullName', 'mobile', 'email', 'gender', 'college']

function validateStep1() {
  STEP_1_FIELDS.forEach((f) => delete errors[f])

  if (!form.fullName) errors.fullName = 'Please enter your full name.'
  if (form.mobile.replace(/\D/g, '').length !== 10) errors.mobile = 'Enter a valid 10-digit mobile number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!genderOptions.includes(form.gender)) errors.gender = 'Please select an option.'
  if (!collegeOptions.includes(form.college)) errors.college = 'Please select your college.'

  return STEP_1_FIELDS.every((f) => !errors[f])
}

function validateStep2() {
  delete errors.file
  delete errors.consent
  if (!file.value) errors.file = 'Please upload your payment screenshot.'
  if (!form.consentAccepted) errors.consent = true
  return !errors.file && !errors.consent
}

function goToStep2() {
  if (!validateStep1()) {
    scrollToFirstError()
    return
  }
  step.value = 2
  if (import.meta.client) setTimeout(() => scrollToId('register'), 50)
}

function scrollToFirstError() {
  if (!import.meta.client) return
  document.querySelector('.field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

async function onSubmit() {
  serverError.value = ''
  // Step 1 is re-checked here too: the fields are only hidden, not unmounted,
  // so a value could have been cleared after passing the first check.
  if (!validateStep1()) {
    step.value = 1
    scrollToFirstError()
    return
  }
  if (!validateStep2()) {
    scrollToFirstError()
    return
  }

  submitState.value = 'submitting'
  try {
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
    fd.append('paymentScreenshot', file.value)

    const res = await $fetch('/api/refresh-retreat-register', { method: 'POST', body: fd })

    if (res?.duplicate) {
      submitState.value = 'duplicate'
      return
    }
    // Shown on the thank-you card. Keyed off the server response so the student
    // sees the circuit that was actually recorded, not just the one on screen.
    confirmedSpot.value = destinationById[res?.destinationId] || allottedSpot.value || null
    confirmedDestination.value = confirmedSpot.value
      ? `${confirmedSpot.value.name}, ${confirmedSpot.value.state}`
      : res?.destination || ''
    submitState.value = 'success'
    if (import.meta.client) setTimeout(() => scrollToId('register'), 100)
  } catch (err) {
    console.error('refresh-retreat register error:', err)
    serverError.value =
      err?.data?.statusMessage || 'Something went wrong while submitting. Please try again in a moment.'
    submitState.value = 'idle'
  }
}

function resetForm() {
  Object.keys(form).forEach((k) => {
    form[k] = k === 'consentAccepted' ? false : ''
  })
  Object.keys(errors).forEach((k) => delete errors[k])
  clearFile()
  serverError.value = ''
  confirmedSpot.value = null
  confirmedDestination.value = ''
  step.value = 1
  submitState.value = 'idle'
}

// ---------------------------------------------------------------------------
// Inline SVG icons. Kept here rather than pulling in an icon library so the
// bundle stays small and every stroke matches the page.
// ---------------------------------------------------------------------------
const stroke = { stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }
const wrap = (paths) =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'h-5 w-5' }, paths.map((d) => h('path', { d, ...stroke })))

const ICONS = {
  calendar: () => wrap(['M3 9h18', 'M8 3v4', 'M16 3v4', 'M4 6h16v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Z']),
  clock: () => wrap(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2']),
  caret: () => wrap(['m7 10 5 5 5-5']),
  pin: () => wrap(['M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z']),
  bus: () => wrap(['M4 10h16', 'M5 6h14a1 1 0 0 1 1 1v11H4V7a1 1 0 0 1 1-1Z', 'M8 18v2', 'M16 18v2', 'M7.5 14.5h.01', 'M16.5 14.5h.01']),
  bed: () => wrap(['M4 19V6', 'M20 19v-6a3 3 0 0 0-3-3H4', 'M4 15h16', 'M8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z']),
  meal: () => wrap(['M6 3v6a3 3 0 0 0 6 0V3', 'M9 3v6', 'M15 3c0 0 3 1 3 5v13', 'M17 15h2']),
  guide: () => wrap(['M4 5h7a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5H4Z', 'M20 5h-7a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5H20Z']),
  ticket: () => wrap(['M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z', 'M13 6v10']),
  shield: () => wrap(['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z', 'm9 12 2 2 4-4']),
  users: () => wrap(['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M2.5 20a6.5 6.5 0 0 1 13 0', 'M16 4.5a3.5 3.5 0 0 1 0 7', 'M17.5 14a6.5 6.5 0 0 1 4 6']),
  seal: () => wrap(['M12 3l2.2 1.6 2.7-.3 1 2.5 2.4 1.2-.7 2.6.7 2.6-2.4 1.2-1 2.5-2.7-.3L12 18.4l-2.2-1.6-2.7.3-1-2.5L3.7 13.4l.7-2.6-.7-2.6 2.4-1.2 1-2.5 2.7.3Z', 'm9.5 11.5 1.8 1.8 3.4-3.4']),
  upload: () => wrap(['M12 16V4', 'm7.5 8.5 4.5-4.5 4.5 4.5', 'M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16']),
  file: () => wrap(['M14 3v5h5', 'M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z']),
}
const icon = (key) => ICONS[key] || ICONS.pin
</script>

<style scoped>
/* -------------------------------------------------------------------------
 * Typography — Inter for text, Plus Jakarta Sans for headings, and Cormorant
 * Garamond italic for the display lines.
 * ------------------------------------------------------------------------- */
.refresh-retreat {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', ui-sans-serif, sans-serif;
  background: #F8FAFC;
  color: #0A2540;
  letter-spacing: -0.01em;
}
.refresh-retreat h1,
.refresh-retreat h2,
.refresh-retreat h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, sans-serif;
  letter-spacing: -0.025em;
}
.refresh-retreat :deep(.font-serif),
.refresh-retreat .font-serif {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

/* -------------------------------------------------------------------------
 * Section primitives
 * ------------------------------------------------------------------------- */
.eyebrow {
  @apply inline-block rounded-full bg-[#EFF6FF] px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0071E3];
}
.section-title {
  @apply text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-5xl;
}
.badge-accent {
  @apply inline-flex items-center gap-2 rounded-full border border-[#0071E3]/30 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#0071E3] backdrop-blur;
}
.nav-link {
  @apply text-sm font-medium text-[#4A5568] transition hover:text-[#0071E3];
}

/* -------------------------------------------------------------------------
 * Buttons
 * ------------------------------------------------------------------------- */
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0071E3] to-[#0A84FF] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,113,227,0.55)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(0,113,227,0.6)] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60;
}
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-full border border-[#0A2540]/15 bg-white text-sm font-semibold text-[#0A2540] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0071E3]/40 hover:text-[#0071E3];
}
.btn-copy {
  @apply inline-flex items-center gap-1.5 rounded-full border border-[#0071E3]/25 bg-white px-3 py-1.5 text-xs font-semibold text-[#0071E3] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EFF6FF];
}
/* Secondary CTA sitting on the photographic hero, where the white-on-white
   .btn-secondary would disappear. */
.btn-hero-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20;
}
.btn-copy--done {
  @apply border-emerald-200 bg-emerald-50 text-emerald-600;
}

/* -------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */
/* Fallback behind the hero photograph. */
.hero-wash {
  background:
    radial-gradient(900px 600px at 15% 10%, rgba(0, 113, 227, 0.35), transparent 60%),
    radial-gradient(800px 600px at 85% 25%, rgba(16, 185, 129, 0.28), transparent 62%),
    linear-gradient(180deg, #0A2540 0%, #0b3b6d 60%, #0A2540 100%);
}
/* Darkens the photograph enough for white text to stay legible, with a blue
   and green cast so the hero reads as part of the theme rather than a stock
   image dropped behind the type. */
.hero-scrim {
  background:
    linear-gradient(180deg, rgba(10, 37, 64, 0.78) 0%, rgba(10, 37, 64, 0.55) 42%, rgba(10, 37, 64, 0.88) 100%),
    radial-gradient(ellipse at 50% 35%, rgba(0, 113, 227, 0.3), transparent 62%),
    radial-gradient(ellipse at 80% 85%, rgba(16, 185, 129, 0.22), transparent 60%);
}

/* -------------------------------------------------------------------------
 * Cards
 * ------------------------------------------------------------------------- */
.premium-card {
  @apply rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(10,37,64,0.04),0_24px_70px_-40px_rgba(10,37,64,0.3)];
}

/* Destination panels */
.destination-card {
  @apply overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(10,37,64,0.04),0_30px_70px_-45px_rgba(10,37,64,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_90px_-50px_rgba(10,37,64,0.45)];
}
.destination-plate {
  @apply relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-9 sm:p-11 lg:min-h-[26rem];
  background: var(--accent);
}
.destination-photo {
  @apply absolute inset-0 h-full w-full object-cover;
}
/* Keeps the white type legible over any photo, and ties the image back to the
   circuit's accent colour. */
.destination-scrim {
  @apply pointer-events-none absolute inset-0;
  background:
    linear-gradient(176deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.06) 38%, rgba(0, 0, 0, 0.68) 100%),
    linear-gradient(145deg, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 62%);
}
.destination-plate-top,
.destination-plate-bottom {
  @apply relative z-10;
}
.destination-index {
  @apply block font-serif text-5xl italic leading-none text-white/60;
}
.destination-credit {
  @apply absolute bottom-2.5 right-4 z-10 text-[0.6rem] font-medium tracking-wide text-white/55;
}

/* "And many more" */
.more-places {
  @apply mt-16 rounded-[2rem] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-8 py-12 text-center sm:px-12;
}
.more-pill {
  @apply rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-sm font-medium text-[#4A5568];
}
.more-pill--muted {
  @apply border-transparent bg-transparent font-serif italic text-[#64748B];
}
.destination-body {
  @apply p-9 sm:p-11;
}
.meta-pill {
  @apply inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#4A5568];
}
.meta-pill :deep(svg) {
  @apply h-3.5 w-3.5;
}
.meta-pill--date {
  @apply border-[#0071E3]/40 bg-[#EFF6FF] text-[#0369A1];
}

/* Inclusions */
.inclusion-card {
  @apply flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(10,37,64,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#0071E3]/35 hover:shadow-[0_20px_40px_-25px_rgba(0,113,227,0.45)];
}
.inclusion-icon {
  @apply grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EFF6FF] text-[#0071E3] ring-1 ring-[#0071E3]/15;
}
.detail-label {
  @apply text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B];
}
.detail-value {
  @apply mt-1 text-base font-semibold tracking-tight text-[#0A2540];
}

/* Steps */
.step-card {
  @apply rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition duration-300 hover:border-[#0A84FF]/35 hover:bg-white/[0.07];
}

/* Voices */
.voice-card {
  @apply flex h-full flex-col rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(10,37,64,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#0071E3]/30 hover:shadow-[0_28px_60px_-35px_rgba(0,113,227,0.45)];
}

/* Team */
.team-card {
  @apply flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-[0_1px_2px_rgba(10,37,64,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#0071E3]/30 hover:shadow-[0_22px_45px_-28px_rgba(0,113,227,0.4)];
}

/* FAQ */
.faq-item {
  @apply overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white;
}
.faq-summary {
  @apply flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-[#0A2540] transition hover:text-[#0071E3];
}
.faq-summary::-webkit-details-marker {
  display: none;
}
.faq-chevron {
  @apply shrink-0 text-[#0071E3] transition duration-200;
}
.faq-item[open] .faq-chevron {
  @apply rotate-180;
}

/* -------------------------------------------------------------------------
 * Form
 * ------------------------------------------------------------------------- */
.lbl {
  @apply block text-sm font-semibold text-[#0A2540];
}
.req {
  @apply text-[#0071E3];
}
.field {
  @apply mt-2 block w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0A2540] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10;
}
.field-error {
  @apply border-red-400 focus:border-red-400 focus:ring-red-200/60;
}
.field-msg {
  @apply mt-1.5 text-xs font-medium text-red-500;
}
.field-hint {
  @apply mt-1.5 text-xs text-[#64748B];
}
.fieldset-legend {
  @apply mb-1 w-full border-b border-[#E2E8F0] pb-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B];
}

/* -------------------------------------------------------------------------
 * Retreat detail section — dark band, shown only for the featured campus
 * ------------------------------------------------------------------------- */
.retreat-detail-wash {
  background:
    radial-gradient(900px 500px at 12% 8%, rgba(0, 113, 227, 0.28), transparent 62%),
    radial-gradient(800px 500px at 88% 92%, rgba(16, 185, 129, 0.22), transparent 60%);
}
.eyebrow-on-dark {
  @apply inline-block rounded-full border border-[#34D399]/30 bg-[#34D399]/10 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#34D399];
}
.detail-card {
  @apply flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#34D399]/30 hover:bg-white/[0.07];
}
.detail-icon {
  @apply grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0071E3]/15 text-[#7DD3FC] ring-1 ring-inset ring-white/10;
}
.detail-icon :deep(svg) {
  @apply h-4 w-4;
}
.detail-label {
  @apply text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50;
}
.detail-value {
  @apply mt-1 text-base font-semibold tracking-tight text-white;
}
.experience-card {
  @apply rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#34D399]/30 hover:bg-white/[0.07];
}
.experience-emoji {
  @apply inline-grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-inset ring-white/10;
}
.select-caret {
  @apply pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B];
}
.select-caret :deep(svg) {
  @apply h-4 w-4;
}
.step-dot {
  @apply grid h-8 w-8 place-items-center rounded-full border border-[#E2E8F0] bg-white text-xs font-semibold text-[#94A3B8] transition;
}
.step-dot--on {
  @apply border-transparent bg-gradient-to-r from-[#0071E3] to-[#0A84FF] text-white;
}
.allotment {
  @apply rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5;
  border-left: 3px solid var(--accent);
}
.allotment-icon {
  @apply grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#0071E3] ring-1 ring-[#0071E3]/15;
}
.upload-drop {
  @apply mt-2 flex min-h-[168px] cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-8 transition;
}
.upload-drop:hover {
  @apply border-[#0071E3]/50 bg-[#EFF6FF];
}
.upload-drop--active {
  @apply border-[#0071E3] bg-[#EFF6FF];
}
.upload-drop--filled {
  @apply border-solid border-[#E2E8F0] bg-white;
}
.checkbox-row {
  @apply flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3.5 ring-1 ring-inset ring-transparent transition hover:bg-[#F8FAFC];
}
.checkbox-input {
  @apply mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border-[#CBD5E1] text-[#0071E3] focus:ring-[#0071E3]/30;
}

/* -------------------------------------------------------------------------
 * Motion
 * ------------------------------------------------------------------------- */
.reveal-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.reveal-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.check-path {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: draw-check 0.55s cubic-bezier(0.4, 0.2, 0.2, 1) 120ms forwards;
}
@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .check-path {
    animation: none;
    stroke-dashoffset: 0;
  }
  .reveal-enter-active {
    transition: none;
  }
}
</style>
