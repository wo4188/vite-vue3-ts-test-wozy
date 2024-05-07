<template>
  <div class="test-page">
    <div class="filter-bar">
      <my-tabs v-model:active="activeTab" :tabs="tabList" :line-width="'4rem'" @click-tab="getList(true)" />
    </div>

    <div class="list-block">
      <lazy-load-list
        pointer-silence="auto"
        v-model:flags="flags"
        @on-refresh="getList(true)"
        @on-load="onLoad()"
        @on-retry="getList()"
      >
        <div class="list-wrapper">
          <van-card
            class="product-card"
            v-for="(it, i) in list"
            :key="i"
            :price="it.discountPrice"
            :thumb="it.mainImageUrl"
            :origin-price="it.originalPrice"
            @click="clickProduct(it)"
          >
            <template #title>
              <div class="product-card-title">
                <img :src="it.allianceLogoUrl" />
                <span>{{ it.title }}</span>
              </div>
            </template>
            <template #footer>
              <div class="product-card-footer">
                <my-coupon>{{ (+it.couponAmount || 0).toFixed(2) || '0.00' }}</my-coupon>
                <my-coupon type="rebate">{{ (+it.incomeAmount || 0).toFixed(2) || '0.00' }}</my-coupon>
              </div>
            </template>
          </van-card>
        </div>
      </lazy-load-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLazyLoadList } from '@/components/lazyLoadList/hooks';
import { http } from '@/utils';

const router = useRouter();

const tabList = ['综合', '销量', '价格', '最新'];
const activeTab = ref(0);

const list = ref<any[]>([]);
const { flags, pageNum, pageSize, onLoad, getList } = useLazyLoadList(list, reqList, { pageSize: 10 });

const clickProduct = (it: Record<string, any>) => {
  // router.push({ name: '', query: {} });
};

async function reqList() {
  try {
    const res = await http
      .get('/api/product/portal/search', {
        params: {
          _currentPageType: 1, // 取值固定
          _currentPageNo: '166072354552493993', // 取值固定
          categoryNo: '166072430564787549', // 取值固定
          sortStrategy: activeTab.value, // 0:综合排序 1:销量排序 2:价格排序 3:最新排序
          sortType: 1, // 取值固定
          displayMode: 0, // 取值固定
          pageNo: pageNum.value, // 分页编号
          pageSize: pageSize.value, // 取值固定
        },
        headers: {
          'App-No': '166072354509830337', // 取值固定
          'Shop-No': '166072354520574632', // 取值固定
        },
      })
      .then(({ data }) => data);

    // console.log('接口数据 🛸🛸🛸', res); // TODO 测试接口

    return res;
  } catch (e) {
    console.log(e);
    $showFailToast('列表加载失败');
    throw e;
  }
}

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.test-page {
  --van-card-price-color: #{$primary-color};
  height: 100%;

  > .filter-bar {
    height: $app-tabs-height;
  }

  > .list-block {
    overflow-y: auto;
    height: calc(100% - #{$app-tabs-height});
    padding: 0 16px 50px;

    .list-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 48%);
      justify-content: space-between;

      &:deep(.product-card.van-card) {
        padding: 0;
        overflow: hidden;
        margin-top: 12px;
        background-color: transparent;

        .product-card-title {
          @include multiline-ellipsis(2);

          font-weight: $font-weight-bold;
          font-size: 14px;
          line-height: 1.4;

          > *:nth-child(1) {
            display: inline-block;
            width: 14px;
            margin-right: 4px;
            vertical-align: middle;
          }
        }

        .product-card-footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 6px 6px;
          text-align: unset;
        }

        .van-card__header {
          display: flex;
          flex-flow: column;

          .van-card__thumb {
            width: 100%;
            height: unset;
            margin: 0;
            aspect-ratio: 1/1;
          }

          .van-card__content {
            min-height: unset;
            margin-top: 6px;
            padding: 0 6px;

            .van-card__bottom {
              margin: 4px 0;
            }
          }
        }
      }
    }
  }
}
</style>
