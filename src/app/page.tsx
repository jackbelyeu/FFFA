import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Hello</h1>
      <h2>Organisers</h2>
      <Link href="/dashboard">Dashboard</Link>
      <br/>
      <Link href="/learnmore">Learn More</Link>
    </div>
  );
}
