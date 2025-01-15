<template>
  <aside class="sidebar">
    <a class="navbar-brand" href="#">
      <img src="@/assets/app-logo.png" alt="Logo" />
    </a>
    <ul class="nav flex-column">
      <li v-for="menu in menus" :key="menu.id" class="nav-item">
        <router-link
          class="nav-link text-start"
          :to="'/admin/' + menu.url"  
          @click.prevent="toggleSubMenu(menu.id, menu.children)"
        >
          <i :class="menu.icon + ' me-2'"></i> {{ menu.name }}
          <i v-if="menu.children" :class="isSubMenuOpen === menu.id ? 'bi bi-dash-circle' : 'bi bi-plus-circle'"></i>
        </router-link>
        <ul v-if="menu.children && isSubMenuOpen === menu.id" class="sub-menu">
          <li v-for="child in menu.children" :key="child.id" class="nav-item">
            <router-link
              class="nav-link text-start"
              :to="'/admin/' + child.url"  
            >
              <i :class="child.icon + ' me-2'"></i> {{ child.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>


<script>
import axios from "axios";

export default {
  name: "AdminSidebar",
  data() {
    return {
      isSubMenuOpen: null, // Keeps track of the currently open submenu
      menus: [], // Stores the fetched menus
    };
  },
  methods: {
    toggleSubMenu(menuId, children) {
      if (children) {
        // Toggle the visibility of the submenu
        this.isSubMenuOpen = this.isSubMenuOpen === menuId ? null : menuId;
      }
    },
    async fetchMenus() {
      try {
        // Replace with the actual URL of your API
        const response = await axios.get("/menus", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Assumes token is in localStorage
          },
        });

        this.menus = response.data; // Store the menu data in the component state
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    },
  },
  mounted() {
    this.fetchMenus(); // Fetch menus when the component is mounted
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
  align-items: center;
}

.navbar-brand {
  margin-bottom: 30px;
  text-align: center;
}

.navbar-brand img {
  max-width: 100px;
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
  align-items: center;
}

.nav-item .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.sub-menu {
  margin-top: 5px;
  margin-left: 20px;
}

.sub-menu .nav-link {
  font-size: 0.9rem;
}

.sub-menu .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.bi {
  font-size: 1.2rem;
}
</style>
