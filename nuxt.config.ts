export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'],
  compatibilityDate: '2025-03-19',
  ssr: true,

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
        }
      ],
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