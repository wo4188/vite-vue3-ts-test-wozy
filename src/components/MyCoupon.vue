<template>
  <div
    :class="[
      'my-coupon-wrap',
      {
        'is-discount': type === 'discount',
        'is-rebate': type === 'rebate',
      },
    ]"
  >
    <div>
      <slot name="text">{{ textVal }}</slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'discount' | 'rebate'; // 优惠、返利
    text?: string;
  }>(),
  {
    type: 'discount',
  }
);

const textMap = {
  discount: '券',
  rebate: '约返',
};

const textVal = computed(() => {
  if (props.text) return props.text;

  return textMap[props.type] || '券';
});
</script>

<style lang="scss" scoped>
.my-coupon-wrap {
  --comp-padding-gap: 0px 4px;
  --comp-radius: 3px;

  display: inline-flex;
  font-size: 12px;
  line-height: 1.4;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:nth-child(1) {
    min-width: 20px;
    padding: var(--comp-padding-gap);
    color: #fff;
  }
  > div:nth-child(2) {
    min-width: 40px;
    padding: var(--comp-padding-gap);
  }
}

.my-coupon-wrap.is-discount {
  > div:nth-child(1) {
    border-radius: var(--comp-radius);
    background-color: $color-pink;
  }
  > div:nth-child(2) {
    border-radius: var(--comp-radius);
    border: 1px solid $color-pink;
    color: $color-pink;
  }
}

.my-coupon-wrap.is-rebate {
  border-radius: var(--comp-radius);
  border: 1px solid $color-purple;

  > div:nth-child(1) {
    background-color: $color-purple;
  }

  > div:nth-child(2) {
    color: $color-purple;
  }
}
</style>
