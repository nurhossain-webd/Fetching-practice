import { useMutation } from "@tanstack/react-query";

interface NewProduct {
  title: string;
  price: number;
}

const addProduct = async (product: NewProduct) => {
  const response = await fetch(
    "https://dummyjson.com/products/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
};

export default function App() {
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: addProduct,
  });

  const handleAddProduct = () => {
    mutate({
      title: "iPhone 16",
      price: 999,
    });
  };

  return (
    <div>
      <button
        onClick={handleAddProduct}
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Product"}
      </button>

      {isSuccess && <p>Product added successfully!</p>}

      {isError && <p>Error: {error.message}</p>}
    </div>
  );
}