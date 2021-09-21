import { computed, onBeforeUnmount, ref, Ref } from "vue";
import { randomString } from "@/utils";

/**
 * Link a component to a given Ref Array, creating an unique id and the necessary events.
 * @param array
 */
export default function useArrayLink(array: Ref<Array<string>> | undefined | null) {
  // Create a random id
  const id: Ref<string> = ref(randomString());
  // If we do not have that id push it to the array
  if (!array?.value.find(x => x === id.value) && id.value) {
    array?.value.push(id.value);
  }
  // Get the index of element
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
