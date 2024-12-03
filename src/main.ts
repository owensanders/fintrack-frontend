import { createApp } from "vue";
import { createPinia } from "pinia";  // Import Pinia
import App from "./App.vue";
import "@/assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
