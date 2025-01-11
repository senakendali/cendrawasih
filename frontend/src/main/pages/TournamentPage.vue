<template>
    <div class="main-container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1>Kejuaraan</h1>
                    <p>Kami mengundang para pesilat berbakat untuk bergabung dalam ajang yang penuh semangat dan prestisius ini. Tunjukkan keahlian Anda dalam seni bela diri tradisional Indonesia dan buktikan bahwa Anda layak menjadi yang terbaik.</p>
                </div>
            </div>
            
        </div>
        <TournamentGallery />
      
    </div>
</template>
  
  <script>
  import TournamentGallery from '@/components/main/TournamentGallery.vue';

  export default {
    name: 'TournamentPage',
    components: {
        TournamentGallery,
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  