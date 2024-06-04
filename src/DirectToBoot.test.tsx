import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { DirectToBoot } from "./DirectToBoot";
import { createServer, Server } from "miragejs";

let server: Server;

describe("Direct To Boot", () => {
  beforeEach(() => {
    server = createServer({});
  });

  afterEach(() => {
    server.shutdown();
  });

  it("renders a section for direct to boot", () => {
    render(<DirectToBoot orderId="order-id" />);
    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(
      screen.getByText("We are preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("enables button when the order is ready", async () => {
    server.get("/api/order/:id", (schema, request) => {
      return {
        id: request.params.id,
        status: "ready",
      };
    });

    render(<DirectToBoot orderId="order-id" />);
    expect(screen.getByText("Direct To Boot")).toBeInTheDocument();
    expect(
      screen.getByText("We are preparing your order...")
    ).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    // wait for
    await waitFor(() => expect(button).toBeEnabled(), { timeout: 3000 });
  });
});
