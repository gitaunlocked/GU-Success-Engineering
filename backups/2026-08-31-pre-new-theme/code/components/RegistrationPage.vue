<template>
  <!-- Show confirmation page if registration is successful -->
  <RegistrationConfirmation 
    v-if="showConfirmation" 
    :enrollment-data="enrollmentData" 
  />
  
  <!-- Show registration form otherwise -->
  <div v-else class="min-h-screen bg-gray-50 pt-20 flex flex-col">
    <!-- Top Banner -->
    <div
      class="flex flex-col md:flex-row items-stretch items-center justify-center bg-white px-0 overflow-hidden relative"
    >
      <!-- Left Image -->
      <div class="relative w-full md:w-1/3 h-[250px] md:h-[400px]">
        <img
          src="/KrsnaArjun.jpg"
          alt="Left Image"
          class="w-full h-full object-cover [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]"
        />
      </div>

      <!-- Center Text -->
      <div
        class="absolute top-[-40px] md:top-[-80px] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-center bg-no-repeat bg-contain rotate-90"
        style="background-image: url('/background_left.png');"
      ></div>
      <div class="relative mx-4 md:mx-8">
        <div class="text-center py-10 md:py-20 relative">
          <h1
            class="text-3xl md:text-5xl font-bold uppercase text-[#D61C75] [font-family:'Kaushan_Script',cursive]"
          >
            REGISTRATION
          </h1>
          <h2
            class="text-2xl md:text-4xl font-bold uppercase mt-2 underline decoration-[#D61C75] text-[#D61C75] [font-family:'Kaushan_Script',cursive]"
          >
            FORM
          </h2>
        </div>
      </div>

      <!-- Right Image -->
      <div class="relative w-full md:w-1/3 h-[250px] md:h-[400px]">
        <img
          src="/Dhrtarastra&Sanjay.jpg"
          alt="Right Image"
          class="w-full h-full object-cover [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col md:flex-row flex-1 items-center justify-center p-4 md:p-10 gap-8">
      <!-- Left Half -->
      <div
        class="w-full md:w-1/2 flex flex-col items-center text-center justify-center px-2 md:px-10 py-6 md:py-10"
      >
        <h2 class="text-2xl md:text-3xl font-bold mb-4 text-[#D61C75]">
          START YOUR GITA JOURNEY NOW!
        </h2>
        <p class="text-gray-600 mb-6 text-sm md:text-base">
          Check below a small glimpse of your exciting journey with Gita Unlocked
        </p>
        <div>
          <img
            src="/KrsnaArjun.jpg"
            alt="promo"
            class="w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-xl shadow-md"
          />
        </div>
      </div>

      <!-- Right Half (Form) -->
      <div class="w-full md:w-1/2 bg-white p-4 md:p-8 rounded-xl shadow-md">
        <h3 class="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">
          Registration Form
        </h3>
        <form class="space-y-6" @submit.prevent="submitForm">
          <!-- Full Name -->
          <div class="flex flex-col text-left">
            <label class="mb-1 font-medium text-[#D61C75]">
              Full Name <span class="text-red-500">(required)</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Phone Number -->
          <div class="flex flex-col text-left">
            <label class="mb-1 font-medium text-[#D61C75]">
              Phone Number <span class="text-red-500">(required)</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Email -->
          <div class="flex flex-col text-left">
            <label class="mb-1 font-medium text-[#D61C75]">
              Email ID <span class="text-red-500">(required)</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Course Selection -->
          <div class="flex flex-col text-left">
            <label class="mb-1 font-medium text-[#D61C75]">
              Select Course <span class="text-red-500">(required)</span>
            </label>
            <select
              v-model="selectedCourseSlug"
              class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option
                v-for="courseOption in courses"
                :key="courseOption.slug"
                :value="courseOption.slug"
              >
                {{ courseOption.title }}
              </option>
            </select>
          </div>

          <!-- Coupon Code -->
          <div class="flex flex-col text-left">
            <label class="mb-1 font-medium text-[#D61C75]">
              Coupon Code <span class="text-gray-500">(optional)</span>
            </label>
            <div class="flex gap-2">
              <input
                v-model="couponInput"
                type="text"
                @input="handleCouponInput"
                class="w-full border p-3 rounded-lg uppercase focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                @click="applyCoupon"
                class="px-4 py-2 rounded-lg bg-[#D61C75] text-white font-semibold hover:bg-[#7A00FF] transition"
              >
                Apply
              </button>
            </div>
            <div v-if="couponStatus.message" class="mt-2 text-sm" :class="couponStatus.success ? 'text-green-600' : 'text-red-500'">
              {{ couponStatus.message }}
            </div>
            <button
              v-if="appliedCoupon"
              type="button"
              @click="removeCoupon"
              class="mt-2 text-sm text-[#7A00FF] underline text-left"
            >
              Remove coupon
            </button>
          </div>

          <!-- Fees Section -->
          <div class="flex flex-col text-left text-base md:text-lg font-semibold space-y-2">
            <div class="flex justify-between">
              <span>Registration Fee:</span>
              <span :class="(appliedCoupon || discount > 0) ? 'line-through text-gray-400' : ''">Rs. {{ baseFee }}/-</span>
            </div>
            <div v-if="appliedCoupon" class="flex justify-between text-green-600">
              <span>Coupon ({{ appliedCoupon }}):</span>
              <span>-Rs. {{ baseFee - couponFinalPrice }}/-</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-green-600">
              <span>Discount Applied:</span>
              <span>-Rs. {{ discount }}/-</span>
            </div>
            <hr v-if="appliedCoupon || discount > 0" class="my-2 border-gray-300" />
            <div v-if="appliedCoupon || discount > 0" class="flex justify-between" :class="total === 0 ? 'text-green-600 font-bold' : ''">
              <span>Total:</span>
              <span>{{ total === 0 ? 'FREE!' : `Rs. ${total}/-` }}</span>
            </div>
            <div v-if="total === 0" class="text-sm text-green-600 font-normal">
              🎉 Congratulations! You're eligible for free enrollment!
            </div>
          </div>

          <!-- Payment Error Message -->
          <div v-if="paymentError" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
            {{ paymentError }}
            <button v-if="currentEnrollmentId" type="button" @click="retryPayment"
              class="mt-2 block text-[#D61C75] underline font-semibold">
              Retry Payment
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-orange-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Processing...' : (total === 0 ? 'Enroll for FREE!' : 'Pay & Enroll Now!') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import db from "../src/firebase/init";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { reactive, computed, ref, watch } from "vue";
import RegistrationConfirmation from "./RegistrationConfirmation.vue";
import { useCourses } from '~/composables/useCourses';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { courses, getCourseBySlug, coursesLoaded } = useCourses();

const form = reactive({
  name: "",
  phone: "",
  email: "",
  referral: "",
});

const showConfirmation = ref(false);
const isSubmitting = ref(false);
const enrollmentData = ref({});
const paymentError = ref("");
const currentEnrollmentId = ref(null);
const couponInput = ref("");
const appliedCoupon = ref("");
const couponFinalPrice = ref(null);
const couponStatus = reactive({
  success: false,
  message: ""
});

const referralDiscounts = {
  IITP25_GU: 500,
  IITBH25_GU: 500,
  RGIPT25_GU: 500
};

// Coupon discount type stored for backend validation
const couponDiscountType = ref(null);

const selectedCourseSlug = ref('');

// Initialize selected course once courses are loaded
watch(() => coursesLoaded.value, (loaded) => {
  if (loaded && courses.value.length > 0 && !selectedCourseSlug.value) {
    const firstCourseSlug = courses.value[0]?.slug || '';
    const initialSlug = typeof route.query.course === 'string' ? route.query.course : firstCourseSlug;
    selectedCourseSlug.value = getCourseBySlug(initialSlug) ? initialSlug : firstCourseSlug;
  }
}, { immediate: true });

const selectedCourse = computed(() => getCourseBySlug(selectedCourseSlug.value) || courses.value[0]);

// Clear applied coupon when user switches course (coupon may not apply to new course)
watch(selectedCourseSlug, () => {
  if (appliedCoupon.value) {
    appliedCoupon.value = "";
    couponFinalPrice.value = null;
    couponDiscountType.value = null;
    couponStatus.success = false;
    couponStatus.message = "Coupon removed — please re-apply for the new course.";
  }
});

const baseFee = computed(() => {
  if (selectedCourse.value?.feeAmount) {
    return selectedCourse.value.feeAmount;
  }

  return 500;
});

function handleCouponInput(event) {
  couponInput.value = event.target.value.toUpperCase();

  if (appliedCoupon.value && couponInput.value.trim() !== appliedCoupon.value) {
    appliedCoupon.value = "";
    couponFinalPrice.value = null;
    couponDiscountType.value = null;
    couponStatus.success = false;
    couponStatus.message = "Coupon removed.";
  }
}

async function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase();

  if (!code) {
    couponStatus.success = false;
    couponStatus.message = "Please enter a coupon code.";
    return;
  }

  // Validate from Firestore
  try {
    const couponDoc = await getDoc(doc(db, 'coupons', code));

    if (!couponDoc.exists()) {
      couponStatus.success = false;
      couponStatus.message = "Invalid coupon code.";
      return;
    }

    const couponData = couponDoc.data();

    // Check if coupon applies to the selected course
    if (couponData.allCourses === false) {
      const allowedCourses = couponData.courseIds || [];
      if (!allowedCourses.includes(selectedCourseSlug.value)) {
        couponStatus.success = false;
        couponStatus.message = "This coupon is not valid for the selected course.";
        return;
      }
    }

    let finalPrice = 0;

    if (couponData.discountType === 'fixed') {
      finalPrice = Math.max(baseFee.value - couponData.discountValue, 0);
    } else if (couponData.discountType === 'percentage') {
      const discountAmount = Math.round(baseFee.value * couponData.discountValue / 100);
      finalPrice = Math.max(baseFee.value - discountAmount, 0);
    } else if (couponData.discountType === 'final_price') {
      finalPrice = couponData.discountValue;
    }

    appliedCoupon.value = code;
    couponFinalPrice.value = finalPrice;
    couponDiscountType.value = couponData.discountType;
    couponStatus.success = true;
    couponStatus.message = `Coupon ${code} applied successfully!`;
  } catch (e) {
    console.error('Coupon validation error:', e);
    couponStatus.success = false;
    couponStatus.message = "Error validating coupon. Please try again.";
  }
}

function removeCoupon() {
  appliedCoupon.value = "";
  couponFinalPrice.value = null;
  couponDiscountType.value = null;
  couponInput.value = "";
  couponStatus.success = true;
  couponStatus.message = "Coupon removed.";
}

const discount = computed(() => {
  if (appliedCoupon.value) {
    return 0;
  }

  return referralDiscounts[form.referral.toUpperCase()] || 0;
});

const total = computed(() => {
  if (appliedCoupon.value && couponFinalPrice.value !== null) {
    return couponFinalPrice.value;
  }

  const calculatedTotal = baseFee.value - discount.value;
  return calculatedTotal > 0 ? calculatedTotal : 0;
});

async function submitForm() {
  isSubmitting.value = true;
  paymentError.value = "";
  
  try {
    // Final backend-safe pricing snapshot
    const normalizedCoupon = couponInput.value.trim().toUpperCase();
    let backendCouponFinalPrice = null;
    let backendAppliedCoupon = null;

    // Re-validate coupon from Firestore on submit
    if (normalizedCoupon) {
      try {
        const couponDoc = await getDoc(doc(db, 'coupons', normalizedCoupon));
        if (couponDoc.exists()) {
          const couponData = couponDoc.data();
          // Verify coupon applies to this course
          let couponValid = true;
          if (couponData.allCourses === false) {
            const allowedCourses = couponData.courseIds || [];
            if (!allowedCourses.includes(selectedCourseSlug.value)) {
              couponValid = false;
            }
          }
          if (couponValid) {
            backendAppliedCoupon = normalizedCoupon;
            if (couponData.discountType === 'fixed') {
              backendCouponFinalPrice = Math.max(baseFee.value - couponData.discountValue, 0);
            } else if (couponData.discountType === 'percentage') {
              const discountAmount = Math.round(baseFee.value * couponData.discountValue / 100);
              backendCouponFinalPrice = Math.max(baseFee.value - discountAmount, 0);
            } else if (couponData.discountType === 'final_price') {
              backendCouponFinalPrice = couponData.discountValue;
            }
          }
        }
      } catch (e) {
        console.error('Coupon re-validation error:', e);
      }
    }

    const backendDiscount = backendAppliedCoupon ? 0 : (referralDiscounts[form.referral.toUpperCase()] || 0);
    const backendTotal = backendAppliedCoupon
      ? backendCouponFinalPrice
      : Math.max(baseFee.value - backendDiscount, 0);

    // Save enrollment data to Firebase
    const enrollmentRecord = {
      ...form,
      courseSlug: selectedCourse.value.slug,
      courseTitle: selectedCourse.value.title,
      courseDuration: selectedCourse.value.totalTime,
      courseLevel: selectedCourse.value.level,
      baseFeeRupees: baseFee.value,
      total: backendTotal,
      totalRupees: backendTotal,
      totalPaise: backendTotal * 100,
      currency: 'INR',
      discount: backendDiscount,
      discountRupees: backendDiscount,
      appliedCoupon: backendAppliedCoupon,
      couponFinalPrice: backendCouponFinalPrice,
      couponFinalPriceRupees: backendCouponFinalPrice,
      timestamp: new Date().toISOString(),
      status: backendTotal === 0 ? 'completed' : 'pending_payment'
    };
    
    const docRef = await addDoc(collection(db, "enrollments"), enrollmentRecord);
    currentEnrollmentId.value = docRef.id;
    
    // Store enrollment data for confirmation page
    enrollmentData.value = { ...enrollmentRecord, id: docRef.id };
    
    if (backendTotal === 0) {
      // Free enrollment - show confirmation page
      showConfirmation.value = true;
    } else {
      // Paid enrollment - create Razorpay order and open checkout
      await initiateRazorpayPayment(docRef.id, backendTotal, enrollmentRecord);
    }
  } catch (err) {
    console.error("Registration error:", err);
    paymentError.value = "❌ Failed to submit registration. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

let paymentPollInterval = null
let activeRzpInstance = null

function stopPaymentPolling() {
  if (paymentPollInterval) {
    clearInterval(paymentPollInterval)
    paymentPollInterval = null
  }
}

function startPaymentPolling(enrollmentId) {
  stopPaymentPolling()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || ''

  paymentPollInterval = setInterval(async () => {
    try {
      const result = await $fetch(`${apiBase}/api/check-enrollment-status?enrollmentId=${enrollmentId}`)
      if (result.status === 'completed') {
        stopPaymentPolling()
        if (activeRzpInstance) {
          try { activeRzpInstance.close() } catch (e) { /* modal may already be closed */ }
          activeRzpInstance = null
        }
        enrollmentData.value.status = 'completed'
        enrollmentData.value.razorpayPaymentId = result.razorpayPaymentId
        showConfirmation.value = true
        isSubmitting.value = false
      }
    } catch (e) {
      // Polling errors are non-fatal; the handler callback is the primary path
    }
  }, 3000)
}

async function initiateRazorpayPayment(enrollmentId, amountInRupees, enrollmentRecord) {
  try {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || ''
    const orderData = await $fetch(`${apiBase}/api/create-order`, {
      method: 'POST',
      body: { enrollmentId }
    });

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: 'Gita Unlocked',
      description: `Enrollment: ${enrollmentRecord.courseTitle}`,
      image: '/favicon.ico',
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone
      },
      notes: {
        enrollmentId,
        courseSlug: enrollmentRecord.courseSlug
      },
      theme: {
        color: '#EA580C'
      },
      handler: async function (response) {
        stopPaymentPolling()
        activeRzpInstance = null
        await verifyPayment(response, enrollmentId);
      },
      modal: {
        ondismiss: async function () {
          stopPaymentPolling()
          activeRzpInstance = null
          try {
            const result = await $fetch(`${apiBase}/api/check-enrollment-status?enrollmentId=${enrollmentId}`)
            if (result.status === 'completed') {
              enrollmentData.value.status = 'completed'
              enrollmentData.value.razorpayPaymentId = result.razorpayPaymentId
              showConfirmation.value = true
              isSubmitting.value = false
              return
            }
          } catch (e) {
            // Check failed, show cancellation message
          }
          paymentError.value = "Payment was cancelled. Your registration is saved — you can retry payment.";
          isSubmitting.value = false;
        },
        escape: true,
        confirm_close: true
      }
    };

    if (typeof window.Razorpay === 'undefined') {
      paymentError.value = "Payment system is loading. Please try again in a moment.";
      return;
    }

    const rzp = new window.Razorpay(options);
    activeRzpInstance = rzp

    rzp.on('payment.failed', function (response) {
      stopPaymentPolling()
      activeRzpInstance = null
      console.error('Payment failed:', response.error);
      paymentError.value = `Payment failed: ${response.error.description || 'Please try again.'}`;
      isSubmitting.value = false;
    });

    rzp.open();
    startPaymentPolling(enrollmentId)
  } catch (err) {
    console.error('Razorpay checkout error:', err);
    paymentError.value = "❌ Could not initiate payment. Please try again.";
  }
}

async function verifyPayment(response, enrollmentId) {
  try {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || ''
    const result = await $fetch(`${apiBase}/api/verify-payment`, {
      method: 'POST',
      body: {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        enrollmentId
      }
    });

    if (result.success) {
      // Payment verified — update local data and show confirmation
      enrollmentData.value.status = 'completed';
      enrollmentData.value.razorpayPaymentId = response.razorpay_payment_id;
      showConfirmation.value = true;

      // Reset form
      form.name = "";
      form.phone = "";
      form.email = "";
      form.referral = "";
      couponInput.value = "";
      appliedCoupon.value = "";
      couponFinalPrice.value = null;
      couponStatus.success = false;
      couponStatus.message = "";
    } else {
      paymentError.value = "Payment verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id;
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    paymentError.value = "Payment was received but verification failed. Don't worry — our team will confirm your enrollment. Payment ID: " + response.razorpay_payment_id;
  }
}

async function retryPayment() {
  if (!currentEnrollmentId.value || !enrollmentData.value) return;
  isSubmitting.value = true;
  paymentError.value = "";
  try {
    await initiateRazorpayPayment(
      currentEnrollmentId.value,
      enrollmentData.value.total,
      enrollmentData.value
    );
  } catch (err) {
    console.error('Retry payment error:', err);
    paymentError.value = "❌ Could not retry payment. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>