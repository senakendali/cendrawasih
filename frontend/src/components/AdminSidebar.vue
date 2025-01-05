<template>
  <aside class="sidebar">
    <a class="navbar-brand" href="#">
      <img src="@/assets/app-logo.png" alt="Logo" />
    </a>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link text-start" href="#">
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-start" href="#">
          <i class="bi bi-trophy me-2"></i> Matches
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-start" href="#">
          <i class="bi bi-people me-2"></i> Contingent
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-start" href="#">
          <i class="bi bi-award me-2"></i> Tournament
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link text-start d-flex justify-content-between"
          href="#"
          @click="toggleSubMenu"
        >
          <span>
            <i class="bi bi-gear me-2"></i> Settings
          </span>
          <i :class="isSubMenuOpen ? 'bi bi-dash-circle' : 'bi bi-plus-circle'"></i>
        </a>
        <ul v-if="isSubMenuOpen" class="sub-menu">
          <li class="nav-item">
            <a class="nav-link text-start" href="#">
              <i class="bi bi-sliders me-2"></i> General
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-start" href="#">
              <i class="bi bi-people-fill me-2"></i> User Management
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-start" href="#">
              <i class="bi bi-palette me-2"></i> Appearance
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link text-start" href="#">
          <i class="bi bi-file-earmark-bar-graph me-2"></i> Reports
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "AdminSidebar",
  data() {
    return {
      isSubMenuOpen: false, // Controls the visibility of the "Settings" submenu
    };
  },
  methods: {
    toggleSubMenu() {
      this.isSubMenuOpen = !this.isSubMenuOpen; // Toggle the submenu
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #1e2a57;
  height: 100vh;
  width: 250px;
  position: fixed;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers content horizontally */
}

.navbar-brand {
  margin-bottom: 30px;
  text-align: center;
}

.navbar-brand img {
  max-width: 100px; /* Limit logo width */
  height: auto;
}

.nav {
  width: 100%;
}

.nav-item .nav-link {
  color: white;
  padding: 10px;
  text-decoration: none;
  display: flex;
  align-items: center; /* Align text and icon vertically */
}

.nav-item .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.sub-menu {
  margin-top: 5px;
  margin-left: 20px; /* Indent child menu items */
}

.sub-menu .nav-link {
  font-size: 0.9rem; /* Slightly smaller font size for submenu items */
}

.sub-menu .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.bi {
  font-size: 1.2rem; /* Adjust icon size */
}
</style>
