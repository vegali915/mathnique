import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, email } = await req.json()

    const response = await fetch('https://api.polar.sh/v1/checkouts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.POLAR_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: process.env.POLAR_PRODUCT_ID,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?checkout_id={CHECKOUT_ID}`,
        customer_email: email,
        metadata: {
          user_id: userId,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Polar API error:', data)
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
    }

    return NextResponse.json({ url: data.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}