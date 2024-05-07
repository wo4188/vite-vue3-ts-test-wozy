<template>
  <!-- # NOTE 默认 只用 van-tabs 头部的标签选项栏区域，弃用 标签内容区域(van-tab 自带的默认插槽) -->
  <van-tabs class="my-tabs-wrap" v-bind="$attrs" v-model:active="model" :line-width="lineWidth">
    <template #default>
      <slot>
        <van-tab v-for="(tab, i) in tabs" :key="i" :title="tab" />
      </slot>
    </template>
  </van-tabs>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     *  v-model:active 用法，同 van-tabs
     */
    active?: number | string; // 绑定当前激活标签对应的索引值

    /**
     * tab标题列表(简易版)
     *
     * (复杂的配置，请使用默认插槽传递 van-tab 组件)
     */
    tabs?: string[];

    /**
     * @default '20px'
     */
    lineWidth?: number | string;

    zIndex?: number | string;
  }>(),
  {
    active: 0,
    tabs: () => [],
    lineWidth: '20px',
  }
);

const emit = defineEmits<{
  (e: 'update:active', val?: number | string): void;
}>();

const model = $useVModel(props, 'active', emit);
</script>

<style lang="scss" scoped>
.my-tabs-wrap {
  --van-tabs-line-height: #{$app-tabs-height};

  z-index: v-bind(zIndex);

  &:deep() {
    .van-tab {
      color: $text-color-2;
    }

    .van-tab--active {
      color: $primary-color;
    //   font-weight: unset;
      // background-color: rgba($primary-color, 0.05);
    }
  }
}
</style>
