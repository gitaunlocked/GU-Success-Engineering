<template>
  <div class="heritage">
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
      :class="scrolled ? 'bg-[#FBF7F0]/90 shadow-[0_1px_0_rgba(45,27,14,0.08)] backdrop-blur-xl' : 'bg-transparent'"
    >
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img :src="brand.logo" alt="" class="h-9 w-auto" />
          <span class="hidden text-sm font-semibold tracking-tight text-[#2D1B0E] sm:block">
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
      <div class="hero-wash absolute inset-0 -z-10"></div>
      <div class="absolute inset-0 -z-10 opacity-[0.07] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M20 0 L40 20 L20 40 L0 20 Z%22 fill=%22none%22 stroke=%22%23B8860B%22 stroke-width=%221%22/></svg>')]"></div>

      <div class="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <span class="badge-gold">{{ hero.badge }}</span>

        <h1 class="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight text-[#1B2A4A] sm:text-7xl">
          {{ hero.title }}
        </h1>
        <p class="mt-4 font-serif text-2xl italic text-[#B8860B] sm:text-3xl">{{ hero.subtitle }}</p>

        <div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>

        <p class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#5A4632]">{{ hero.tagline }}</p>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#7A6A56]">{{ hero.intro }}</p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button type="button" class="btn-primary px-8 py-3.5 text-base" @click="scrollToId('register')">
            {{ hero.primaryCta }}
          </button>
          <button type="button" class="btn-secondary px-7 py-3.5 text-base" @click="scrollToId('destinations')">
            {{ hero.secondaryCta }}
          </button>
        </div>

        <!-- Destination ticker -->
        <div class="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <template v-for="(d, i) in destinations" :key="d.id">
            <span class="text-sm font-medium tracking-wide text-[#5A4632]">{{ d.name }}</span>
            <span v-if="i < destinations.length - 1" class="text-[#B8860B]" aria-hidden="true">◆</span>
          </template>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         ELIGIBILITY
         ====================================================================== -->
    <section id="eligibility" class="relative mx-auto max-w-5xl px-6 pb-20">
      <div class="rounded-[2rem] border border-[#B8860B]/[0.25] bg-white p-8 shadow-[0_24px_70px_-40px_rgba(27,42,74,0.35)] sm:p-12">
        <div class="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div class="shrink-0">
            <span class="grid h-14 w-14 place-items-center rounded-2xl bg-[#FDF6E7] text-[#B8860B] ring-1 ring-[#B8860B]/20">
              <component :is="icon('seal')" />
            </span>
          </div>
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">
              {{ eligibility.title }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-[#5A4632]">{{ eligibility.body }}</p>
            <ul class="mt-6 grid gap-3 sm:grid-cols-2">
              <li v-for="p in eligibility.points" :key="p" class="flex items-start gap-2.5 text-sm text-[#5A4632]">
                <span class="mt-[0.3rem] text-[#B8860B]" aria-hidden="true">◆</span>
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         DESTINATIONS — one panel per circuit, each with its own departure
         ====================================================================== -->
    <section id="destinations" class="relative bg-[#F6EFE3] py-24 sm:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center">
          <p class="eyebrow">The Circuits</p>
          <h2 class="section-title mt-3">Six places that still teach</h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A4632]">
            Each circuit departs separately and travels as one group. Your campus decides which one you join —
            you will see yours the moment you pick your college in the form below.
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
              <!-- Plate -->
              <div class="destination-plate lg:[direction:ltr]">
                <span class="destination-index">{{ String(i + 1).padStart(2, '0') }}</span>
                <h3 class="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{{ d.name }}</h3>
                <p class="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-white/70">{{ d.state }}</p>
                <p class="mt-6 font-serif text-xl italic text-white/90">{{ d.tagline }}</p>
                <span v-if="d.unesco" class="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.15] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/25">
                  UNESCO World Heritage
                </span>
              </div>

              <!-- Detail -->
              <div class="destination-body lg:[direction:ltr]">
                <div class="flex flex-wrap items-center gap-2.5">
                  <span class="meta-pill"><component :is="icon('calendar')" /> Departs {{ d.departs }}</span>
                  <span class="meta-pill"><component :is="icon('clock')" /> {{ d.duration }}</span>
                </div>

                <p class="mt-6 text-base leading-relaxed text-[#5A4632]">{{ d.blurb }}</p>

                <ul class="mt-6 space-y-2.5">
                  <li v-for="h in d.highlights" :key="h" class="flex items-start gap-2.5 text-sm text-[#5A4632]">
                    <span class="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full" :style="{ background: d.accent }" aria-hidden="true"></span>
                    <span>{{ h }}</span>
                  </li>
                </ul>

                <p class="mt-7 border-l-2 pl-4 font-serif text-base italic text-[#1B2A4A]" :style="{ borderColor: d.accent }">
                  {{ d.lens }}
                </p>
              </div>
            </div>
          </article>
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
    <section id="how" class="relative bg-[#1B2A4A] py-24 sm:py-28">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center">
          <p class="inline-block rounded-full bg-white/[0.08] px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#D4A017]">
            How It Works
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Four steps to your seat</h2>
        </div>
        <ol class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="s in steps" :key="s.n" class="step-card">
            <span class="font-serif text-4xl italic text-[#D4A017]">{{ s.n }}</span>
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
        <div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4A017] shadow-[0_20px_40px_-15px_rgba(184,134,11,0.6)]">
          <svg class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path class="check-path" d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 class="mt-8 text-3xl font-semibold tracking-tight text-[#1B2A4A] sm:text-4xl">Thank you — we have your registration</h2>
        <p class="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#5A4632]">
          Your details and payment proof have reached us. Our team verifies every payment by hand and will write to
          you once your seat is confirmed.
        </p>
        <div v-if="confirmedDestination" class="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-[#B8860B]/25 bg-[#FDF6E7] px-8 py-5">
          <span class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449]">Your circuit</span>
          <span class="mt-1.5 text-2xl font-semibold tracking-tight text-[#1B2A4A]">{{ confirmedDestination }}</span>
          <span v-if="confirmedSpot" class="mt-1 font-serif text-base italic text-[#5A4632]">
            {{ confirmedSpot.tagline }}
          </span>
          <span v-if="confirmedSpot" class="mt-2 text-xs text-[#8A7449]">
            Departs {{ confirmedSpot.departs }} · {{ confirmedSpot.duration }}
          </span>
        </div>
        <p class="mx-auto mt-8 max-w-lg text-sm text-[#7A6A56]">
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
        <h2 class="mt-6 text-2xl font-semibold tracking-tight text-[#1B2A4A] sm:text-3xl">Already registered</h2>
        <p class="mx-auto mt-3 max-w-md text-base text-[#5A4632]">
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
          <p class="mt-4 text-sm text-[#7A6A56]">Two short steps. Takes about a minute.</p>
        </div>

        <!-- Step rail -->
        <div class="mx-auto mt-10 flex max-w-sm items-center gap-3">
          <template v-for="s in 2" :key="s">
            <div class="flex items-center gap-2.5">
              <span class="step-dot" :class="step >= s ? 'step-dot--on' : ''">{{ s }}</span>
              <span class="text-xs font-semibold uppercase tracking-[0.16em]" :class="step >= s ? 'text-[#1B2A4A]' : 'text-[#A89880]'">
                {{ s === 1 ? 'Your details' : 'Payment' }}
              </span>
            </div>
            <span v-if="s === 1" class="h-px flex-1 bg-[#E4D8C4]"></span>
          </template>
        </div>

        <form class="premium-card mt-10 p-8 sm:p-10" novalidate @submit.prevent="onSubmit">
          <!-- ================= STEP 1 ================= -->
          <div v-show="step === 1" class="grid gap-6">
            <div>
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
              <label for="hw-college" class="lbl">College <span class="req">*</span></label>
              <div class="relative">
                <select
                  id="hw-college"
                  v-model="form.college"
                  class="field appearance-none pr-11"
                  :class="[errors.college && 'field-error', !form.college && 'text-[#A89880]']"
                >
                  <option value="" disabled>Select your college</option>
                  <option v-for="c in collegeOptions" :key="c" :value="c">{{ c }}</option>
                </select>
                <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7449]" aria-hidden="true">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <p v-if="errors.college" class="field-msg">{{ errors.college }}</p>
            </div>

            <!-- Allotted circuit, revealed as soon as a college is picked -->
            <Transition name="reveal">
              <div v-if="allottedSpot" class="allotment" :style="{ '--accent': allottedSpot.accent }">
                <div class="flex items-start gap-4">
                  <span class="allotment-icon"><component :is="icon('pin')" /></span>
                  <div>
                    <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449]">
                      Your heritage circuit
                    </p>
                    <p class="mt-1 text-2xl font-semibold tracking-tight text-[#1B2A4A]">
                      {{ allottedSpot.name }}<span class="text-[#8A7449]">, {{ allottedSpot.state }}</span>
                    </p>
                    <p class="mt-1.5 font-serif text-base italic text-[#5A4632]">{{ allottedSpot.tagline }}</p>
                    <p class="mt-3 text-xs text-[#7A6A56]">
                      Departs {{ allottedSpot.departs }} · {{ allottedSpot.duration }} · allotted by campus
                    </p>
                  </div>
                </div>
              </div>
            </Transition>

            <div class="mt-2 flex justify-end">
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
            <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#FBF7F0] px-5 py-4">
              <div class="text-sm text-[#5A4632]">
                <span class="font-semibold text-[#1B2A4A]">{{ form.fullName }}</span>
                <span class="mx-2 text-[#C9B892]">·</span>{{ form.college }}
                <template v-if="allottedSpot">
                  <span class="mx-2 text-[#C9B892]">·</span>
                  <span class="font-semibold" :style="{ color: allottedSpot.accent }">{{ allottedSpot.name }}</span>
                </template>
              </div>
              <button type="button" class="text-xs font-semibold text-[#B8860B] underline-offset-4 hover:underline" @click="step = 1">
                Edit
              </button>
            </div>

            <!-- Amount -->
            <div class="rounded-2xl border border-[#B8860B]/25 bg-[#FDF6E7] p-6 text-center">
              <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449]">Your contribution</p>
              <p class="mt-2 flex items-baseline justify-center gap-3">
                <span v-if="payment.fullCost" class="text-xl font-medium text-[#A89880] line-through">
                  {{ payment.currency }}{{ payment.fullCost.toLocaleString('en-IN') }}
                </span>
                <span class="text-4xl font-semibold tracking-tight text-[#1B2A4A]">
                  {{ payment.currency }}{{ payment.amount.toLocaleString('en-IN') }}
                </span>
              </p>
              <p v-if="payment.fullCost" class="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#B8860B]">
                {{ payment.currency }}{{ (payment.fullCost - payment.amount).toLocaleString('en-IN') }} covered by alumni sponsorship
              </p>
              <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5A4632]">{{ payment.note }}</p>
            </div>

            <!-- QR + UPI -->
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="flex flex-col items-center justify-center rounded-2xl border border-[#E4D8C4] bg-white p-6">
                <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449]">Scan to pay</p>
                <img
                  v-if="!qrBroken"
                  ref="qrImgEl"
                  :src="payment.qrImage"
                  alt="UPI QR code for the Heritage Walk contribution"
                  class="mt-4 h-44 w-44 rounded-xl object-contain ring-1 ring-black/5"
                  @error="qrBroken = true"
                />
                <div v-else class="mt-4 grid h-44 w-44 place-items-center rounded-xl border-2 border-dashed border-[#D8C7A8] bg-[#FBF7F0] px-4 text-center">
                  <span class="text-xs leading-relaxed text-[#8A7449]">
                    <template v-if="payment.upiId">QR code not uploaded yet.<br />Use the UPI ID alongside.</template>
                    <template v-else>QR code not uploaded yet.</template>
                  </span>
                </div>
              </div>

              <div class="flex flex-col justify-center rounded-2xl border border-[#E4D8C4] bg-white p-6">
                <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449]">Or pay by UPI ID</p>
                <template v-if="payment.upiId">
                  <p class="mt-3 break-all text-base font-semibold text-[#1B2A4A]">{{ payment.upiId }}</p>
                  <p v-if="payment.accountName" class="mt-1 text-sm text-[#7A6A56]">{{ payment.accountName }}</p>
                  <button type="button" class="btn-copy mt-4 self-start" :class="upiCopied && 'btn-copy--done'" @click="copyUpi">
                    {{ upiCopied ? 'Copied' : 'Copy UPI ID' }}
                  </button>
                </template>
                <p v-else-if="!qrBroken" class="mt-3 text-sm leading-relaxed text-[#8A7449]">
                  UPI details are being finalised. Please pay using the QR code alongside.
                </p>
                <p v-else class="mt-3 text-sm leading-relaxed text-[#8A7449]">
                  Payment details are being finalised. Please write to
                  <a :href="`mailto:${footer.email}`" class="font-semibold text-[#1B2A4A] underline">{{ footer.email }}</a>
                  and we will send them to you directly.
                </p>
                <p class="mt-5 text-xs leading-relaxed text-[#7A6A56]">
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
                  <span class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#B8860B] shadow-sm ring-1 ring-black/5" aria-hidden="true">
                    <component :is="icon('upload')" />
                  </span>
                  <p class="mt-4 text-sm font-semibold text-[#1B2A4A]">Click to upload, or drag your screenshot here</p>
                  <p class="mt-1 text-xs text-[#8A7449]">PNG, JPG or PDF · up to 4 MB</p>
                </div>

                <div v-else class="flex w-full items-center gap-4">
                  <img v-if="filePreview" :src="filePreview" alt="" class="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-black/5" />
                  <span v-else class="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-[#FBF7F0] text-[#B8860B] ring-1 ring-black/5">
                    <component :is="icon('file')" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-[#1B2A4A]">{{ file.name }}</p>
                    <p class="mt-0.5 text-xs text-[#8A7449]">{{ formatBytes(file.size) }}</p>
                  </div>
                  <button type="button" class="shrink-0 text-xs font-semibold text-[#B8860B] underline-offset-4 hover:underline" @click.stop="clearFile">
                    Replace
                  </button>
                </div>
              </div>
              <p v-if="errors.file" class="field-msg">{{ errors.file }}</p>
            </div>

            <!-- Consent -->
            <div>
              <div class="rounded-2xl border border-[#E4D8C4] bg-[#FBF7F0] p-5">
                <p class="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449]">Participation terms</p>
                <ul class="mt-3 space-y-2">
                  <li v-for="c in consent.points" :key="c" class="flex items-start gap-2.5 text-xs leading-relaxed text-[#5A4632]">
                    <span class="mt-[0.3rem] text-[#B8860B]" aria-hidden="true">◆</span>
                    <span>{{ c }}</span>
                  </li>
                </ul>
              </div>

              <label class="checkbox-row mt-3" :class="errors.consent && 'ring-red-300'">
                <input v-model="form.consentAccepted" type="checkbox" class="checkbox-input" />
                <span class="text-sm text-[#5A4632]">{{ consent.label }} <span class="req">*</span></span>
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
         VOICES
         ====================================================================== -->
    <section id="voices" class="relative bg-[#F6EFE3] py-24 sm:py-32">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center">
          <p class="eyebrow">In Appreciation</p>
          <h2 class="section-title mt-3">Voices on Gita Unlocked</h2>
        </div>
        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <figure v-for="t in testimonials" :key="t.name" class="voice-card">
            <span class="font-serif text-5xl leading-none text-[#B8860B]/40" aria-hidden="true">&ldquo;</span>
            <blockquote class="mt-2 flex-1 text-sm leading-relaxed text-[#5A4632]">{{ t.quote }}</blockquote>
            <figcaption class="mt-6 flex items-center gap-3.5 border-t border-[#E4D8C4] pt-5">
              <img v-if="t.photo" :src="t.photo" :alt="t.name" class="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-1 ring-black/5" />
              <span v-else class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1B2A4A] text-sm font-semibold text-[#D4A017]">
                {{ initials(t.name) }}
              </span>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-[#1B2A4A]">{{ t.name }}</p>
                <p class="truncate text-xs text-[#8A7449]">{{ t.role }}</p>
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
          <img v-if="m.photo" :src="m.photo" :alt="m.name" class="h-24 w-24 rounded-full object-cover object-top ring-2 ring-[#B8860B]/20" />
          <span v-else class="grid h-24 w-24 place-items-center rounded-full bg-[#1B2A4A] text-lg font-semibold text-[#D4A017]">
            {{ initials(m.name) }}
          </span>
          <p class="mt-4 text-sm font-semibold leading-snug text-[#1B2A4A]">{{ m.name }}</p>
          <p class="mt-1 text-xs text-[#8A7449]">{{ m.detail }}</p>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         FAQ
         ====================================================================== -->
    <section id="faq" class="relative bg-[#FBF7F0] py-24 sm:py-28">
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
            <p class="px-6 pb-5 text-sm leading-relaxed text-[#5A4632]">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         FOOTER
         ====================================================================== -->
    <footer class="bg-[#1B2A4A] py-14">
      <div class="mx-auto max-w-6xl px-6 text-center">
        <p class="font-serif text-2xl italic text-[#D4A017]">{{ footer.name }}</p>
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
  collegeOptions,
  spotForCollege,
  unmappedColleges,
  inclusions,
  steps,
  payment,
  consent,
  testimonials,
  team,
  faqs,
  seo,
  footer,
} from '~/data/heritageWalk'

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
    `[heritage-walk] no circuit mapped for: ${unmappedColleges.join(', ')}. ` +
      'Add them to collegeRegions in data/heritageWalk.js.',
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
const form = reactive({ fullName: '', mobile: '', college: '', consentAccepted: false })
const errors = reactive({})
// 'idle' | 'submitting' | 'success' | 'duplicate'
const submitState = ref('idle')
const serverError = ref('')
const confirmedSpot = ref(null)
const confirmedDestination = ref('')

// The destination follows from the college — the student never picks it.
const allottedSpot = computed(() => (form.college ? spotForCollege(form.college) : null))

// --- UPI copy ---
const qrBroken = ref(false)
const qrImgEl = ref(null)

// The browser starts loading the QR from the server-rendered HTML, so a 404 can
// fire before Vue hydrates and @error is never seen. Re-check once on mount.
onMounted(() => {
  const img = qrImgEl.value
  if (img?.complete && img.naturalWidth === 0) qrBroken.value = true
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
function validateStep1() {
  delete errors.fullName
  delete errors.mobile
  delete errors.college
  if (!form.fullName) errors.fullName = 'Please enter your full name.'
  if (form.mobile.replace(/\D/g, '').length < 10) errors.mobile = 'Enter a valid 10-digit mobile number.'
  if (!collegeOptions.includes(form.college)) errors.college = 'Please select your college.'
  return !errors.fullName && !errors.mobile && !errors.college
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
    fd.append('fullName', form.fullName)
    fd.append('mobile', form.mobile)
    fd.append('college', form.college)
    fd.append('consentAccepted', String(form.consentAccepted))
    fd.append('paymentScreenshot', file.value)

    const res = await $fetch('/api/heritage-walk-register', { method: 'POST', body: fd })

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
    console.error('heritage-walk register error:', err)
    serverError.value =
      err?.data?.statusMessage || 'Something went wrong while submitting. Please try again in a moment.'
    submitState.value = 'idle'
  }
}

function resetForm() {
  form.fullName = ''
  form.mobile = ''
  form.college = ''
  form.consentAccepted = false
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
  pin: () => wrap(['M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z']),
  bus: () => wrap(['M4 10h16', 'M5 6h14a1 1 0 0 1 1 1v11H4V7a1 1 0 0 1 1-1Z', 'M8 18v2', 'M16 18v2', 'M7.5 14.5h.01', 'M16.5 14.5h.01']),
  bed: () => wrap(['M4 19V6', 'M20 19v-6a3 3 0 0 0-3-3H4', 'M4 15h16', 'M8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z']),
  meal: () => wrap(['M6 3v6a3 3 0 0 0 6 0V3', 'M9 3v6', 'M15 3c0 0 3 1 3 5v13', 'M17 15h2']),
  guide: () => wrap(['M4 5h7a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5H4Z', 'M20 5h-7a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5H20Z']),
  ticket: () => wrap(['M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z', 'M13 6v10']),
  shield: () => wrap(['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z', 'm9 12 2 2 4-4']),
  seal: () => wrap(['M12 3l2.2 1.6 2.7-.3 1 2.5 2.4 1.2-.7 2.6.7 2.6-2.4 1.2-1 2.5-2.7-.3L12 18.4l-2.2-1.6-2.7.3-1-2.5L3.7 13.4l.7-2.6-.7-2.6 2.4-1.2 1-2.5 2.7.3Z', 'm9.5 11.5 1.8 1.8 3.4-3.4']),
  upload: () => wrap(['M12 16V4', 'm7.5 8.5 4.5-4.5 4.5 4.5', 'M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16']),
  file: () => wrap(['M14 3v5h5', 'M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z']),
}
const icon = (key) => ICONS[key] || ICONS.pin
</script>

<style scoped>
/* -------------------------------------------------------------------------
 * Typography — Inter for text, Plus Jakarta Sans for headings, and Cormorant
 * Garamond italic for the display lines that carry the heritage feel.
 * ------------------------------------------------------------------------- */
.heritage {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', ui-sans-serif, sans-serif;
  background: #fbf7f0;
  color: #2d1b0e;
  letter-spacing: -0.01em;
}
.heritage h1,
.heritage h2,
.heritage h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, sans-serif;
  letter-spacing: -0.025em;
}
.heritage :deep(.font-serif),
.heritage .font-serif {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

/* -------------------------------------------------------------------------
 * Section primitives
 * ------------------------------------------------------------------------- */
.eyebrow {
  @apply inline-block rounded-full bg-[#FDF6E7] px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#B8860B];
}
.section-title {
  @apply text-3xl font-semibold tracking-tight text-[#1B2A4A] sm:text-5xl;
}
.badge-gold {
  @apply inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-white/70 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#B8860B] backdrop-blur;
}
.nav-link {
  @apply text-sm font-medium text-[#5A4632] transition hover:text-[#B8860B];
}

/* -------------------------------------------------------------------------
 * Buttons
 * ------------------------------------------------------------------------- */
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4A017] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(184,134,11,0.55)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(184,134,11,0.6)] focus:outline-none focus:ring-4 focus:ring-[#B8860B]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60;
}
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/15 bg-white text-sm font-semibold text-[#1B2A4A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#B8860B]/40 hover:text-[#B8860B];
}
.btn-copy {
  @apply inline-flex items-center gap-1.5 rounded-full border border-[#B8860B]/25 bg-white px-3 py-1.5 text-xs font-semibold text-[#B8860B] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FDF6E7];
}
.btn-copy--done {
  @apply border-emerald-200 bg-emerald-50 text-emerald-600;
}

/* -------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */
.hero-wash {
  background:
    radial-gradient(900px 600px at 15% 10%, rgba(212, 160, 23, 0.18), transparent 60%),
    radial-gradient(800px 600px at 85% 25%, rgba(194, 65, 12, 0.12), transparent 62%),
    linear-gradient(180deg, #fdf9f2 0%, #fbf7f0 60%, #f6efe3 100%);
}

/* -------------------------------------------------------------------------
 * Cards
 * ------------------------------------------------------------------------- */
.premium-card {
  @apply rounded-3xl border border-[#E4D8C4] bg-white shadow-[0_1px_2px_rgba(45,27,14,0.04),0_24px_70px_-40px_rgba(27,42,74,0.3)];
}

/* Destination panels */
.destination-card {
  @apply overflow-hidden rounded-[2rem] border border-[#E4D8C4] bg-white shadow-[0_1px_2px_rgba(45,27,14,0.04),0_30px_70px_-45px_rgba(27,42,74,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_90px_-50px_rgba(27,42,74,0.45)];
}
.destination-plate {
  @apply relative flex flex-col justify-center p-9 sm:p-11;
  background:
    radial-gradient(500px 300px at 20% 15%, rgba(255, 255, 255, 0.14), transparent 60%),
    linear-gradient(145deg, var(--accent) 0%, #1b2a4a 135%);
}
.destination-index {
  @apply font-serif text-5xl italic leading-none text-white/50;
}
.destination-body {
  @apply p-9 sm:p-11;
}
.meta-pill {
  @apply inline-flex items-center gap-1.5 rounded-full border border-[#E4D8C4] bg-[#FBF7F0] px-3 py-1.5 text-xs font-semibold text-[#5A4632];
}
.meta-pill :deep(svg) {
  @apply h-3.5 w-3.5;
}

/* Inclusions */
.inclusion-card {
  @apply flex items-start gap-4 rounded-2xl border border-[#E4D8C4] bg-white p-5 shadow-[0_1px_2px_rgba(45,27,14,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#B8860B]/35 hover:shadow-[0_20px_40px_-25px_rgba(184,134,11,0.45)];
}
.inclusion-icon {
  @apply grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#FDF6E7] text-[#B8860B] ring-1 ring-[#B8860B]/15;
}
.detail-label {
  @apply text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8A7449];
}
.detail-value {
  @apply mt-1 text-base font-semibold tracking-tight text-[#1B2A4A];
}

/* Steps */
.step-card {
  @apply rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition duration-300 hover:border-[#D4A017]/35 hover:bg-white/[0.07];
}

/* Voices */
.voice-card {
  @apply flex h-full flex-col rounded-3xl border border-[#E4D8C4] bg-white p-7 shadow-[0_1px_2px_rgba(45,27,14,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#B8860B]/30 hover:shadow-[0_28px_60px_-35px_rgba(184,134,11,0.45)];
}

/* Team */
.team-card {
  @apply flex flex-col items-center rounded-2xl border border-[#E4D8C4] bg-white p-6 text-center shadow-[0_1px_2px_rgba(45,27,14,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#B8860B]/30 hover:shadow-[0_22px_45px_-28px_rgba(184,134,11,0.4)];
}

/* FAQ */
.faq-item {
  @apply overflow-hidden rounded-2xl border border-[#E4D8C4] bg-white;
}
.faq-summary {
  @apply flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-[#1B2A4A] transition hover:text-[#B8860B];
}
.faq-summary::-webkit-details-marker {
  display: none;
}
.faq-chevron {
  @apply shrink-0 text-[#B8860B] transition duration-200;
}
.faq-item[open] .faq-chevron {
  @apply rotate-180;
}

/* -------------------------------------------------------------------------
 * Form
 * ------------------------------------------------------------------------- */
.lbl {
  @apply block text-sm font-semibold text-[#1B2A4A];
}
.req {
  @apply text-[#B8860B];
}
.field {
  @apply mt-2 block w-full rounded-2xl border border-[#E4D8C4] bg-white px-4 py-3 text-base text-[#1B2A4A] outline-none transition placeholder:text-[#A89880] focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/10;
}
.field-error {
  @apply border-red-400 focus:border-red-400 focus:ring-red-200/60;
}
.field-msg {
  @apply mt-1.5 text-xs font-medium text-red-500;
}
.step-dot {
  @apply grid h-8 w-8 place-items-center rounded-full border border-[#E4D8C4] bg-white text-xs font-semibold text-[#A89880] transition;
}
.step-dot--on {
  @apply border-transparent bg-gradient-to-r from-[#B8860B] to-[#D4A017] text-white;
}
.allotment {
  @apply rounded-2xl border border-[#E4D8C4] bg-[#FBF7F0] p-5;
  border-left: 3px solid var(--accent);
}
.allotment-icon {
  @apply grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#B8860B] ring-1 ring-[#B8860B]/15;
}
.upload-drop {
  @apply mt-2 flex min-h-[168px] cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-[#D8C7A8] bg-[#FBF7F0] px-6 py-8 transition;
}
.upload-drop:hover {
  @apply border-[#B8860B]/50 bg-[#FDF6E7];
}
.upload-drop--active {
  @apply border-[#B8860B] bg-[#FDF6E7];
}
.upload-drop--filled {
  @apply border-solid border-[#E4D8C4] bg-white;
}
.checkbox-row {
  @apply flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E4D8C4] bg-white px-4 py-3.5 ring-1 ring-inset ring-transparent transition hover:bg-[#FBF7F0];
}
.checkbox-input {
  @apply mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border-[#D8C7A8] text-[#B8860B] focus:ring-[#B8860B]/30;
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
