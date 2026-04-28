import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
      meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/documents/:category',
      name: 'document-category',
      component: () => import('../views/DocumentOverviewView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/images',
      name: 'images',
      component: () => import('../views/ImagesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/images/:category',
      name: 'image-category',
      component: () => import('../views/ImageCategoriesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadMediaView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../views/MoreView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/more/settings',
      name: 'more-settings',
      component: () => import('../views/MoreSettingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/more/contact',
      name: 'more-contact',
      component: () => import('../views/MoreContactView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/client/chats',
      name: 'client-chats',
      component: () => import('../views/clientViews/ClientChats.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/consultant/projects',
      name: 'consultant-projects',
      component: () => import('../views/consultantViews/ConsultantProjectsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimelineView.vue'),
      meta: { requiresAuth: true }
    },
  ],
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;

  if (!requiresAuth) {
    next();
    return;
  };
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next(value);
    } else {
      next('/');
    };
  });
});

export default router;
