<template>
    <div>
      <MainHeader />
      <main>
        <router-view></router-view>
      </main>
      <MainFooter />
    </div>
</template>
  
  <script>
  import MainHeader from '../../components/main/MainHeader.vue';
  import MainFooter from '../../components/main/MainFooter.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      MainHeader,
      MainFooter
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  