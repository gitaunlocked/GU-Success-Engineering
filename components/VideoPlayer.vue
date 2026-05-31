<template>
    <div>
      <h2>Custom YouTube Video Player</h2>
  
      <video v-if="videoStreamUrl" controls autoplay width="640" height="360">
        <source :src="videoStreamUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const videoId = "1DIyFTcevQo"; // Replace with your YouTube video ID
  const videoStreamUrl = ref("");
  
  const fetchVideoStream = async () => {
    try {
      const response = await fetch(`https://pipedapi.kavin.rocks/streams/${videoId}`);
      const data = await response.json();
  
      // Get the highest quality video link
      videoStreamUrl.value = data.videoStreams?.find(v => v.quality === "1080p")?.url || data.videoStreams[0]?.url;
    } catch (error) {
      console.error("Error fetching video stream:", error);
    }
  };
  
  // Fetch the video stream when the component is mounted
  onMounted(fetchVideoStream);
  </script>
  
  <style>
  video {
    width: 100%;
    max-width: 640px;
    border-radius: 10px;
  }
  </style>
 