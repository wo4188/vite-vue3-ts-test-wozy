import type { AxiosInstance } from 'axios';
import type { Router } from 'vue-router';
import type { Pinia } from 'pinia';

import AxiosStatic from 'axios';
import { useUserStore } from '@/stores';

export default function setupInterceptors(axios: AxiosInstance, router: Router, pinia: Pinia): void {
  axios.interceptors.request.use(
    // 在发送请求之前做一些处理
    (config) => {
      const userStore = useUserStore(pinia);
      // if (userStore.token && config.headers) {
      //   config.headers['refresh-token'] = userStore.token;
      // }

      return config;
    },
    // 处理请求错误
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    // 在接收响应之前做一些处理
    (response) => {
      return response;
    },
    // 处理响应错误
    (error) => {
      const currRoute = router.currentRoute.value;
      if (AxiosStatic.isAxiosError(error) && error.response) {
        const { data } = error.response;
        switch (error.response.status) {
          case 401:
            // 未登录
            $showFailToast(data.message || '请先登录再访问');
            break;
          case 403:
            // 权限不足
            $showFailToast('权限不足');
            break;
          default:
          //
        }
      }

      return Promise.reject(error);
    }
  );

  router.beforeEach(async (to, from) => {
    const userStore = useUserStore(pinia);

    // 检查登录状态

    // 检查路由访问权限
  });
}
