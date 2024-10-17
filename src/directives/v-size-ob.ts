import type { Directive } from "vue";

type BoxSize = {
  width: number;
  height: number;
};

const map = new WeakMap<Element, (boxSize: BoxSize) => void>();

const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    // console.log("🚀 ~ ob ~ handler 👉", handler);
    try {
      handler?.({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
      });
    } catch (error) {
      console.error("Error handling resize event:", error)
    }
  }
});

/**
 * @see 推荐 v-resize-observer https://vueuse.org/core/useResizeObserver/
 */
export default {
  mounted(el, binding) {
    map.set(el, binding.value);
    ob.observe(el);
  },
  unmounted(el) {
    ob.unobserve(el);
  },
} as Directive<HTMLElement, (boxSize: BoxSize) => void>;
