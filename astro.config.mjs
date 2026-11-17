import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
    output: "server",
    adapter: node({ mode: "standalone" }),
    server: {
        host: 'localhost',
        port: 4321,
    },
    // vite: {
    //     server: {
    //         https: {
    //             key: fs.readFileSync('./certs/localhost-key.pem'),
    //             cert: fs.readFileSync('./certs/localhost.pem'),
    //         }
    //     }
    // }
});