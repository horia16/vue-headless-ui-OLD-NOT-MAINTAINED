<template>
  <component
    :is="element"
    :key="name"
    :style="!font ? { width: dimensions.width, height: dimensions.height, display } : ''"
  >
    <slot>
      <span v-if="iconify" class="iconify" :data-icon="name" style="width:100%;height:100%" />
      <span
        v-else-if="font"
        :class="name"
        role="img"
        aria-hidden="true"
        :aria-label="alt ? alt : name"
        v-bind="attrs"
      />
      <span
        v-else-if="html"
        role="img"
        aria-hidden="true"
        :aria-label="alt ? alt : name"
        v-bind="attrs"
        v-html="html"
        style="width:100%;height:100%"
      />
      <img v-else-if="src" :src="src" :alt="alt ? alt : name" v-bind="attrs" style="width:100%;height:100%" />
    </slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "HeadlessIcon",
  props: {
    element: { type: String, default: "span" },
    name: { type: String, required: true },
    font: { type: Boolean, default: false },
    iconify: { type: Boolean, default: false },
    html: { type: String, default: null },
    src: { type: String, default: null },
    alt: { type: String, default: null },
    width: { type: [String, Number], default: 24 },
    height: { type: [String, Number], default: 24 },
    display: { type: String, default: "inline-flex" },
  },
  setup(props, { attrs }) {
    const dimensions = computed(() => {
      const width = typeof props.width == "number" ? `${props.width}px` : props.width;
      const height = typeof props.height == "number" ? `${props.height}px` : props.height;
      return {
        width,
        height,
      };
    });
    return {
      attrs,
      dimensions,
    };
  },
});
</script>
