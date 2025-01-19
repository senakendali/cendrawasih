<template>
    <div class="tournament-info">
      <div class="container">
        <div class="row">
          <h2 class="section-title">Informasi Kegiatan</h2>  
          <div class="col-md-3 mb-4">
            <div class="tournament-info-item">
              
              <div class="tournament-info-item-content">
                <h5>Lokasi</h5>
                <p v-html="tournament.location"> 
                </p>
                
              </div>
            </div>
          </div>
  
          <!-- Gallery Item 2 -->
          <div class="col-md-3 mb-4">
            <div class="tournament-info-item">
              
              <div class="tournament-info-item-content">
                <h5>Tanggal Pertandingan</h5>
                <p>{{ tournament.event_date }}</p>
                
              </div>
            </div>
          </div>
  
          <!-- Gallery Item 3 -->
          <div class="col-md-3 mb-4">
            <div class="tournament-info-item">
              
              <div class="tournament-info-item-content">
                <h5>Kategori</h5>
                <ul>
                  <li v-for="(matchCategory, index) in tournament.matchCategories" :key="index">
                    {{ matchCategory.name }}
                  </li>
                  
                </ul>
                
              </div>
            </div>
          </div>

          <!-- Gallery Item 4 -->
          <div class="col-md-3 mb-4">
            <div class="tournament-info-item">
              
              <div class="tournament-info-item-content">
                <h5>Usia</h5>
                <ul>
                  <li v-for="(ageCategory, index) in tournament.ageCategories" :key="index">
                    {{ ageCategory.name }}
                  </li>
                </ul>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'TournamentInfo',
    props: {
      tournament: {
        type: Object,
        required: true,
      },
    },
  };
  </script>

<style scoped>
.tournament-info{
    background-color: #000000;
}
.section-title {
    text-align: start;
    font-size: 2rem;
    font-family: 'Urbanist', sans-serif;
    margin-bottom: 30px;
    color: #ffffff;
}

.sub-section-title {
    text-align: center;
    font-size: 1.5rem;
    font-family: 'Urbanist', sans-serif;
    margin-bottom: 30px;
    color: #ffffff;
}


.tournament-info-item {
  position: relative;
  background-color: #18181B;
  overflow: hidden;
  min-height: 160px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 2px solid #D32F2F;
}

.tournament-info-item img {
  width: 100%;
  height: auto;
}

.tournament-info-item-content {
  padding: 15px;
  background-color: #18181B; 
  color: white;
}

.tournament-info-item-content h5 {
  font-family: Urbanist, sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.tournament-info-item-content p {
  font-family: Urbanist, sans-serif;
  font-size: 14px;
  margin-bottom: 20px;
}

.tournament-info-item-content ul {
  list-style-type: square;
  padding: 0;
  margin-left: 30px;
  font-family: Urbanist, sans-serif;
  font-size: 14px;
}

.tournament-info-item-content .more-info {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #D32F2F;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.tournament-info-item-content .more-info:hover {
  background-color: #FF5722; /* Darker red on hover */
}

@media (max-width: 768px) {
  .tournament-info-item img {
    height: 100%;
  }

  .section-title {
    text-align: center;
  }
}
</style>