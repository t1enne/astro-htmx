import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
import UnoCss from "unocss/astro";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [lit(), UnoCss(), alpinejs()],
});
