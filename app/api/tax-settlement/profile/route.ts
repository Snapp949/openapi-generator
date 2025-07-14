import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock tax profile data
    const taxProfile = {
      totalOwed: 45750.0,
      penaltiesAndInterest: 8920.0,
      settledAmount: 12300.0,
      paymentPlanActive: true,
      complianceStatus: "warning",
      lastFilingDate: "2023-04-15",
      nextDueDate: "2024-04-15",
      activeSettlements: 2,
      taxYears: ["2023", "2022", "2021"],
      filingStatus: "married-joint",
      estimatedRefund: 0,
      outstandingReturns: 1,
    }

    return NextResponse.json(taxProfile)
  } catch (error) {
    console.error("Tax profile API error:", error)
    return NextResponse.json({ error: "Failed to fetch tax profile" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simulate processing tax settlement request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = {
      success: true,
      settlementId: `TS-${Date.now()}`,
      estimatedSavings: body.originalAmount * 0.3,
      nextSteps: ["Submit required documentation", "Await IRS review (60-90 days)", "Receive settlement decision"],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Tax settlement API error:", error)
    return NextResponse.json({ error: "Failed to process settlement request" }, { status: 500 })
  }
}
