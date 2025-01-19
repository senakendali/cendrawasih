<template>
  <nav class="navbar navbar-expand-lg my-navbar fixed-top" :class="{'scrolled': isScrolled}">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="@/assets/float-logo.png" alt="Logo"/>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-3">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about-us" class="nav-link" exact-active-class="active">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/schedule" class="nav-link" exact-active-class="active">Schedule</router-link>
          </li>
        </ul>

        <button class="btn btn-login" @click="navigateTo('/admin/login')">Login</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'MainHeader',
  data() {
    return {
      isScrolled: false,
      isLoading: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    const router = useRouter();
    router.beforeEach((to, from, next) => {
      this.startLoading();
      next();
    });
    router.afterEach(() => {
      this.isLoading = false;
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50; // Adjust the scroll position as needed
    },
    startLoading() {
      this.isLoading = true;
    },
    navigateTo(path) {
      this.startLoading();
      this.$router.push(path);
    }
  },
  watch: {
    $route() {
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.my-navbar {
  background-color: transparent; /* Set navbar background to transparent initially */
  padding: 10px;
  transition: background-color 0.3s ease, height 0.3s ease, padding 0.3s ease; /* Smooth transition for background color, height, and padding changes */
  height: 120px;
}

.navbar-brand {
  position: fixed;
  top: -80px;
}

.my-navbar.scrolled .navbar-brand{ 
 
  top: -55px;
  position: fixed;
}

.my-navbar.scrolled .navbar-brand img {
  height: 160px;
  transition: height 0.3s ease; /* Smooth transition for logo size */

} 

.my-navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black background */
  height: 60px; /* Reduced height when scrolled */
  padding: 5px; /* Reduced padding when scrolled */
}

.my-navbar .navbar-nav .nav-link {
  color: #FFF;
  font-family: "Urbanist", sans-serif;
  font-size: 16px;
  width: 120px;
}

.my-navbar .navbar-nav .nav-link:hover {
  color: #D32F2F;
  text-decoration: none;
  transition: 0.3s ease;
}

/* Active link styling */
.my-navbar .navbar-nav .nav-link.active {
  color: #D32F2F; /* Change active link color */
  font-weight: bold; /* Optional: Make active link text bold */
}

.btn-login {
  background-color: #D32F2F;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #FF5722;
  color: #FFFFFF;
}
</style>
