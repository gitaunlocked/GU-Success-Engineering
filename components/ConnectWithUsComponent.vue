<template>
  <section class="bg-gray-100 py-10 px-4 sm:px-8 lg:px-12 rounded-lg shadow-md ">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
      <!-- Left: Form -->
      <div class="w-full">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-6"
        >
          CONNECT WITH US
        </h2>

        <form
          @submit.prevent="submitForm"
          class="bg-white rounded-lg shadow p-4 sm:p-6"
        >
          <!-- Name -->
          <div class="mb-4">
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="NAME"
              class="w-full rounded border py-2 px-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <!-- WhatsApp -->
          <div class="mb-4">
            <input
              v-model="form.whatsapp"
              type="text"
              required
              placeholder="WHATSAPP NUMBER"
              class="w-full rounded border py-2 px-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <!-- Query -->
          <div class="mb-4">
            <textarea
              v-model="form.query"
              rows="4"
              required
              placeholder="QUERY"
              class="w-full rounded border py-2 px-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <!-- Submit -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 sm:px-8 rounded-lg shadow transition duration-200"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      <!-- Right: Contact Info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Email -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Email</h3>
          </div>
          <p class="text-gray-600 text-sm">Our friendly team is here to help.</p>
          <p class="text-pink-600 text-sm">gitaunlocked@gmail.com</p>
        </div>

        <!-- Live Chat -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Live chat</h3>
          </div>
          <p class="text-gray-600 text-sm">You can chat in WhatsApp at</p>
          <p class="text-pink-600 text-sm">+91 81256 30802</p>
        </div>

        <!-- Office -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0l-2-2m2 2l7-7 7 7"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Office</h3>
          </div>
          <p class="text-gray-600 text-sm">Come say hello at our HQ.</p>
          <p class="text-gray-700 text-sm">Doddanekundi, Bengaluru</p>
        </div>

        <!-- Phone -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1c-1.666 0-3.168-.98-4.54-2.6A11.062 11.062 0 015.46 6.6A11.042 11.042 0 003 9.21v-1a2 2 0 012-2z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Phone</h3>
          </div>
          <p class="text-gray-600 text-sm">Mon-Fri from 10am to 5pm.</p>
          <p class="text-pink-600 text-sm">+91 81256 30802</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import db from "../src/firebase/init";
import { collection, addDoc } from "firebase/firestore";
import { reactive } from "vue";

const form = reactive({
  name: "",
  whatsapp: "",
  query: "",
});

async function submitForm() {
  try {
    await addDoc(collection(db, "connectRequests"), { ...form });
    alert("✅ Your request has been submitted!");
    form.name = "";
    form.whatsapp = "";
    form.query = "";
  } catch (err) {
    console.error("Firestore error:", err);
    alert("❌ Failed to submit");
  }
}
</script>
