<template>
  <div class="min-h-screen bg-gray-50 pt-20 flex flex-col items-center justify-center px-4">
    <!-- Success Icon -->
    <div class="mb-8">
      <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </div>

    <!-- Success Message -->
    <div class="text-center max-w-2xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold text-green-600 mb-4">
        Registration Successful!
      </h1>
      
      <p class="text-xl text-gray-700 mb-8">
        Congratulations! You have successfully enrolled in the <strong>{{ enrollmentData.courseTitle || 'selected course' }}</strong> course.
      </p>

      <!-- Course Details -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
        <h2 class="text-2xl font-bold text-[#D61C75] mb-4">Course Details</h2>
        <div class="space-y-2 text-gray-700">
          <p><strong>Course:</strong> {{ enrollmentData.courseTitle || 'N/A' }}</p>
          <p><strong>Duration:</strong> {{ enrollmentData.courseDuration || 'N/A' }}</p>
          <p><strong>Level:</strong> {{ enrollmentData.courseLevel || 'N/A' }}</p>
          <p><strong>Certificate:</strong> Digital Certificate upon completion</p>
          <p><strong>Amount Paid:</strong> ₹{{ enrollmentData.totalRupees ?? enrollmentData.total }}</p>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-bold text-blue-800 mb-3">What's Next?</h3>
        <ul class="text-left text-gray-700 space-y-2">
          <li>📱 Our team will contact you via WhatsApp with course details</li>
          <li>📅 Course schedule and meeting links will be shared</li>
        </ul>
      </div>

      <!-- Contact Information -->
      <div class="bg-gray-100 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-3">Need Help?</h3>
        <p class="text-gray-700 mb-2">If you have any questions, feel free to reach out:</p>
        <div class="space-y-1 text-gray-600">
          <p>📧 Email: gitaunlocked@gmail.com</p>
          <p>📱 WhatsApp: +91 81256 30802</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/" class="bg-[#D61C75] hover:bg-[#7A00FF] text-white font-bold py-3 px-8 rounded-lg transition">
          Back to Home
        </NuxtLink>
        <NuxtLink to="/courses" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition">
          View Course Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props to receive enrollment data
const props = defineProps({
  enrollmentData: {
    type: Object,
    required: true
  }
});
</script>
