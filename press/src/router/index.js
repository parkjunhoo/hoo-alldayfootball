import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/articleList',
    name: 'Articlelist',
    component: () => import('../views/Articlelist.vue')
  },
  {
    path: '/articleView',
    name: 'Articleview',
    component: () => import('../views/Articleview.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Admin/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    beforeEnter: (to,from,next) => {
      axios.get('http://alldayfootball.co.kr/api/auth/check')
      .then((res)=>{
        console.log(res.data);
        if(res.data==='not_logged'||res.data==='not_admin')
        {
          router.push('/login');
          return;
        }
        else{
          if(res.data.info.admin)
          {
            // router.push('/admin/article');
            next();
            return;
          }
        }
      });
    },
    children: [
      {
        path : '/admin/write',
        name : 'Write',
        component: () => import('../components/Admin/Write.vue'),
        beforeEnter: (to,from,next) => {
          axios.get('http://alldayfootball.co.kr/api/auth/check')
          .then((res)=>{
            // console.log(res.data);
            if(res.data==='not_logged'||res.data==='not_admin')
            {
              alert('권한이 없습니다.');
              router.push('/admin/login');
              return;
            }
            else{
              if(res.data.info.admin)
              {
                next();
                return;
              }
            }
          });
        },
      },
      {
        path : '/admin/edit',
        name : 'Edit',
        component: () => import('../components/Admin/Edit.vue'),
        beforeEnter: (to,from,next) => {
          axios.get('http://alldayfootball.co.kr/api/auth/check')
          .then((res)=>{
            // console.log(res.data);
            if(res.data==='not_logged'||res.data==='not_admin')
            {
              alert('권한이 없습니다.');
              router.push('/admin/login');
              return;
            }
            else{
              if(res.data.info.admin)
              {
                next();
                return;
              }
            }
          });
        },
      },
      {
        path : '/admin/article',
        name : 'Article',
        component: () => import('../components/Admin/Article.vue'),
        beforeEnter: (to,from,next) => {
          axios.get('http://alldayfootball.co.kr/api/auth/check')
          .then((res)=>{
            // console.log(res.data);
            if(res.data==='not_logged'||res.data==='not_admin')
            {
              alert('권한이 없습니다.');
              router.push('/admin/login');
              return;
            }
            else{
              if(res.data.info.admin)
              {
                next();
                return;
              }
            }
          });
        },
      },
      {
        path : '/admin/ad',
        name : 'Ad',
        component: () => import('../components/Admin/Ad.vue'),
        beforeEnter: (to,from,next) => {
          axios.get('http://alldayfootball.co.kr/api/auth/check')
          .then((res)=>{
            // console.log(res.data);
            if(res.data==='not_logged'||res.data==='not_admin')
            {
              alert('권한이 없습니다.');
              router.push('/admin/login');
              return;
            }
            else{
              if(res.data.info.admin)
              {
                next();
                return;
              }
            }
          });
        },
      },
      {
        path : '/admin/accout',
        name : 'Accout',
        component: () => import('../components/Admin/Accout.vue'),
        beforeEnter: (to,from,next) => {
          axios.get('http://alldayfootball.co.kr/api/auth/check')
          .then((res)=>{
            // console.log(res.data);
            if(res.data==='not_logged'||res.data==='not_admin')
            {
              alert('권한이 없습니다.');
              router.push('/admin/login');
              return;
            }
            else{
              if(res.data.info.admin)
              {
                next();
                return;
              }
            }
          });
        },
      },
      {
        path : '/admin/etc',
        name : 'Etc',
        component: () => import('../components/Admin/Etc.vue'),
        beforeEnter: (to,from,next) => {
          axios.get('http://alldayfootball.co.kr/api/auth/check')
          .then((res)=>{
            // console.log(res.data);
            if(res.data==='not_logged'||res.data==='not_admin')
            {
              alert('권한이 없습니다.');
              router.push('/admin/login');
              return;
            }
            else{
              if(res.data.info.admin)
              {
                next();
                return;
              }
            }
          });
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
