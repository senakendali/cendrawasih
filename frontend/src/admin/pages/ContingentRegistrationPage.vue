<template>
  <div class="dashboard-container">
    <div
      v-if="loading"
      class="progress-bar"
      :style="{ width: progress + '%' }"
    ></div>
    <div class="mb-2 page-title">
      <i class="bi bi-file-earmark-text"></i> Pendaftaran
    </div>
    <div class="mb-2">
      <p>Anda akan mendaftarkan kontingen Anda kedalam kejuaraan ini. Silahkan pilih kontingen yang akan Anda daftarkan lalu klik tombol Daftar.</p>
    </div>

    <div class="row g-4">
      <div class="col-lg-6">
        <img v-if="!loading" :src="tournamentImage" class="img-fluid" alt="Tournament Image" />
      </div>

      <div v-if="!loading" class="col-lg-6">
        <h2 class="tournament-name">{{ tournamentName }}</h2>
        <p>{{ tournamentDescription }}</p>
        <div class="mt-3">
          <ul class="nav nav-pills mb-3 d-flex gap-2" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-location-tab" data-bs-toggle="pill" data-bs-target="#pills-location" type="button" role="tab" aria-controls="pills-location" aria-selected="true"><i class="bi bi-geo-alt-fill"></i> Lokasi</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-date-tab" data-bs-toggle="pill" data-bs-target="#pills-date" type="button" role="tab" aria-controls="pills-date" aria-selected="false"><i class="bi bi-calendar-date"></i> Tanggal Pertandingan</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-categories-tab" data-bs-toggle="pill" data-bs-target="#pills-categories" type="button" role="tab" aria-controls="pills-categories" aria-selected="false"><i class="bi bi-card-checklist"></i> Kategori</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-ages-tab" data-bs-toggle="pill" data-bs-target="#pills-ages" type="button" role="tab" aria-controls="pills-ages" aria-selected="false"><i class="bi bi-bookmark-star"></i> Usia</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-location" role="tabpanel" aria-labelledby="pills-location-tab" tabindex="0">
              <p v-html="tournamentLocation"> </p>
            </div>
            <div class="tab-pane fade" id="pills-date" role="tabpanel" aria-labelledby="pills-date-tab" tabindex="0">
              <p>Pertandingan berlangsung dari tanggal: {{ tournamentDate }}</p>
            </div>
            <div class="tab-pane fade" id="pills-categories" role="tabpanel" aria-labelledby="pills-categories-tab" tabindex="0">
                <ul>
                  <li v-for="(matchCategory, index) in matchCategories" :key="index">
                    {{ matchCategory.name }}
                  </li>
                  
                </ul>
            </div>
            <div class="tab-pane fade" id="pills-ages" role="tabpanel" aria-labelledby="pills-ages-tab" tabindex="0">
                <ul>
                  <li v-for="(ageCategory, index) in ageCategories" :key="index">
                    {{ ageCategory.name }}
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <h2 class="tournament-name">Pendaftaran Kontingen</h2>
        <p>Silahkan checklist kontingen yang akan Anda daftarkan</p>
        <form @submit.prevent="submitForm">
          <!-- Check if contingents exist and have data -->
          <div v-if="contingents && contingents.length > 0">
            <!-- Loop through each contingent -->
            <div 
              v-for="(contingent, index) in contingents" 
              :key="index" 
              class="input-group mt-3"
            >
              <div class="input-group-text">
                <input 
                  v-if="!contingent.is_registered"
                  class="form-check-input mt-0"
                  type="checkbox"
                  v-model="contingent.isSelected"
                  aria-label="Checkbox for following text input"
                >
                <i v-else class="bi bi-check-square-fill"></i>
              </div>
              <input 
                type="text" 
                class="form-control" 
                v-model="contingent.name" 
                disabled
              >
            </div>
          </div>

          <!-- No contingent data available -->
          <div v-else class="mt-3">
            <p class="alert alert-info">Anda Belum memiliki kontingen, silahkan daftarkan kontingen Anda terlebih dahulu.</p>
          </div>

          <!-- Submit button -->
          <div class="mt-3" v-if="contingents.length > 0">
            <button 
              type="submit" 
              class="button button-primary" 
              :disabled="loading"
            >
              <i class="bi bi-check-square-fill"></i>
              <span>Daftar</span>
            </button>
          </div>
          <div v-else class="mt-3">
            <router-link to="/admin/contingent/create" class="button button-primary">
              <i class="bi bi-plus-square"></i> Daftar Kontingen
            </router-link>
          </div>
        </form>



      </div>
     
    </div>

    

    
  </div>
</template>

<script>
import axios from 'axios';
import API from '@/config/api'; // Assuming you have an API config file
import { useToast } from 'vue-toastification';

export default {
  name: 'ContingentRegistrationPage',
  data() {
    return {
      tournamentName: '',
      tournamentImage:'',
      tournamentDescription: '',
      tournamentDate: '',
      tournamentLocation: '',
      dateStart: '',
      dateEnd: '',
      document: '',
      matchCategories: [],
      ageCategories: [],
      activities: [],
      contingents: [],
      formData: {
        person_responsible: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {},
      loading: false,
      progress: 0,
    };
  },
  created() {
    this.loadContingent(this.$route.params.id);
    this.fetchTournamentDetail(this.$route.params.id);
  },
  //
  methods: {
    async submitForm() {
      this.loading = true; // Show the loader
      this.errors = {}; // Reset errors before submitting

      // Filter kontingen yang dipilih (yang memiliki `isSelected = true`).
      const selectedContingents = this.contingents
        .filter(contingent => contingent.isSelected)  // Hanya pilih yang dipilih
        .map(contingent => contingent.id);            // Ambil ID saja
    
      try {
        // Mengirim data ID kontingen yang dipilih ke backend
        const response = await axios.post(
          `${API.API_BASE_URL}/tournaments/register`, // URL
          { 
            tournament_id: this.$route.params.id, // Add tournament_id to the payload
            contingents: selectedContingents 
          }, // Data payload
          { 
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Bearer token for authorization
            }
          } // Config (headers)
        );

        
        // Tampilkan pesan sukses
        useToast().success('Pendaftaran berhasil!');
        this.loadContingent(this.$route.params.id);
        
        // Tangani keberhasilan (misal, redireksi atau tampilkan pesan sukses)
        console.log('Registration successful:', response.data);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.status === 422) {
          // Kesalahan validasi
          this.errors = error.response.data.errors;
          useToast().error('Terdapat kesalahan dalam proses pendaftaran. pastikan Anda sudah memilih kontingen yang akan di ikut sertakan');
        } else {
          // Tangani kesalahan lainnya
          console.error('Error submitting the form:', error);
          useToast().error('Terjadi kesalahan, silakan coba lagi.');
        }
      }
    },
    async loadContingent(selectedTournamentId) {
      this.loading = true;
      console.log(this.loading);
      try {
        this.loading = true;

        const response = await axios.get(
          `${API.API_BASE_URL}/contingents/my-contingents`,
          {
            params: { tournament_id: selectedTournamentId },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        );
        const {
          data,
        } = response;

        this.contingents = data; // Assign team members
        this.loading = false;
      } catch (error) {
        console.error("Error loading members:", error);
      }
    },
    async fetchTournamentDetail(id) {
      this.loading = true; // Show loader
      try {
        const response = await axios.get(`/tournaments/${id}`);
        if (response.data) {
          this.tournamentName = response.data.name;
          this.tournamentImage = response.data.image;
          this.tournamentDescription = response.data.description;
          this.tournamentDate = response.data.event_date;
          this.tournamentLocation = response.data.location;
          this.dateStart = response.data.start_date;
          this.dateEnd = response.data.end_date;
          this.matchCategories = response.data.categories;
          this.ageCategories = response.data.age_categories;
          this.document = response.data.document;
          this.activities = response.data.activities;
         
        }
      } catch (error) {
        this.toast.error("Error fetching contingent details.");
      } finally {
        this.loading = false;
      }
    },
    
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #ffffff;
  margin-top: 80px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.dashboard-container p{
  font-family: Figtree, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.dashboard-container .tab-content .tab-pane{
  padding: 10px;
}

.dashboard-container .tab-content .tab-pane p{
  font-family: Figtree, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.dashboard-container .nav-pills .nav-item .nav-link{
  background-color: #E98800;
  color: #FFFFFF;
  font-family: Figtree, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.dashboard-container .nav-pills .nav-item .nav-link.active{
  background-color: #388E3C;
  color: #FFFFFF;
  font-family: Figtree, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.dashboard-container .tab-content .tab-pane ul{
  list-style: square;

}

.dashboard-container .tab-content .tab-pane ul li{
  font-family: Figtree, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.dashboard-container .form-control{
  font-family: Figtree, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  background-color: #388E3C;
  animation: loader-animation 1.5s infinite;
}

.tournament-name{
  font-family: Urbanist, sans-serif;
  font-size: 2rem;
  color: #1E2A57;
  font-weight: 700;
}

/* Animasi garis loader */
@keyframes loader-animation {
  0% {
    width: 0;
    background-color: #388E3C; /* Warna awal */
  }
  50% {
    width: 50%;
    background-color: #388E3C; /* Warna saat animasi */
  }
  100% {
    width: 100%;
    background-color: #388E3C;
  }
}

.list-unstyled {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 14px;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
