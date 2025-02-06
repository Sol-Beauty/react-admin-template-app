import { redirect } from "react-router";

export async function clientLoader() {
  return redirect("/tools/dashboard");
}

export default function Component() {
  return null;
}
