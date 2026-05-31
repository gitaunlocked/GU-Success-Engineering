export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'],
  compatibilityDate: '2025-03-19',
  ssr: true,

  app: {
    head: {
      script: [
        { src: 'https://checkout.razorpay.com/v1/checkout.js', defer: true }
      ]
    }
  },

  runtimeConfig: {
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
    razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
    public: {
      razorpayKeyId: process.env.RAZORPAY_KEY_ID || ''
    }
  },
})