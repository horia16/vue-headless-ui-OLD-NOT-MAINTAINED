<template>
  <div>
    <headless-tabs v-model="testData.tab">
      <headless-tab-switch>
        Switch to tab 1
      </headless-tab-switch>
      <headless-tab-switch>
        Switch to tab 2
      </headless-tab-switch>
      <headless-tab-switch>
        Switch to tab 3
      </headless-tab-switch>
      <headless-tab>1</headless-tab>
      <headless-tab>2</headless-tab>
      <headless-tab>3</headless-tab>
    </headless-tabs>
    <headless-tabs v-model="testData.tab2">
      <headless-tab-switch v-for="x in 6" :key="x"> Switch to tab {{ x }} </headless-tab-switch>

      <headless-tab
        v-for="x in 6"
        :key="x"
        :style="`width:100%;height:20rem;background-color:#22${x}${x}44;color:white;`"
      >
        This is tab {{ x }}
      </headless-tab>
    </headless-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {},
  name: "ServeDev",
  setup() {
    const testData = reactive({
      tab: 0,
      tab2: 0,
      input1: null,
      input2: null,
      input3: null,
      input4: [],
      input5: null,
      input6: null,
      dynamicRadio: null,
      dynamicCheckbox: [],
      accordion: false,
      dialogOpen: false,
      dialogOpen2: false,
    });

    function testSubmit() {
      console.log("valid");
    }
    function testError() {
      console.log("error");
    }
    return {
      testData,
      testSubmit,
      testError,
    };
  },
});
</script>
<style>
@import url(https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css);
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
