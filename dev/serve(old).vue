<template>
  <div>
    <headless-tabs
      v-model="testData.tab"
      :tabs="[{ name: 'Inputs' }, { name: 'Icons' }, { name: 'Accordions' }, { name: 'Dialogs' }]"
    >
      <div style="display: flex; gap: 1rem; flex-wrap:wrap">
        <tab-switch #default="{index, currentTab, switchTab, data}">
          <button
            :style="{ backgroundColor: index == currentTab ? 'blue' : '', padding: '1rem', width: '8rem' }"
            @click="switchTab(index)"
          >
            {{ data.name }}
          </button>
        </tab-switch>
      </div>

      <!-- <transition-group name="fade"> -->
      <headless-tab key="1">
        <h1>
          Inputs Test
        </h1>
        <headless-form scrollToError @error="testError" @valid="testSubmit">
          <headless-input v-model="testData.input1" rules="required">
            <input-label text="Test Label" />
            <input-field />
            <input-error />
          </headless-input>

          <headless-input v-model="testData.input2" rules="required">
            <input-label text="Test Label" />
            <select-field
              :options="[
                { name: 'test', value: 'test' },
                { name: 'test2', value: 'test2' }
              ]"
            />
            <input-error />
          </headless-input>

          <headless-input v-model="testData.input3" element="fieldset" rules="required">
            <input-label element="legend" text="Test Label" />
            <input-label isWrapper>
              <radio-field :index="1" value="test" />
              Test label
            </input-label>
            <input-label isWrapper>
              <radio-field :index="2" value="test2" />
              Test label 2
            </input-label>
            <input-error />
          </headless-input>

          <headless-input v-model="testData.input4" element="fieldset" rules="required">
            <input-label element="legend" text="Test Label" />
            <input-label isWrapper>
              <checkbox-field :index="1" value="test" />
              Test checkbox label
            </input-label>
            <input-label isWrapper>
              <checkbox-field :index="2" value="test2" />
              Test checkbox label 2
            </input-label>
            <input-error />
          </headless-input>

          <headless-input v-model="testData.input5" element="fieldset" rules="required">
            <input-label element="legend" text="Test Label" />
            <input-label isWrapper>
              <checkbox-field :index="1" value="test" />
              Test checkbox truthy/falsy
            </input-label>
            <input-error />
          </headless-input>

          <headless-input v-model="testData.input6" rules="required">
            <input-label text="Test Label" />
            <textarea-field />
            <input-error />
          </headless-input>

          <h1>
            Dynamic Inputs Test
          </h1>
          <headless-input v-model="testData.dynamicRadio" element="fieldset" rules="required">
            <input-label element="legend" text="Test Label" />
            <input-label
              v-for="(option, index) in [
                { name: 'test', value: 'test' },
                { name: 'test2', value: 'test2' },
                { name: 'test3', value: 'test3' },
                { name: 'test4', value: 'test4' }
              ]"
              :key="index"
              isWrapper
            >
              <radio-field :index="index" :value="option.value" />
              {{ option.name }}
            </input-label>
            <input-error />
          </headless-input>
          <headless-input v-model="testData.dynamicCheckbox" element="fieldset" rules="required">
            <input-label element="legend" text="Test Label" />
            <input-label
              v-for="(option, index) in [
                { name: 'test', value: 'test' },
                { name: 'test2', value: 'test2' },
                { name: 'test3', value: 'test3' },
                { name: 'test4', value: 'test4' }
              ]"
              :key="index"
              isWrapper
            >
              <checkbox-field :index="index" :value="option.value" />
              {{ option.name }}
            </input-label>
            <input-error />
          </headless-input>
          <button>Submit</button>
        </headless-form>
      </headless-tab>

      <headless-tab key="2">
        <h1>
          Icon Test
        </h1>
        <div>
          <h4>Iconify</h4>
          <headless-icon iconify name="noto:test-tube" />
        </div>
        <div>
          <h4>Font Icon</h4>
          <headless-icon font name="mdi mdi-home" />
        </div>
        <div>
          <h4>Inline Svg</h4>
          <headless-icon
            :html="
              `<svg
        xmlns='http://www.w3.org/2000/svg'
        xmlns:xlink='http://www.w3.org/1999/xlink'
        aria-hidden='true'
        role='img'
        width='100%'
        height='100%'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 72 72'
      >
        <path
          fill='#597B91'
          d='M67.9 30.9v-1.2C67.2 13.2 53.6 0 37 0C20.3 0 6.7 13.2 6.1 29.7v2.9C7.1 55.3 28.1 72 37 72c8.8 0 29.8-16.7 30.9-39.4c-.1-.5 0-1.1 0-1.7z'
        />
        <path
          fill='#2B3B47'
          d='M26.3 33.4c-1.3-3.5-5-5.6-8.7-4.6c-3.7 1-5.9 4.6-5.3 8.4h-.1l2.7 9.9c1 3.9 5.1 6.2 9 5.2s6.2-5.1 5.2-9l-2.8-9.9z'
        />
        <path
          fill='#2B3B47'
          d='M61.6 37.1c.7-3.7-1.6-7.4-5.3-8.4c-3.7-1-7.5 1.1-8.7 4.6h-.1l-2.7 9.9c-1 3.9 1.3 7.9 5.2 9c3.9 1 7.9-1.3 9-5.2l2.6-9.9z'
        />
        <path
          fill='#2B3B47'
          d='M37 64.5c-3.2 0-6-1.6-7.6-4.3c-.2-.4-.2-.8 0-1.2c.2-.4.6-.6 1.1-.6h13.2c.4 0 .8.2 1.1.6c.2.4.2.8 0 1.2c-1.8 2.7-4.7 4.3-7.8 4.3z'
        /></svg
      >`
            "
            name="alien"
          />
        </div>
      </headless-tab>
      <headless-tab key="3">
        <h1>
          Accordion tests
        </h1>
        <headless-accordion self>
          <accordion-header #default="{toggle}" style="display:flex;border:1px solid black">
            <button @click="toggle">Toggle</button>
          </accordion-header>
          <accordion-content style="border:1px solid black">
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
          </accordion-content>
        </headless-accordion>
        <headless-accordion openByDefault self>
          <accordion-header #default="{toggle}" style="display:flex;border:1px solid black">
            <button @click="toggle">Toggle</button>
          </accordion-header>
          <accordion-content style="border:1px solid black">
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
          </accordion-content>
        </headless-accordion>
        <headless-accordion v-model="testData.accordion">
          <accordion-header #default="{toggle}" style="display:flex;border:1px solid black">
            <button @click="toggle">Toggle3</button>
          </accordion-header>
          <accordion-content style="border:1px solid black">
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
            <div>Content</div>
          </accordion-content>
        </headless-accordion>
      </headless-tab>
      <headless-tab key="4">
        <h1>
          Dialog tests
        </h1>
        <headless-button @click="testData.dialogOpen = true">
          Open Dialog
        </headless-button>
        <headless-dialog
          v-model="testData.dialogOpen"
          style="background-color:#00000080;display:flex; justify-content:center; align-items:center;"
        >
          <dialog-content style="background-color:#fff">
            <headless-button @click="testData.dialogOpen = false">
              Close Dialog
            </headless-button>
            <div>
              Example text
            </div>
            <headless-button>
              dummy
            </headless-button>
            <headless-button>
              dummy2
            </headless-button>
            <headless-button>
              dummy3
            </headless-button>
            <div>
              Test dynamic content
            </div>
            <headless-accordion self>
              <accordion-header #default="{toggle}" style="display:flex;border:1px solid black">
                <button @click="toggle">Toggle</button>
              </accordion-header>
              <accordion-content style="border:1px solid black">
                <div>Content</div>
                <div>Content</div>
                <headless-button>
                  dummy
                </headless-button>
                <headless-button>
                  dummy2
                </headless-button>
                <headless-button>
                  dummy3
                </headless-button>
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
                <headless-button @click="testData.dialogOpen2 = true">
                  Open 2nd dialog
                </headless-button>
                <headless-dialog
                  v-model="testData.dialogOpen2"
                  style="background-color:#00000080;display:flex; justify-content:center; align-items:center;"
                >
                  <dialog-content style="background-color:#fff">
                    <headless-button @click="testData.dialogOpen2 = false">
                      Close 2nd dialog
                    </headless-button>
                  </dialog-content>
                </headless-dialog>
              </accordion-content>
            </headless-accordion>
          </dialog-content>
        </headless-dialog>
      </headless-tab>
      <!-- </transition-group> -->
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
      dialogOpen2: false
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
      testError
    };
  }
});
</script>
<style>
@import url(https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css);

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
