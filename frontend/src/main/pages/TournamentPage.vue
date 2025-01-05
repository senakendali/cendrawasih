<template>
    <div class="main-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1>Kejuaraan</h1>
                    <p>Pendaftaran Kejuaraan Pencak Silat [Nama Kejuaraan] Telah Dibuka! Jangan Lewatkan Kesempatan untuk Bertanding dengan Atlet-Atlet Berbakat Lainnya. Dapatkan Hadiah Menarik dan Sertifikat Peserta!</p>
                </div>
            </div>
            
        </div>
        <TournamentGallery />
      
    </div>
</template>
  
  <script>
  import TournamentGallery from '@/components/TournamentGallery.vue';

  export default {
    name: 'TournamentPage',
    components: {
        TournamentGallery,
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  