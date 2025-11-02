import { auth } from "@/firebase/Server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePassword from "./UpdatePassword";
import UpdateUserName from "./UpdateUserName";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) redirect("/");
  let decodedToken;
  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (err) {
    redirect("/");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === "password"
  ); // return a boolean

  return (
    <div className="max-w-4xl w-full mx-auto ">
      <h1 className="text-3xl font-semibold mb-3">My Account</h1>
      <div className="border rounded-md mt-3 p-4">
        <div className="text-gray-800 mb-3">
          <small>Email</small>
          <p>{decodedToken.email}</p>
        </div>

        {!!isPasswordProvider && (
          <div>
            <UpdatePassword />
          </div>
        )}
        <UpdateUserName/>
      </div>
    </div>
  );
}
