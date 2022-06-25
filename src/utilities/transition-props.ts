import { PropType } from "vue";

export default {
  transitionName: { type: String, default: undefined },
  transitionCss: { type: Boolean, default: true },
  transitionType: { type: String as PropType<"transition" | "animation">, default: undefined },
  transitionDuration: {
    type: [Number, Object] as PropType<number | { enter: number; leave: number }>,
    default: undefined
  },
  transitionMode: { type: String as PropType<"in-out" | "out-in" | "default">, default: undefined },
  transitionAppear: { type: Boolean, default: false },
  transitionEnterFromClass: { type: String, default: undefined },
  transitionEnterActiveClass: { type: String, default: undefined },
  transitionEnterToClass: { type: String, default: undefined },
  transitionAppearFromClass: { type: String, default: undefined },
  transitionAppearActiveClass: { type: String, default: undefined },
  transitionAppearToClass: { type: String, default: undefined },
  transitionLeaveFromClass: { type: String, default: undefined },
  transitionLeaveActiveClass: { type: String, default: undefined },
  transitionLeaveToClass: { type: String, default: undefined }
};
