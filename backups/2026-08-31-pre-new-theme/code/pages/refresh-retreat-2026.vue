<template>
  <div class="refresh-retreat relative min-h-screen bg-white text-[#0A2540] antialiased">
    <!-- ======================================================================
         NAVIGATION — minimal, floating, transparent-over-hero then solid
         ====================================================================== -->
    <header
      :class="[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-black/5 bg-white/85 py-3 shadow-sm backdrop-blur-xl' : 'py-4',
      ]"
    >
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="/" class="flex items-center gap-3">
          <img :src="brand.logo" alt="Gita Unlocked" class="h-9 w-auto sm:h-10" />
        </a>
        <div class="flex items-center gap-3 text-sm">
          <span :class="['hidden font-medium sm:inline', scrolled ? 'text-[#0A2540]/70' : 'text-white/85']">
            {{ brand.presenter }}
          </span>
          <button
            type="button"
            class="btn-primary px-5 py-2 text-sm sm:text-[0.925rem]"
            @click="scrollToId('register')"
          >
            Register
          </button>
        </div>
      </nav>
    </header>

    <!-- ======================================================================
         HERO — full-bleed image with dark gradient overlay
         ====================================================================== -->
    <section id="hero" class="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
      <!-- Real photo if present, gradient fallback if not -->
      <img
        v-if="!heroImageBroken"
        :src="hero.image"
        alt="Guruvayur retreat"
        class="absolute inset-0 -z-10 h-full w-full object-cover"
        @error="heroImageBroken = true"
      />
      <div v-else class="absolute inset-0 -z-10 hero-fallback"></div>

      <!-- Dark gradient overlay -->
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A2540]/70 via-[#0A2540]/55 to-[#0A2540]/85"></div>
      <!-- Subtle radial accent -->
      <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(0,113,227,0.35),transparent_60%)]"></div>

      <div class="relative mx-auto max-w-4xl px-6 py-24 text-center text-white sm:py-28">
        <div v-motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-md">
            <span class="relative flex h-1.5 w-1.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80"></span>
              <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
            {{ hero.eyebrowBadge }}
          </span>
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 120 } }"
          class="mt-8 text-[3rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-7xl md:text-8xl"
        >
          {{ hero.title }}
        </h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 240 } }"
          class="mt-4 text-xl font-light tracking-tight text-white/85 sm:text-2xl"
        >
          {{ hero.subtitle }}
        </p>
        <p
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 360 } }"
          class="mx-auto mt-6 max-w-xl text-base text-white/75 sm:text-lg"
        >
          {{ hero.tagline }}
        </p>

        <!-- Presenter block -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 480 } }"
          class="mx-auto mt-10 inline-flex flex-col items-center gap-1 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-md"
        >
          <p class="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/60">Organised by</p>
          <p class="text-base font-semibold tracking-tight text-white">{{ brand.presenter }}</p>
          <p class="text-xs text-white/70">{{ brand.ecosystem }}</p>
        </div>

        <!-- Primary CTA -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 600 } }"
          class="mt-10 flex flex-col items-center gap-3"
        >
          <button type="button" class="btn-primary group px-8 py-4 text-base font-semibold sm:text-lg" @click="scrollToId('register')">
            {{ hero.primaryCta }}
            <svg class="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12m0 0-5-5m5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            class="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-white/70 transition hover:text-white"
            @click="scrollToId('details')"
          >
            Learn more
          </button>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
        <span class="scroll-mouse" aria-hidden="true"></span>
      </div>
    </section>

    <!-- ======================================================================
         RETREAT DETAILS
         ====================================================================== -->
    <section id="details" class="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div v-motion-fade-visible-once class="mx-auto max-w-2xl text-center">
        <p class="eyebrow">Overview</p>
        <h2 class="section-title mt-3">Retreat Details</h2>
        <p class="mt-4 text-base leading-relaxed text-[#4A5568]">
          Everything you need to know about the day — thoughtfully curated so you can just show up and be present.
        </p>
      </div>

      <div class="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="d in retreatDetails"
          :key="d.label"
          v-motion-fade-visible-once
          class="detail-card group"
        >
          <span class="detail-icon">
            <component :is="iconComponent(d.icon)" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="detail-label">{{ d.label }}</p>
            <p class="detail-value">{{ d.value }}</p>
          </div>
        </div>
      </div>

      <!-- Activities pill row -->
      <div class="mt-8 rounded-3xl border border-black/5 bg-gradient-to-br from-[#EFF6FF] to-white p-6 shadow-[0_1px_2px_rgba(10,37,64,0.04)] sm:p-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg text-[#0071E3] shadow-sm ring-1 ring-black/5" aria-hidden="true">🛕</span>
            <div>
              <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0071E3]">Activities</p>
              <p class="text-lg font-semibold tracking-tight text-[#0A2540]">A full day of experiences</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="a in activities"
              :key="a"
              class="rounded-full border border-[#0071E3]/15 bg-white px-3 py-1 text-xs font-medium text-[#0A2540] shadow-sm"
            >
              {{ a }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         WHAT YOU'LL EXPERIENCE
         ====================================================================== -->
    <section id="experience" class="relative bg-[#F8FAFC] py-24 sm:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div v-motion-fade-visible-once class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">The experience</p>
          <h2 class="section-title mt-3">What You'll Experience</h2>
          <p class="mt-4 text-base leading-relaxed text-[#4A5568]">
            Six moments — small enough to remember, big enough to change something.
          </p>
        </div>

        <div class="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="e in experiences"
            :key="e.title"
            v-motion-fade-visible-once
            class="experience-card group"
          >
            <span class="experience-emoji" aria-hidden="true">{{ e.emoji }}</span>
            <h3 class="mt-6 text-lg font-semibold tracking-tight text-[#0A2540]">{{ e.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-[#4A5568]">{{ e.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         REGISTRATION FEE
         ====================================================================== -->
    <section id="fee" class="relative mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <div v-motion-fade-visible-once class="text-center">
        <p class="eyebrow">Transparent pricing</p>
        <h2 class="section-title mt-3">Registration Fee</h2>
        <p class="mt-3 text-sm text-[#4A5568]">Actual trip expenses</p>
      </div>

      <!-- Pricing table -->
      <div v-motion-fade-visible-once class="mt-12 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(10,37,64,0.05),0_10px_40px_-20px_rgba(10,37,64,0.15)]">
        <ul class="divide-y divide-[#EEF2F7]">
          <li v-for="line in pricing.breakdown" :key="line.label" class="flex items-center justify-between px-6 py-5 sm:px-8">
            <span class="text-sm font-medium text-[#4A5568] sm:text-base">{{ line.label }}</span>
            <span class="text-base font-semibold tabular-nums text-[#0A2540] sm:text-lg">
              {{ pricing.currency }}{{ line.amount.toLocaleString('en-IN') }}
            </span>
          </li>
          <li class="flex items-center justify-between bg-[#F8FAFC] px-6 py-5 sm:px-8">
            <span class="text-sm font-semibold uppercase tracking-wider text-[#0A2540] sm:text-base">Actual Cost</span>
            <span class="text-lg font-bold tabular-nums text-[#0A2540] sm:text-xl">
              {{ pricing.currency }}{{ pricing.actualCost.toLocaleString('en-IN') }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Alumni-sponsored hero card -->
      <div
        v-motion-fade-visible-once
        class="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#059669] via-[#10B981] to-[#34D399] p-8 text-white shadow-[0_20px_50px_-15px_rgba(16,185,129,0.55)] sm:p-12"
      >
        <div class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div class="relative">
          <span class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur">
            <span aria-hidden="true">🎉</span> Alumni Sponsored
          </span>

          <div class="mt-8 grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div>
              <p class="text-xs font-medium uppercase tracking-[0.22em] text-white/70">Actual Cost</p>
              <p class="mt-1 text-4xl font-semibold tracking-tight text-white/60 line-through decoration-white/50 sm:text-5xl">
                {{ pricing.currency }}{{ pricing.actualCost.toLocaleString('en-IN') }}
              </p>
            </div>

            <div class="hidden text-white/70 sm:block" aria-hidden="true">
              <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16m0 0-6-6m6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-[0.22em] text-white/85">Your Contribution</p>
              <p class="mt-1 flex items-baseline gap-2 text-6xl font-bold tracking-tight sm:text-7xl">
                {{ pricing.currency }}{{ pricing.studentContribution }}
                <span class="text-sm font-semibold uppercase tracking-[0.22em] text-white/85">only</span>
              </p>
            </div>
          </div>

          <p class="mt-8 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {{ pricing.sponsorNote }}
          </p>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         PAYMENT
         ====================================================================== -->
    <section id="payment" class="relative bg-[#F8FAFC] py-24 sm:py-32">
      <div class="mx-auto max-w-5xl px-6">
        <div v-motion-fade-visible-once class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">Payment</p>
          <h2 class="section-title mt-3">Complete Your Payment</h2>
          <p class="mt-4 text-base text-[#4A5568]">
            Pay ₹{{ pricing.studentContribution }} using any UPI app, then upload the screenshot below to confirm your seat.
          </p>
        </div>

        <div class="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2">
          <!-- QR card -->
          <div v-motion-fade-visible-once class="premium-card flex flex-col items-center p-8 sm:p-10">
            <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0071E3]">Scan to pay</p>
            <div class="mt-6 rounded-2xl border border-black/5 bg-white p-4 shadow-inner">
              <img
                v-if="!qrImageBroken"
                :src="payment.qrImage"
                alt="UPI QR code"
                class="h-56 w-56 object-contain sm:h-64 sm:w-64"
                @error="qrImageBroken = true"
              />
              <div v-else class="grid h-56 w-56 place-items-center rounded-xl bg-gradient-to-br from-[#EFF6FF] to-white text-center sm:h-64 sm:w-64">
                <div class="px-6">
                  <span class="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl text-[#0071E3] shadow-sm ring-1 ring-black/5" aria-hidden="true">📱</span>
                  <p class="mt-4 text-xs font-medium text-[#4A5568]">
                    Add <code class="rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-[#0A2540] ring-1 ring-black/5">public/refresh-retreat/upi-qr.png</code> to display the QR code here.
                  </p>
                </div>
              </div>
            </div>
            <p class="mt-6 text-sm font-medium text-[#4A5568]">Scan using any UPI app</p>
          </div>

          <!-- UPI details card -->
          <div v-motion-fade-visible-once class="premium-card flex flex-col p-8 sm:p-10">
            <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#0071E3]">Or use UPI details</p>

            <dl class="mt-6 space-y-5">
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-[#64748B]">UPI ID</dt>
                <dd class="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#F8FAFC] px-4 py-3">
                  <span class="font-mono text-base font-semibold tracking-tight text-[#0A2540] sm:text-lg">{{ payment.upiId }}</span>
                  <button
                    type="button"
                    class="btn-copy"
                    :class="{ 'btn-copy--done': upiCopied }"
                    @click="copyUpi"
                  >
                    <svg v-if="!upiCopied" class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="M13 4H6a2 2 0 0 0-2 2v9M8 8h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg v-else class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ upiCopied ? 'Copied' : 'Copy UPI' }}
                  </button>
                </dd>
              </div>

              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-[#64748B]">Account Name</dt>
                <dd class="mt-2 rounded-2xl border border-black/5 bg-[#F8FAFC] px-4 py-3 text-base font-semibold text-[#0A2540]">
                  {{ payment.accountName }}
                </dd>
              </div>

              <div v-if="payment.bank">
                <dt class="text-xs font-medium uppercase tracking-wider text-[#64748B]">Bank</dt>
                <dd class="mt-2 rounded-2xl border border-black/5 bg-[#F8FAFC] px-4 py-3 text-base font-semibold text-[#0A2540]">
                  {{ payment.bank }}
                </dd>
              </div>
            </dl>

            <div class="mt-auto pt-6 text-xs text-[#64748B]">
              Once you've paid, upload the screenshot in the registration form below.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         REGISTRATION FORM
         ====================================================================== -->
    <section id="register" class="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <!-- Success screen -->
      <div v-if="submitState === 'success'" v-motion-fade-visible-once class="premium-card p-10 text-center sm:p-14">
        <div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#059669] to-[#34D399] shadow-[0_20px_40px_-15px_rgba(16,185,129,0.55)]">
          <svg class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path class="check-path" d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 class="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">🎉 Registration Submitted!</h2>
        <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#4A5568]">
          Thank you for registering for Refresh Retreat.
        </p>
        <p class="mx-auto mt-2 max-w-lg text-base leading-relaxed text-[#4A5568]">
          We have received your registration details and payment proof. Our team will verify your submission and contact you soon with further updates.
        </p>
        <p class="mx-auto mt-6 max-w-lg text-lg font-medium text-[#0A2540]">
          Stay excited! See you in Guruvayur.
        </p>
        <div class="mt-10">
          <NuxtLink to="/" class="btn-primary px-8 py-3.5 text-base">Back to Home</NuxtLink>
        </div>
      </div>

      <!-- Duplicate screen -->
      <div v-else-if="submitState === 'duplicate'" v-motion-fade-visible-once class="premium-card p-10 text-center sm:p-12">
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-3xl text-amber-600">!</div>
        <h2 class="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Already registered</h2>
        <p class="mx-auto mt-3 max-w-md text-base text-[#4A5568]">
          A registration with this mobile number is already on record. Our team will reach out with next steps.
        </p>
        <button type="button" class="btn-secondary mt-8" @click="resetForm">Use a different mobile number</button>
      </div>

      <!-- Form -->
      <template v-else>
        <div v-motion-fade-visible-once class="text-center">
          <p class="eyebrow">Registration</p>
          <h2 class="section-title mt-3">Register for Refresh Retreat</h2>
          <p class="mt-3 text-sm text-[#4A5568]">Fill in your details — takes under a minute.</p>
        </div>

        <form
          v-motion-fade-visible-once
          class="premium-card mt-12 p-8 sm:p-10"
          novalidate
          @submit.prevent="submit"
        >
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label class="lbl">Full Name <span class="req">*</span></label>
              <input
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
              <label class="lbl">Institute <span class="req">*</span></label>
              <div class="relative">
                <select
                  v-model="form.institute"
                  class="field appearance-none pr-11"
                  :class="[errors.institute && 'field-error', !form.institute && 'text-[#94A3B8]']"
                >
                  <option value="" disabled>Select institute</option>
                  <option v-for="i in institutes" :key="i" :value="i">{{ i }}</option>
                </select>
                <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]" aria-hidden="true">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none"><path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
              </div>
              <p v-if="errors.institute" class="field-msg">{{ errors.institute }}</p>
            </div>

            <div>
              <label class="lbl">Mobile Number <span class="req">*</span></label>
              <input
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

            <div class="sm:col-span-2">
              <label class="lbl">Email Address <span class="text-[#94A3B8]">(optional)</span></label>
              <input
                v-model.trim="form.email"
                type="email"
                class="field"
                :class="errors.email && 'field-error'"
                placeholder="you@example.com"
                autocomplete="email"
              />
              <p v-if="errors.email" class="field-msg">{{ errors.email }}</p>
            </div>

            <!-- Payment screenshot upload -->
            <div class="sm:col-span-2">
              <label class="lbl">Payment Screenshot <span class="req">*</span></label>
              <div
                class="upload-drop"
                :class="{
                  'upload-drop--active': isDragging,
                  'upload-drop--filled': !!file,
                  'field-error': errors.file,
                }"
                @click="fileInputRef?.click()"
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
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <p class="mt-4 text-sm font-semibold text-[#0A2540]">
                    Drag &amp; drop your payment screenshot here
                  </p>
                  <p class="mt-1 text-xs text-[#64748B]">
                    or <span class="font-semibold text-[#0071E3]">click to browse</span>
                  </p>
                  <p class="mt-3 text-[11px] uppercase tracking-wider text-[#94A3B8]">PNG · JPG · PDF · Max 4 MB</p>
                </div>

                <div v-else class="flex items-center gap-4 text-left">
                  <div class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#EFF6FF] text-2xl">
                    <img v-if="filePreview" :src="filePreview" alt="Preview" class="h-full w-full object-cover" />
                    <span v-else aria-hidden="true">📄</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-[#0A2540]">{{ file.name }}</p>
                    <p class="text-xs text-[#64748B]">{{ formatBytes(file.size) }} · {{ file.type || 'file' }}</p>
                  </div>
                  <button type="button" class="text-xs font-semibold text-[#0071E3] transition hover:text-[#0A2540]" @click.stop="clearFile">
                    Replace
                  </button>
                </div>
              </div>
              <p v-if="errors.file" class="field-msg">{{ errors.file }}</p>
            </div>

            <!-- Checkboxes -->
            <div class="sm:col-span-2 space-y-3">
              <label class="checkbox-row" :class="errors.confirmedPayment && 'ring-red-400/40 bg-red-50/40'">
                <input v-model="form.confirmedPayment" type="checkbox" class="checkbox-input" />
                <span class="text-sm leading-relaxed text-[#334155]">
                  I have transferred ₹{{ pricing.studentContribution }} and confirm that the payment details are correct.
                </span>
              </label>
              <label class="checkbox-row" :class="errors.acknowledgedVerification && 'ring-red-400/40 bg-red-50/40'">
                <input v-model="form.acknowledgedVerification" type="checkbox" class="checkbox-input" />
                <span class="text-sm leading-relaxed text-[#334155]">
                  I understand that submitting this form does not guarantee confirmation until verified.
                </span>
              </label>
            </div>
          </div>

          <!-- Server error -->
          <p v-if="serverError" class="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {{ serverError }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            class="btn-primary mt-8 w-full justify-center py-4 text-base font-semibold"
            :disabled="submitState === 'submitting'"
          >
            <span v-if="submitState === 'submitting'" class="flex items-center gap-2">
              <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
              </svg>
              Submitting…
            </span>
            <span v-else class="flex items-center gap-2">
              Register Now
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>
          <p class="mt-4 text-center text-xs text-[#94A3B8]">
            Your details are stored securely and used only for this retreat.
          </p>
        </form>
      </template>
    </section>

    <!-- ======================================================================
         WHY REGISTER — trust bullets
         ====================================================================== -->
    <section id="why" class="relative bg-[#F8FAFC] py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="eyebrow">Why Register</p>
        <h2 class="section-title mt-3 text-2xl sm:text-3xl">Peace of mind, included</h2>
        <ul class="mt-10 flex flex-wrap items-center justify-center gap-3">
          <li v-for="t in trustBullets" :key="t" class="trust-pill">
            <span class="text-[#10B981]" aria-hidden="true">✓</span>
            {{ t }}
          </li>
        </ul>
      </div>
    </section>

    <!-- ======================================================================
         FOOTER
         ====================================================================== -->
    <footer class="border-t border-black/5 bg-white py-14">
      <div class="mx-auto max-w-6xl px-6 text-center">
        <img :src="brand.logo" alt="Gita Unlocked" class="mx-auto h-10 w-auto" />
        <p class="mt-4 text-base font-semibold tracking-tight text-[#0A2540]">{{ footer.presenter }}</p>
        <p class="mt-1 text-sm text-[#64748B]">{{ footer.ecosystem }}</p>
        <div class="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#0071E3]/40 to-transparent"></div>
        <p class="mt-6 text-sm font-semibold tracking-tight text-[#0A2540]">{{ footer.retreatName }}</p>
        <p class="mt-1 text-xs uppercase tracking-[0.22em] text-[#64748B]">{{ footer.retreatTagline }}</p>
        <p class="mt-8 text-xs text-[#94A3B8]">© {{ year }} Success Engineering · All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { h, reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  brand,
  hero,
  retreatDetails,
  activities,
  experiences,
  pricing,
  payment,
  institutes,
  trustBullets,
  footer,
  seo,
} from '~/data/refreshRetreat'

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
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap' },
  ],
})

const year = new Date().getFullYear()

// --- Nav shadow on scroll ---
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// --- Asset fallbacks (both are graceful — never break the layout) ---
const heroImageBroken = ref(false)
const qrImageBroken = ref(false)

// --- UPI copy ---
const upiCopied = ref(false)
async function copyUpi() {
  try {
    if (import.meta.client) {
      await navigator.clipboard.writeText(payment.upiId)
      upiCopied.value = true
      setTimeout(() => (upiCopied.value = false), 1800)
    }
  } catch {
    // Non-fatal — user can just read the UPI ID on screen.
  }
}

// --- Registration form state ---
const form = reactive({
  fullName: '',
  institute: '',
  mobile: '',
  email: '',
  confirmedPayment: false,
  acknowledgedVerification: false,
})
const errors = reactive({})
// 'idle' | 'submitting' | 'success' | 'duplicate'
const submitState = ref('idle')
const serverError = ref('')

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
    reader.onload = (e) => { filePreview.value = e.target?.result || '' }
    reader.readAsDataURL(f)
  }
}
function onFileChange(e) { acceptFile(e.target.files?.[0]) }
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.fullName) errors.fullName = 'Please enter your full name.'
  if (!institutes.includes(form.institute)) errors.institute = 'Please select your institute.'
  if (form.mobile.replace(/\D/g, '').length < 10) errors.mobile = 'Enter a valid 10-digit mobile number.'
  if (form.email && !EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address (or leave it blank).'
  if (!file.value) errors.file = 'Please upload your payment screenshot.'
  if (!form.confirmedPayment) errors.confirmedPayment = true
  if (!form.acknowledgedVerification) errors.acknowledgedVerification = true
  return Object.keys(errors).length === 0
}

async function submit() {
  serverError.value = ''
  if (!validate()) {
    // Scroll to the first error field for a nicer UX
    if (import.meta.client) {
      const firstErrorField = document.querySelector('.field-error, .upload-drop.field-error')
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  submitState.value = 'submitting'
  try {
    const fd = new FormData()
    fd.append('fullName', form.fullName)
    fd.append('institute', form.institute)
    fd.append('mobile', form.mobile)
    fd.append('email', form.email)
    fd.append('confirmedPayment', String(form.confirmedPayment))
    fd.append('acknowledgedVerification', String(form.acknowledgedVerification))
    fd.append('paymentScreenshot', file.value)

    const res = await $fetch('/api/refresh-retreat-register', {
      method: 'POST',
      body: fd,
    })

    if (res?.duplicate) {
      submitState.value = 'duplicate'
      return
    }
    submitState.value = 'success'
    // Small delay then scroll to the success card so the user sees it clearly
    if (import.meta.client) {
      setTimeout(() => scrollToId('register'), 100)
    }
  } catch (err) {
    console.error('refresh-retreat register error:', err)
    serverError.value =
      err?.data?.statusMessage ||
      'Something went wrong while submitting. Please try again in a moment.'
    submitState.value = 'idle'
  }
}

function resetForm() {
  Object.keys(form).forEach((k) => {
    form[k] = typeof form[k] === 'boolean' ? false : ''
  })
  Object.keys(errors).forEach((k) => delete errors[k])
  clearFile()
  serverError.value = ''
  submitState.value = 'idle'
}

// ---------------------------------------------------------------------------
// Inline SVG icons for the retreat detail cards. Keeping them here (instead of
// pulling in an icon library) keeps the bundle small and every stroke on-brand.
// ---------------------------------------------------------------------------
const iconStroke = { stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }
const wrap = (paths) =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', class: 'h-5 w-5' },
    paths.map((d) => h('path', { d, ...iconStroke })),
  )

const ICONS = {
  calendar: () => wrap(['M3 9h18', 'M8 3v4', 'M16 3v4', 'M4 6h16v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Z']),
  pin: () => wrap(['M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z']),
  clock: () => wrap(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2']),
  users: () => wrap(['M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1', 'M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7', 'M21 20v-1a4 4 0 0 0-3-3.87', 'M15 4.13A3.5 3.5 0 0 1 15 11']),
  bus: () => wrap(['M4 10h16', 'M5 6h14a1 1 0 0 1 1 1v11H4V7a1 1 0 0 1 1-1Z', 'M8 18v2', 'M16 18v2', 'M7.5 14.5h.01', 'M16.5 14.5h.01']),
  meal: () => wrap(['M6 3v6a3 3 0 0 0 6 0V3', 'M9 3v6', 'M15 3c0 0 3 1 3 5v13', 'M17 15h2']),
  bed: () => wrap(['M4 19V6', 'M20 19v-6a3 3 0 0 0-3-3H4', 'M4 15h16', 'M8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z']),
}
function iconComponent(key) {
  return ICONS[key] || ICONS.pin
}
</script>

<style scoped>
/* -------------------------------------------------------------------------
 * Typography — SF-Pro-ish stack with Plus Jakarta Sans for headings.
 * ------------------------------------------------------------------------- */
.refresh-retreat {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', ui-sans-serif, sans-serif;
  letter-spacing: -0.01em;
}
.refresh-retreat h1,
.refresh-retreat h2,
.refresh-retreat h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, sans-serif;
  letter-spacing: -0.025em;
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

/* -------------------------------------------------------------------------
 * Buttons — Apple-flavoured primary / calm secondary
 * ------------------------------------------------------------------------- */
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0071E3] to-[#0A84FF] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,113,227,0.5)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(0,113,227,0.55)] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60;
}
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-semibold text-[#0A2540] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0071E3]/30 hover:text-[#0071E3];
}
.btn-copy {
  @apply inline-flex items-center gap-1.5 rounded-full border border-[#0071E3]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#0071E3] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0071E3]/5;
}
.btn-copy--done {
  @apply border-emerald-200 bg-emerald-50 text-emerald-600;
}

/* -------------------------------------------------------------------------
 * Cards
 * ------------------------------------------------------------------------- */
.premium-card {
  @apply rounded-3xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(10,37,64,0.04),0_20px_60px_-30px_rgba(10,37,64,0.22)];
}

/* Retreat detail cards */
.detail-card {
  @apply flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(10,37,64,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#0071E3]/25 hover:shadow-[0_20px_40px_-20px_rgba(0,113,227,0.35)];
}
.detail-icon {
  @apply grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EFF6FF] text-[#0071E3] ring-1 ring-[#0071E3]/10;
}
.detail-label {
  @apply text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#64748B];
}
.detail-value {
  @apply mt-1 text-base font-semibold tracking-tight text-[#0A2540];
}

/* Experience cards */
.experience-card {
  @apply rounded-3xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(10,37,64,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#0071E3]/25 hover:shadow-[0_28px_60px_-25px_rgba(0,113,227,0.35)];
}
.experience-emoji {
  @apply inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-white text-2xl shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:scale-110;
}

/* Trust pills */
.trust-pill {
  @apply inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-[#0A2540] shadow-sm;
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
  @apply mt-2 block w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0A2540] placeholder:text-[#94A3B8] outline-none transition focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10;
}
.field-error {
  @apply border-red-400 focus:border-red-400 focus:ring-red-200/60;
}
.field-msg {
  @apply mt-1.5 text-xs font-medium text-red-500;
}

/* Upload drop zone */
.upload-drop {
  @apply mt-2 flex min-h-[168px] cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-8 transition;
}
.upload-drop:hover {
  @apply border-[#0071E3]/40 bg-[#EFF6FF]/60;
}
.upload-drop--active {
  @apply border-[#0071E3] bg-[#EFF6FF];
}
.upload-drop--filled {
  @apply border-solid border-[#CBD5E1] bg-white;
}

/* Checkbox rows */
.checkbox-row {
  @apply flex cursor-pointer items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 ring-1 ring-inset ring-transparent transition hover:bg-[#F8FAFC];
}
.checkbox-input {
  @apply mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border-[#CBD5E1] text-[#0071E3] focus:ring-[#0071E3]/30;
}

/* -------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */
.hero-fallback {
  background:
    radial-gradient(1200px 800px at 20% 20%, rgba(0, 113, 227, 0.45), transparent 60%),
    radial-gradient(900px 700px at 80% 60%, rgba(16, 185, 129, 0.35), transparent 65%),
    linear-gradient(135deg, #0a2540 0%, #0b3b6d 40%, #0a2540 100%);
}

/* Animated scroll-hint mouse */
.scroll-mouse {
  display: inline-block;
  width: 22px;
  height: 36px;
  border: 1.5px solid currentColor;
  border-radius: 12px;
  position: relative;
}
.scroll-mouse::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 6px;
  width: 3px;
  height: 8px;
  border-radius: 2px;
  background: currentColor;
  transform: translateX(-50%);
  animation: scroll-hint 1.6s ease-in-out infinite;
}
@keyframes scroll-hint {
  0% { transform: translate(-50%, 0); opacity: 0.9; }
  60% { transform: translate(-50%, 12px); opacity: 0; }
  100% { transform: translate(-50%, 0); opacity: 0; }
}

/* Draw-in check on success */
.check-path {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: draw-check 0.55s cubic-bezier(0.4, 0.2, 0.2, 1) 120ms forwards;
}
@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-mouse::before,
  .check-path {
    animation: none;
  }
  .check-path { stroke-dashoffset: 0; }
}
</style>
