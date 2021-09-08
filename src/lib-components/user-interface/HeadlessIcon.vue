<template>
  <component :is="as" :key="name" :style="!font ? { width: dimensions.width, height: dimensions.height, display } : ''">
    <slot>
      <span class="iconify" v-if="iconify" :data-icon="name" style="width:100%;height:100%"></span>
      <span
        v-else-if="font"
        :aria-label="alt ? alt : name"
        :class="name"
        aria-hidden="true"
        role="img"
        v-bind="attrs"
      ></span>
      <span
        v-else-if="html"
        :aria-label="alt ? alt : name"
        aria-hidden="true"
        role="img"
        style="width:100%;height:100%"
        v-bind="attrs"
        v-html="html"
      ></span
      ><img v-else-if="src" :alt="alt ? alt : name" :src="src" style="width:100%;height:100%" v-bind="attrs" />
    </slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "HeadlessIcon",
  props: {
    as: { type: String, default: "span" },
    name: { type: String, required: true },
    font: { type: Boolean, default: false },
    iconify: { type: Boolean, default: false },
    html: { type: String, default: null },
    src: { type: String, default: null },
    alt: { type: String, default: null },
    width: { type: [String, Number], default: 24 },
    height: { type: [String, Number], default: 24 },
    display: { type: String, default: "inline-flex" }
  },
  setup(props, { attrs }) {
    const dimensions = computed(() => {
      const width = typeof props.width == "number" ? `${props.width}px` : props.width;
      const height = typeof props.height == "number" ? `${props.height}px` : props.height;
      return {
        width,
        height
      };
    });
    return {
      attrs,
      dimensions
    };
  }
});
</script>
