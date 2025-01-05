<template>
    <div class="progress" style="height: 25px;">
      <div
        class="progress-bar"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProgressBar",
    props: {
      progress: {
        type: Number,
        default: 0,
      },
    },
  };
  </script>
  
  <style scoped>
  .progress-bar {
    transition: width 0.3s ease;
  }
  </style>
  