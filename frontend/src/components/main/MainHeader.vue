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
            <router-link to="/" class="nav-link" exact-active-class="active">Beranda</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pendaftaran" class="nav-link" exact-active-class="active">Pendaftaran</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/jadwal" class="nav-link" exact-active-class="active">Jadwal</router-link>
          </li>
        </ul>

        <button class="btn btn-login" @click="$router.push('/admin/login')">Login</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      isScrolled: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50; // Adjust the scroll position as needed
    }
  }
};
</script>

<style scoped>
.my-navbar {
  background-color: transparent; /* Set navbar background to transparent initially */
  padding: 10px;
  transition: background-color 0.3s ease; /* Smooth transition for background color change */
  height: 120px;
}

.navbar-brand{
  position: fixed;
  top:-80px;
}

.my-navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.8); /* Background color when scrolled */
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
  color:#FFFFFF;
}
</style>
