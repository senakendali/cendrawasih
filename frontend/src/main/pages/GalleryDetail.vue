<template>
    <div class="main-container">
      <div class="container">
        <h1>Gallery Detail - Item {{ id }}</h1>

        <img src="@/assets/images/main/banner/main-banner.png" alt="Gallery Image 1" class="img-fluid mb-3" />

        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium aperiam, voluptatem, delectus nisi veniam odit officia molestias voluptatibus libero beatae molestiae in odio velit sapiente facere ducimus, quod impedit dolor inventore? Perferendis nihil itaque quam molestias debitis ducimus. Illo sequi natus aliquid eligendi, libero earum maxime ea maiores ratione architecto?</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At unde dolorum laudantium, sequi, eligendi odit similique deleniti, sunt eveniet voluptas necessitatibus. Illum nihil corrupti possimus aspernatur! Commodi quidem cum, pariatur sequi fuga labore laudantium vero molestiae eaque totam expedita ratione quasi iure odit veniam nemo esse dicta neque reiciendis. Iusto.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At unde dolorum laudantium, sequi, eligendi odit similique deleniti, sunt eveniet voluptas necessitatibus. Illum nihil corrupti possimus aspernatur! Commodi quidem cum, pariatur sequi fuga labore laudantium vero molestiae eaque totam expedita ratione quasi iure odit veniam nemo esse dicta neque reiciendis. Iusto.</p>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'GalleryDetail',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the gallery detail page */
  .gallery-detail-container {
    color: white;
    background-color: black;
    min-height: 100vh;
    padding: 2rem 0;
  }
  </style>
  