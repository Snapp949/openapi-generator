import CreditDashboard from "./CreditDashboard"
import type { CreditProfile } from "./types" // Assuming CreditProfile is declared in a types file

interface SearchParams {
  userId?: string
}

export default async function CreditPage({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  // Fall back to a demo user when no userId is supplied
  const userId = searchParams?.userId ?? "demo"

  // NOTE: Relative fetch works on the server - it hits the same deployment
  const res = await fetch(`/api/credit/profile?userId=${userId}`, {
    // Always re-validate so users get fresh scores
    cache: "no-store",
  })

  if (!res.ok) {
    // Bubble up an error boundary on failure
    throw new Error("Failed to fetch credit profile")
  }

  // 🔑 Convert the Response into JSON **before** rendering anything
  const { data, lastUpdated } = (await res.json()) as {
    data: CreditProfile
    lastUpdated: string
  }

  return <CreditDashboard profile={data} lastUpdated={lastUpdated} userId={userId} />
}
