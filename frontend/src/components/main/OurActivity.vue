<template>
  <div class="our-activity-section">
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title">Rangkaian Kegiatan</h2>
      
      <!-- Feature Items -->
      <div class="row">
        <div class="col-md-6">

        </div>
        <div class="col-md-6 ">
          <div class="activity-item mb-4">
            <div class="activity-item-content">
              <h5>Pendaftaran Peserta</h5>
              <p>Pendaftaran peserta dapat dilakukan secara online, memudahkan panitia untuk mengelola data peserta.</p>
            </div>
          </div>
          <div class="activity-item mb-4">
            <div class="activity-item-content">
              <h5>Technical Meeting</h5>
              <p>Technical Meeting akan dilaksanakan pada tanggal?.</p>
            </div>
          </div>
        </div>
       
      </div>

      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="activity-item">
            <div class="activity-item-content">
              <h5>Pertandingan</h5>
              <p>Pertandingan berlangsung dari tanggal 21 sampai 23 Februari 2025.
                Pertandingan dilaksanakan di GOR Laga Satria, Pakansari</p>
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
