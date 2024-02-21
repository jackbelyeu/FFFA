import Link from "next/link";
import Player from "./player/page";

export default function Page() {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/dashboard">Dashboard</Link>
      <Player />
    </div>
  );
}
