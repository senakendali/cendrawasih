<template>
  <div class="our-activity-section">
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title">Rangkaian Kegiatan</h2>
      
      <!-- Feature Items -->
      <div class="row">
        
        <div class="col-md-6 ">
          <div v-for="(activity, index) in activities" :key="index" class="activity-item mb-4">
            <div class="activity-item-content">
              <h5>{{ activity.name }}</h5>
              <p>{{ activity.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurActivity',
  props: {
      activities: {
        type: Object,
        required: true,
      },
    },
};
</script>

<style scoped>
.our-activity-section {
  padding: 50px 0;
  background-color: #101010;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-family: 'Urbanist', sans-serif;
  margin-bottom: 30px;
  color: #ffffff;
}

.text-center {
  text-align: center;
  font-size: 1rem;
  color: #bbb;
  margin-bottom: 40px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.activity-item {
  position: relative;
  background-color: #18181B;
  overflow: hidden;
  min-height: 160px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 2px solid #388E3C; /* Green border matching with black */
}

.activity-item-content {
  padding: 20px;
  background-color: #18181B;
  color: white;
}

.activity-item-content h5 {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.6rem;
  margin-bottom: 10px;
  color: #fff;
}

.activity-item-content p {
  font-family: 'Urbanist', sans-serif;
  font-size: 1rem;
  color: #ccc;
}

@media (max-width: 768px) {
  .activity-item-content h5 {
    font-size: 1.4rem;
  }

  .activity-item-content p {
    font-size: 0.9rem;
  }
}
</style>
