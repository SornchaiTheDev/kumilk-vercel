import { signOut } from "@/auth";

const SignOutButton = async () => (
  <form
    action={async () => {
      "use server";
      await signOut();
    }}
  >
    <button>Sign out</button>
  </form>
);

export default SignOutButton;
