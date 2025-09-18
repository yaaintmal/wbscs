function Product({ product, description, price }) {
  return (
    <article>
      <h2>{product}</h2>
      <p>{description}</p>
      <p>{price}</p>
    </article>
  );
}
export default Product;
