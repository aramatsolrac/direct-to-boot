import { createServer, Response } from "miragejs";

export function createMockServer() {
  return createServer({
    routes() {
      this.get("/api/order/:id", (schema, request) => {
        if (["error-id"].includes(request.params.id)) {
          return new Response(500, {}, { error: "something went wrong" });
        }
        return {
          id: request.params.id,
          status: "ready,",
        };
      });
    },
  });
}
