import Link from "next/link";

export default function LearnMore() {
  return (
    <div>
      <h1>Hello, Learn More Page!</h1>
      <p>Find out more about the 2023 season.</p>
      <Link href="/interest">Express Interest</Link>
    </div>
  );
}
