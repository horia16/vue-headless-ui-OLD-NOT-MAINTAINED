import type { InjectionKey } from "vue";

export default function <T>(key: InjectionKey<T>) {
    const value = inject(key);
    if (value === undefined) {
        throw new Error(`Injection key ${key.toString()} is not defined`);
    }
    return value;
}