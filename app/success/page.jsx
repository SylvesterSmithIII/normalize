// app/success/page.js
import { redirect } from "next/navigation";

export default function SuccessPage() {
  redirect("/"); // immediately forwards
  return null;   // prevents the export error
}
