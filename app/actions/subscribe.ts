"use server"

export async function subscribe(prevState: any, formData: FormData) {
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 600))

  const email = String(formData.get("email") || "").trim()
  const pkg = String(formData.get("pkg") || "").trim()

  if (!email || !email.includes("@")) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  // In production: persist to your database or mailing list provider
  // Here we just return success.
  return {
    ok: true,
    message: `Thanks! We added ${email}${pkg ? ` for package ${pkg}` : ""} to the waitlist.`,
  }
}
