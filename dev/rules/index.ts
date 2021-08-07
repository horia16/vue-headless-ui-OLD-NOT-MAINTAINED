import { defineRule } from "vee-validate";

defineRule("required", (value: string | number | boolean | Array<any> | null) => {
  if (Array.isArray(value) && value.length == 0) {
    return "Please answer this question in order to proceed. Array";
  }
  if (value == null || value == "") {
    return "Please answer this question in order to proceed.";
  }
  return true;
});
