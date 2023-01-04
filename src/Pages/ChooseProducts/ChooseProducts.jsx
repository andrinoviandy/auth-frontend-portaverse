import Products from "./Products";

export default function ChooseProducts() {
  return (
    <>
      <div className="text-center">
        <p className="font-semibold text-4xl text-text1">
          Choose Our
        </p>
        <p className="font-semibold text-5xl py-2 text-primary3">
          PRODUCTS
        </p>
      </div>

      <Products />
    </>
  );
}
