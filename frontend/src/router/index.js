import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../main/layouts/MainLayout.vue';
import HomePage from '../main/pages/HomePage.vue';
import AdminLayout from '../admin/layouts/AdminLayout.vue';
import LoginLayout from '../admin/layouts/LoginLayout.vue';
import DashboardPage from '../admin/pages/DashboardPage.vue';
import LoginPage from '../admin/pages/LoginPage.vue';
import RegistrationPage from '@/main/pages/RegistrationPage.vue';
import TournamentPage from '@/main/pages/TournamentPage.vue';
import SchedulePage from '@/main/pages/SchedulePage.vue';
import GalleryDetail from '@/main/pages/GalleryDetail.vue';
import AdminNavigationList from '../admin/pages/navigation/NavigationList.vue';
import AdminNavigationForm from '../admin/pages/navigation/NavigationForm.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: HomePage }
    ]
  },
  {
    path: '/pendaftaran',
    component: MainLayout,
    children: [
      { path: '', component: RegistrationPage }
    ]
  },
  {
    path: '/kejuaraan',
    component: MainLayout, // Use MainLayout for all /kejuaraan routes
    children: [
      {
        path: '', // Matches /kejuaraan
        name: 'TournamentPage',
        component: TournamentPage, // TournamentPage as the default view
      },
      {
        path: ':id', // Matches /kejuaraan/:id
        name: 'GalleryDetail',
        component: GalleryDetail, // GalleryDetail for specific IDs
        props: true, // Pass route params as props
      },
    ],
  },
  
  {
    path: '/jadwal',
    component: MainLayout,
    children: [
      { path: '', component: SchedulePage }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', component: DashboardPage }
    ]
  },
  { 
    path: '/admin/login', 
    component: LoginLayout, 
    children: [ 
      { path: '', component: LoginPage } // Use LoginLayout for login page ] }
    ]
  },
  {
    path: '/admin/navigation',
    component: AdminLayout,
    children: [
      { path: '', component: AdminNavigationList }
    ]
    //meta: { requiresAdmin: true }  // for admin-only route
  },
  {
    path: '/admin/navigation/create',
    component: AdminLayout,
    children: [
      { path: '', component: AdminNavigationForm }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
  {
    path: '/admin/navigation/edit/:id?',
    component: AdminLayout,
    children: [
      { path: '', component: AdminNavigationForm }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
