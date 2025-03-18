import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductSearch from "../ProductSearch";
import { ProductSearchResponse } from "../../types/Product";

// Mock fetch data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: async () => ({
      products: [
        {
          id: 1,
          title: "Mock Product 1",
          price: 100,
          thumbnail: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          title: "Mock Product 2",
          price: 200,
          thumbnail: "https://via.placeholder.com/150",
        },
      ],
      total: 2,
      skip: 0,
      limit: 10,
    }),
  })
) as jest.Mock;

describe("ProductSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input", () => {
    render(<ProductSearch />);
    expect(screen.getByPlaceholderText("Type to search...")).toBeInTheDocument();
  });

  test("fetches products on input change and displays results", async () => {
    render(<ProductSearch />);
    const input = screen.getByPlaceholderText("Type to search...");

    fireEvent.change(input, { target: { value: "lego" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/products/search?q=lego"
      );
    });

    expect(await screen.findByText("Mock Product 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Product 2")).toBeInTheDocument();
  });

  test("shows no results message if API returns empty array", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: async () => ({ products: [], total: 0, skip: 0, limit: 10 }),
      })
    ) as jest.Mock;

    render(<ProductSearch />);
    const input = screen.getByPlaceholderText("Type to search...");
    
    fireEvent.change(input, { target: { value: "unknown" } });

    await waitFor(() => {
      expect(screen.getByText("No products found")).toBeInTheDocument();
    });
  });

  test("handles API error", async () => {
    global.fetch = jest.fn(() => Promise.reject("API Error")) as jest.Mock;

    render(<ProductSearch />);
    const input = screen.getByPlaceholderText("Type to search...");
    
    fireEvent.change(input, { target: { value: "error" } });

    await waitFor(() => {
      expect(screen.getByText("Error fetching products")).toBeInTheDocument();
    });
  });

  test("shows loading state when fetching", async () => {
    let resolveFetch: (value: { json: () => Promise<ProductSearchResponse> }) => void = () => {};
    const fetchPromise = new Promise<{ json: () => Promise<ProductSearchResponse> }>((resolve) => {
      resolveFetch = resolve;
    });
    global.fetch = jest.fn(() => fetchPromise) as jest.Mock;

    render(<ProductSearch />);
    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(input, { target: { value: "lego" } });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    resolveFetch({
      json: async () => ({
        products: [
          {
            id: 1,
            title: "Mock Product 1",
            price: 100,
            thumbnail: "https://via.placeholder.com/150",
          },
        ],
        total: 1,
        skip: 0,
        limit: 10,
      }),
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
    expect(await screen.findByText("Mock Product 1")).toBeInTheDocument();
  });

  test("closes dropdown when clicking outside", async () => {
    render(<ProductSearch />);
    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(input, { target: { value: "lego" } });

    await waitFor(() => {
      expect(screen.getByText("Mock Product 1")).toBeInTheDocument();
    });
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText("Mock Product 1")).not.toBeInTheDocument();
    });
  });

  test("does not call fetch when query is empty", async () => {
    render(<ProductSearch />);
    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("No products found")).not.toBeInTheDocument();
    expect(screen.queryByText("Error fetching products")).not.toBeInTheDocument();
  });
});
