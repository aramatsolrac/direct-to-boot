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

    await waitFor(() => expect(button).toBeEnabled(), { timeout: 3000 });
    await screen.findByText(
      "Please click the button when you have arrived, One of our friendly staff will bring your order to you."
    );
  });

  it("shows a fallback call the store button", async () => {
    render(<DirectToBoot orderId="error-id" />);

    const a = screen.getByText("04 23 33");
    expect(a).toBeInTheDocument();
    expect(a).toBeDisabled();

    await waitFor(() => expect(a).toBeInTheDocument(), { timeout: 3000 });
    await screen.findByText(
      "Seems something went wrong, you can the following number to notify us instead."
    );
  });
});
