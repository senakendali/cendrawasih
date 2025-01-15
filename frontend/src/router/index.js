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
import NavigationCreatePage from "@/admin/pages/navigation/NavigationCreatePage.vue";
import NavigationEditPage from "@/admin/pages/navigation/NavigationEditPage.vue";
import AdminContingetList from '../admin/pages/contingent/ContingentList.vue';
import ContingentCreatePage from "@/admin/pages/contingent/ContingentCreatePage.vue";
import ContingentEditPage from "@/admin/pages/contingent/ContingentEditPage.vue";
import AdminTeamMembersList from '../admin/pages/team-members/MembersList.vue';
import TeamMembersCreatePage from "@/admin/pages/team-members/MembersCreatePage.vue";
import TeamMembersEditPage from "@/admin/pages/team-members/MembersEditPage.vue";


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
      { path: '', component: NavigationCreatePage }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
  {
    path: '/admin/navigation/edit/:id',
    name: "EditMenu",
    component: AdminLayout,
    props: true, // Kirim parameter ID ke komponen sebagai props
    children: [
      { path: '', component: NavigationEditPage }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
  {
    path: '/admin/contingent',
    component: AdminLayout,
    children: [
      { path: '', component: AdminContingetList }
    ]
    //meta: { requiresAdmin: true }  // for admin-only route
  },
  {
    path: '/admin/contingent/create',
    component: AdminLayout,
    children: [
      { path: '', component: ContingentCreatePage }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
  {
    path: '/admin/contingent/edit/:id',
    name: 'EditContingent',
    component: AdminLayout, // This should be the main layout component
    props: true, // This makes the route parameters available as props to your component
    children: [
      {
        path: '', // Empty path indicates this is the default child route
        component: ContingentEditPage, // The component rendered inside the <router-view> in AdminLayout
      }
    ]
  },
  {
    path: '/admin/team-members',
    component: AdminLayout,
    children: [
      { path: '', component: AdminTeamMembersList }
    ]
    //meta: { requiresAdmin: true }  // for admin-only route
  },
  {
    path: '/admin/team-members/create',
    component: AdminLayout,
    children: [
      { path: '', component: TeamMembersCreatePage }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
  {
    path: '/admin/team-members/edit/:id',
    name: "EditMember",
    component: AdminLayout,
    props: true, // Kirim parameter ID ke komponen sebagai props
    children: [
      { path: '', component: TeamMembersEditPage }
    ]
    //meta: { requiresAdmin: true }  // admin-only form for menu
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
