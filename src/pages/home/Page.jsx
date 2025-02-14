import useTitle from "../../hooks/useTitle";

export default function Page() {
  useTitle('ホーム');

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}