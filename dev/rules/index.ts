import { defineRule } from "vee-validate";

defineRule("required", (value: string | number | boolean | null) => {
  if (value == null || value == "") {
    return "Please answer this question in order to proceed.";
  }
  return true;
});
