import { createApp } from "vue";
import Dev from "./serve.vue";
import "./rules";
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import VueHeadlessUi from "@/entry.esm";
const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://code.iconify.design/2/2.0.3/iconify.min.js";
document.head.appendChild(script);
const app = createApp(Dev);
app.use(VueHeadlessUi);

app.mount("#app");
