import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <h1>Hello</h1>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div id="mail">
        <h1>Contact Organiser:</h1>
        <h2>Email: maltucker@gmail.com</h2>
      </div>
    </>
  );
}
