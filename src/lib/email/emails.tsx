export default function EmailTemplate({
  firstName,
  product,
}: {
  firstName: string;
  product: string;
}) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Thanks for trying {product}. We’re thrilled to have you on board.</p>
    </div>
  );
}
