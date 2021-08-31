import {shallowMount} from "@vue/test-utils";
import {HeadlessButton} from "../src/entry.esm";

test("render slot properly", () => {
    const wrapper = shallowMount(HeadlessButton, {
        slots: {
            default: "<div>Test</div>",
        },
        props: {
            loading: false,
            label: "Should be overridden by the slot",
        },
    });

    expect(wrapper.text()).toContain("Test");
});

test("render loading slot", () => {
    const wrapper = shallowMount(HeadlessButton, {
        slots: {
            default: "<div class='slot'>Test</div>",
            loading: "<div class='slot-loading'>Loading</div>",
        },
        props: {
            loading: true,
            label: "Should be overridden by the slot",
        },
    });
    expect(wrapper.findAll(".slot-loading").length).toEqual(1);
});

test("render label", () => {
    const wrapper = shallowMount(HeadlessButton, {
        props: {
            loading: false,
            label: "Test Label",
        },
    });
    expect(wrapper.text() == "Test Label").toBeTruthy();
});
