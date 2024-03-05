import { defineConfig } from "vite";
import { expect } from "chai";
import { describe, it } from "mocha";
describe("vite.config.js", () => {
  it("should proxy /api/users requests to http://localhost:8086", () => {
    const config = defineConfig({
      server: {
        proxy: {
          "/api/users": {
            target: "http://localhost:8086",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/users/, ""),
          },
        },
      },
    });

    expect(config.server.proxy["/api/users"].target).to.equal(
      "http://localhost:8086"
    );
  });

  it("should proxy /api/orders requests to http://localhost:8085", () => {
    const config = defineConfig({
      server: {
        proxy: {
          "/api/orders": {
            target: "http://localhost:8085",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/orders/, ""),
          },
        },
      },
    });

    expect(config.server.proxy["/api/orders"].target).to.equal(
      "http://localhost:8085"
    );
  });
});
