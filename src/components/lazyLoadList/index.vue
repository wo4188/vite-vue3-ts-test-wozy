<!-- 懒加载分页列表(上拉刷新+下拉分页加载) 组件 -->
<template>
    <div class="lazy-load-list-wrap">
        <van-pull-refresh
            class="pull-refresh-ref"
            v-model="flagsVal.refreshing"
            :loading-text="loadingText"
            :disabled="refreshable"
            @refresh="onRefresh()"
        >
            <van-list
                class="list-ref"
                ref="listCtx"
                :disabled="isDisabled"
                v-model:loading="flagsVal.loading"
                :loading-text="loadingText"
                :finished="flagsVal.finished"
                :finished-text="finishedTextVal"
                :error="flagsVal.failed"
                :immediate-check="immediateCheck"
                :offset="offset"
                @load="onLoad()"
            >
                <div class="default-slot">
                    <slot></slot>
                </div>

                <!-- 加载失败后的提示文案 插槽 -->
                <template #error>
                    <slot name="error">
                        <span @click.stop="clickErrorText">{{ errorTextVal }}</span>
                    </slot>
                </template>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script setup lang="ts">
import type { ListInstance } from 'vant';

const props = withDefaults(
    defineProps<{
        /**
         * 状态标志集合
         */
        flags: {
            loading?: boolean;
            refreshing?: boolean;
            finished?: boolean;
            failed?: boolean;
        };

        immediateCheck?: boolean;
        offset?: string | number;

        loadingText?: string;
        finishedText?: string;
        errorText?: string;

        refreshable?: boolean;

        /**
         *  是否禁止触发(默认插槽范围内)鼠标事件
         */
        pointerSilence?: 'auto' | boolean;
    }>(),
    {
        immediateCheck: false,
        offset: 50,

        loadingText: '加载中...',
        errorText: '加载失败，点击重试',
        finishedText: '— 到底了 —',
    }
);

const emit = defineEmits<{
    (e: 'on-refresh'): void;
    (e: 'on-load'): void;
    (e: 'on-retry'): void;
    (e: 'update:flags', val: Record<string, boolean>): void;
}>();

const listCtx = ref<ListInstance | null>(null);

const flagsVal = $useVModel(props, 'flags', emit);

const finishedTextVal = computed(() => {
    const text = props.finishedText;
    const refreshing = flagsVal.value.refreshing;
    return refreshing ? undefined : text;
});

const errorTextVal = computed(() => {
    const text = props.errorText;
    const refreshing = flagsVal.value.refreshing;
    return refreshing ? undefined : text;
});

const isDisabled = computed(() => {
    // refreshing态 显示时，禁止显示 loading 态(防止同一时间出现 2个"加载态")
    return !!flagsVal.value.refreshing;
});

const isSilentPointer = computed(() => {
    const val = props.pointerSilence;
    const { loading, refreshing } = props.flags;
    if (val === 'auto') {
        return !!(loading || refreshing);
    } else if (val) {
        return true;
    } else {
        return false;
    }
});

const onRefresh = () => {
    // console.log('onRefresh refreshing', flagsVal.value.refreshing); // => true
    emit('on-refresh');
};

const onLoad = () => {
    // console.log('onLoad loading', flagsVal.value.loading); // => true
    emit('on-load');
};

const clickErrorText = () => {
    flagsVal.value.failed = false; // 手动重置 failed态
    emit('on-retry');
};

defineExpose({
    listCtx,
});
</script>

<script lang="ts">
export default {
    name: 'lazy-load-list',
};
</script>

<style lang="scss" scoped>
.lazy-load-list-wrap {
    min-height: 100%;

    > .pull-refresh-ref {
        min-height: var(--van-pull-refresh-head-height);

        .list-ref {
            .default-slot {
                pointer-events: v-bind("isSilentPointer ? 'none': 'auto'");
            }
        }
    }
}
</style>
