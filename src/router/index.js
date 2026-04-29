import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import { auth, authReady } from '../config/firebase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => {
        return import('../views/ChatView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => {
        return import('../views/DocumentsView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/documents/:category',
      name: 'document-category',
      component: () => {
        return import('../views/DocumentOverviewView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/images',
      name: 'images',
      component: () => {
        return import('../views/ImagesView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/images/:category',
      name: 'image-category',
      component: () => {
        return import('../views/ImageCategoriesView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => {
        return import('../views/UploadMediaView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/more',
      name: 'more',
      component: () => {
        return import('../views/MoreView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/more/settings',
      name: 'more-settings',
      component: () => {
        return import('../views/MoreSettingsView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/more/contact',
      name: 'more-contact',
      component: () => {
        return import('../views/MoreContactView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/client/chats',
      name: 'client-chats',
      component: () => {
        return import('../views/clientViews/ClientChats.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/consultant/projects',
      name: 'consultant-projects',
      component: () => {
        return import('../views/consultantViews/ConsultantProjectsView.vue');
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => {
        return import('../views/TimelineView.vue');
      },
      meta: { requiresAuth: true }
    }
  ]
});


router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;

  await authReady;

  if (!auth.currentUser) return '/';

  return true;
});

export default router;
