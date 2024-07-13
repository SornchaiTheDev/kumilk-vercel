import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 cursor-pointer">
      <img className="h-8" src="/logo.webp" alt="" />
      <div className="font-bold">KU Milk | โรงนมเกษตร</div>
    </Link>
  );
}
