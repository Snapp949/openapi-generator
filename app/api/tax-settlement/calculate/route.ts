import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taxOwed, monthsDelinquent, reasonableCollectionPotential, calculationType } = body

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const principal = Number.parseFloat(taxOwed) || 0
    const months = Number.parseInt(monthsDelinquent) || 0
    const rcp = Number.parseFloat(reasonableCollectionPotential) || 0

    let calculation = {}

    switch (calculationType) {
      case "offer-compromise":
        const penaltyRate = 0.25 // 25% failure to pay penalty
        const interestRate = 0.06 // 6% annual interest

        const penalties = principal * penaltyRate
        const interest = principal * (interestRate * (months / 12))
        const total = principal + penalties + interest

        // Offer in Compromise calculation (simplified)
        const offerAmount = Math.max(rcp, principal * 0.1) // Minimum 10% of principal
        const savings = total - offerAmount

        calculation = {
          principalTax: principal,
          penalties,
          interest,
          total,
          offerAmount,
          savings,
          acceptanceProbability: rcp < principal * 0.2 ? "High" : rcp < principal * 0.5 ? "Medium" : "Low",
        }
        break

      case "payment-plan":
        const monthlyPayment = Number.parseFloat(body.monthlyPayment) || 0
        const planType = body.planType || "long-term"

        const setupFee = planType === "short-term" ? 0 : 149
        const planInterestRate = planType === "short-term" ? 0 : 0.06
        const paymentMonths = Math.ceil(principal / monthlyPayment)

        calculation = {
          monthlyPayment,
          paymentMonths,
          setupFee,
          interestRate: planInterestRate,
          totalWithInterest: principal * (1 + planInterestRate),
          planType,
        }
        break

      case "penalty-interest":
        const currentPenalties = principal * 0.25
        const currentInterest = principal * (0.06 * (months / 12))
        const projectedPenalties = principal * 0.25 * 1.5 // Projected growth
        const projectedInterest = principal * (0.06 * ((months + 12) / 12))

        calculation = {
          currentPenalties,
          currentInterest,
          projectedPenalties,
          projectedInterest,
          totalCurrent: principal + currentPenalties + currentInterest,
          totalProjected: principal + projectedPenalties + projectedInterest,
        }
        break

      default:
        throw new Error("Invalid calculation type")
    }

    return NextResponse.json({
      success: true,
      calculation,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Tax calculation API error:", error)
    return NextResponse.json({ error: "Failed to calculate tax settlement" }, { status: 500 })
  }
}
