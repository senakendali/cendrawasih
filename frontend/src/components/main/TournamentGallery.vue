<template>
    <div class="main-container">
      <div class="container">
        <div class="row">
          <!-- Gallery Item 1 -->
          <div class="col-md-4 mb-4">
            <div class="gallery-item">
              <img src="@/assets/images/main/banner/main-banner.png" alt="Gallery Image 1" class="img-fluid" />
              <div class="gallery-item-content">
                <h5>Tournament 1</h5>
                <p>This is the description for Gallery Item 1</p>
                <router-link class="btn more-info" :to="{ name: 'GalleryDetail', params: { id: 1 } }">Learn More</router-link>
              </div>
            </div>
          </div>
  
          <!-- Gallery Item 2 -->
          <div class="col-md-4 mb-4">
            <div class="gallery-item">
              <img src="@/assets/images/main/banner/main-banner.png" alt="Gallery Image 2" class="img-fluid" />
              <div class="gallery-item-content">
                <h5>Tournament 2</h5>
                <p>This is the description for Gallery Item 2</p>
                <router-link class="btn more-info" :to="{ name: 'GalleryDetail', params: { id: 2 } }">Learn More</router-link>
              </div>
            </div>
          </div>
  
          <!-- Gallery Item 3 -->
          <div class="col-md-4 mb-4">
            <div class="gallery-item">
              <img src="@/assets/images/main/banner/main-banner.png" alt="Gallery Image 3" class="img-fluid" />
              <div class="gallery-item-content">
                <h5>Tournament 3</h5>
                <p>This is the description for Gallery Item 3</p>
                <router-link class="btn more-info" :to="{ name: 'GalleryDetail', params: { id: 3 } }">Learn More</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'TournamentGallery',
  };
  </script>

<style scoped>
/* Gallery Styles */
.gallery-container {
  background-color: #000000; /* Light background for the gallery */
}

.gallery-item {
  position: relative;
  background-color: #18181B;
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: auto;
}

.gallery-item-content {
  padding: 15px;
  background-color: #18181B; 
  color: white;
}

.gallery-item-content h5 {
  font-family: Urbanist, sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.gallery-item-content p {
  font-family: Urbanist, sans-serif;
  font-size: 14px;
  margin-bottom: 20px;
}

.gallery-item-content .more-info {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #D32F2F;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.gallery-item-content .more-info:hover {
  background-color: #FF5722; /* Darker red on hover */
}

@media (max-width: 768px) {
  .gallery-item img {
    height: 100%;
  }
}
</style>