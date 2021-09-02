import { randomString } from "@/utils";
import { computed, onBeforeUnmount, Ref, ref } from "vue";

/**
 * Links a certain tab or tab-switch to their respective arrays, creating an unique id and the necessary events.
 * @param array - either the tabs or switches array
 */
export function useTabLink(array: Ref<Array<number | string>> | undefined) {
  // Create a random id
  const id: Ref<string> = ref(randomString());

  // If we do not have that id push it to the array
  if (!array?.value.find(x => x === id.value) && id.value) {
    array?.value.push(id.value);
  }
  // Get the index of  the tab/switch in the array
  const index = computed(() => {
    if (array) {
      const index = array.value.findIndex(x => x == id.value);
      if (index != null || index != undefined) {
        return index;
      }
      return -1;
    }
    return -1;
  });
  // Make sure we remove the element from the array in case we unmount it
  onBeforeUnmount(() => {
    if (array) array.value = array.value.filter(x => x != id.value);
  });
  return { id, index };
}
