import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue'),
    },
    {
      path: '/documents/:category',
      name: 'document-category',
      component: () => import('../views/DocumentOverviewView.vue'),
    },
    {
      path: '/images',
      name: 'images',
      component: () => import('../views/ImagesView.vue'),
    },
    {
      path: '/images/:category',
      name: 'image-category',
      component: () => import('../views/ImageCategoriesView.vue'),
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadMediaView.vue'),
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../views/MoreView.vue'),
    },
    {
      path: '/more/settings',
      name: 'more-settings',
      component: () => import('../views/MoreSettingsView.vue'),
    },
    {
      path: '/more/contact',
      name: 'more-contact',
      component: () => import('../views/MoreContactView.vue'),
    },
    {
      path: '/client/chats',
      name: 'client-chats',
      component: () => import('../views/clientViews/ClientChats.vue'),
    },
    {
      path: '/consultant/projects',
      name: 'consultant-projects',
      component: () => import('../views/consultantViews/ConsultantProjectsView.vue'),
    },
  ],
});

export default router;
