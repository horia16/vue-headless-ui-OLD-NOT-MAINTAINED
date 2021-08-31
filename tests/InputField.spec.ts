import {ComponentPublicInstance, defineComponent, nextTick} from "vue";
import {mount, shallowMount} from "@vue/test-utils";
import {HeadlessButton, HeadlessForm, HeadlessInput, InputError, InputField} from "../src/entry.esm";

test("render slot properly", () => {
    const wrapper = shallowMount(HeadlessForm, {
        slots: {
            default: "<div>Test</div>",
        },
    });
    expect(wrapper.text()).toContain("Test");
});

test("no errors on submit", async () => {
    const Form = defineComponent({
        components: {
            InputField,
            HeadlessInput,
            InputError,
            HeadlessButton,
            HeadlessForm,
        },
        template: `
          <headless-form>
          <headless-input>
            <input-field/>
            <input-error/>
            <headless-button type="submit">Submit</headless-button>
            ",
          </headless-input>
          </headless-form>
        `,
    });

    const wrapper = mount(Form, {attachTo: "body"});

    await wrapper.find("button").trigger("click");
    await nextTick();
    const vm = wrapper.getComponent(HeadlessForm).vm as ComponentPublicInstance<{ errorCount: number }>;
    expect(vm.errorCount == 0).toBeTruthy();
});
