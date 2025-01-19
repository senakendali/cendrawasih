<template>
  <div class="main-container">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>Pendaftaran</h1>
          <p>
            Pendaftaran Telah Dibuka! Jangan Lewatkan Kesempatan untuk Bertanding dengan Atlet-Atlet Berbakat Lainnya. 
            
          </p>
          <p>
            Untuk mengikuti kejuaraan ini, Anda harus memiliki akun terlebih dahulu untuk mendaftarkan kontingen Anda. Jika sudah memiliki akun, silahkan login dan mulai mendaftarkan kontingen dan atlit Anda untuk mengikut kejuaraan ini.
          </p>
        </div>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="submitForm" class="myForm" enctype="multipart/form-data">
        <div class="row">
          <div class="col-lg-6">
            <img :src="tournamentImage" class="img-fluid" alt="Tournament Image" />

          </div>
          <div class="col-lg-6">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="person-responsible" class="form-label">Nama Penanggung Jawab</label>
              <input type="text" class="form-control rounded" id="person-responsible" name="person_responsible" v-model="formData.person_responsible" />
              <small v-if="errors.person_responsible" class="text-danger">{{ errors.person_responsible }}</small>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control rounded" id="email" name="email" v-model="formData.email" />
              <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control rounded" id="password" name="password" v-model="formData.password" />
              <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
            </div>
            <div class="mb-3">
              <label for="confirm-password" class="form-label">Konfirmasi Password</label>
              <input type="password" class="form-control rounded" id="confirm-password" name="password_confirmation" v-model="formData.password_confirmation" />
              <small v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</small>
            </div>
            <div class="mb-3">
              <button type="submit" class="btn-form" :disabled="isLoading">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="loading-bar"></div>
  </div>
</template>

<script>
import axios from 'axios';
import API from '@/config/api'; // Assuming you have an API config file
import { useToast } from 'vue-toastification';

export default {
  name: 'RegistrationPage',
  data() {
    return {
      tournamentImage:'',
      formData: {
        person_responsible: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {},
      isLoading: false,
    };
  },
  created() {
    this.fetchTournamentDetail(this.$route.params.slug);
  },
  //
  methods: {
    async fetchTournamentDetail(slug) {
      this.isLoading = true; // Show loader
      try {
        const response = await axios.get(`/tournaments/detail/${slug}`);
        if (response.data) {
          this.tournamentImage = response.data.image;
         
        }
      } catch (error) {
        this.toast.error("Error fetching contingent details.");
      } finally {
        this.isLoading = false;
      }
    },
    async submitForm() {
      this.isLoading = true; // Show the loader
      this.errors = {}; // Reset errors before submitting

      try {
        const response = await axios.post(`${API.API_BASE_URL}/register`, this.formData);
        
        // Show success toast
        useToast().success('Pendaftaran berhasil! Sebentar lagi Anda akan di arahkan ke halaman Login.');

        // Handle success (e.g., redirect or show a success message)
        console.log('Registration successful:', response.data);

        // Add a timeout before redirecting
        setTimeout(() => {
          this.$router.push('/admin/login'); // Redirect to the dashboard after 3 seconds
        }, 3000);

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        if (error.response && error.response.status === 422) {
          // Validation errors
          this.errors = error.response.data.errors;
          
          // Show error toast
          useToast().error('Terdapat kesalahan dalam pengisian formulir.');
        } else {
          // Handle other errors
          console.error('Error submitting the form:', error);
          useToast().error('Terjadi kesalahan, silakan coba lagi.');
        }
      }
    },

  },
};
</script>

<style scoped>
/* Styles */
.myForm button {
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  background-color: #D32F2F; /* Red background for the button */
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.myForm button:hover {
  background-color: #FF5722; /* Darker red on hover */
}

.form-control {
  border-radius: 0;
  margin-bottom: 5px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border-left: 5px solid #D32F2F;
}

/* Loader Styles */
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #D32F2F;
  z-index: 9999;
  animation: loading 1s infinite linear;
}

/* Define animation for the loading bar */
@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

small {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .myForm .row{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
