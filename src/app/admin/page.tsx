// import Link from "next/link";

import { signOut } from "@/auth";

// import { LatestPost } from "@/app/_components/post";
// import { HydrateClient } from "@/trpc/server";
// import { auth } from "@/auth";

export default async function Home() {
  return (
    <div>
      admin
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </div>
  );
}
