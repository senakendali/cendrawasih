<template>
  <div class="admin-layout">
    <Sidebar />
    <main class="content">
      <AdminHeader class="floating-header with-space" />
      <div class="main-view">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import AdminHeader from '../../components/admin/AdminHeader.vue';
import Sidebar from '../../components/admin/AdminSidebar.vue';



export default {
  name: 'AdminLayout',
  components: {
    AdminHeader,
    Sidebar
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
}

/* Sidebar styles */
.admin-layout Sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

/* Main content styles */
.content {
  background-color: #F8F7FA;
  margin-left: 250px; /* Matches Sidebar width */
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Floating header styles */
.floating-header {
  position: fixed;
  top: 20px; /* Adds space from top */
  left: 270px; /* Matches adjusted Sidebar width */
  right: 20px !important; /* Ensure the space from right works */
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

/* Adjust space below header */
.floating-header.with-space {
  margin-bottom: 15px; /* Space from other elements */
}

/* Main view styles */
.main-view {
  background-color: #F8F7FA;
  padding: 20px;
}
</style>
