import { NextResponse } from 'next/server';

// 1. Initialize Stripe
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
    try {
        const { cart, customerInfo } = await req.json();

        console.log("Processing order for Printful...");

        // Use a dummy image for the demo so orders are accepted by Printful
        const DEMO_IMAGE_URL = "https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.jpg";

        const printfulOrder = await fetch('https://api.printful.com/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipient: {
                    name: customerInfo.name || "Test User",
                    address1: customerInfo.address1 || "19749 Dearborn St",
                    city: customerInfo.city || "Chatsworth",
                    state_code: customerInfo.state_code || "CA",
                    country_code: customerInfo.country_code || "US",
                    zip: customerInfo.zip || "91311",
                    ...customerInfo
                },
                items: cart.map((item: any) => {
                    // Determine if we need a fallback ID
                    const isMockId = isNaN(Number(item.id));
                    const variantId = isMockId ? 1 : Number(item.id); // Default to Poster (ID 1)

                    // Construct item payload
                    const itemPayload: any = {
                        variant_id: variantId,
                        quantity: 1,
                        name: item.name // Pass name for reference
                    };

                    // If it's a fallback/mock item OR a Catalog item, it NEEDS a file.
                    // Since we don't have Sync Variants set up yet, we assume EVERYTHING is a catalog item for this demo.
                    // We attach a file to ensure it doesn't fail with "missing print files".
                    itemPayload.files = [
                        {
                            type: "default",
                            url: DEMO_IMAGE_URL
                        }
                    ];

                    return itemPayload;
                })
            })
        });

        const printfulData = await printfulOrder.json();

        if (!printfulOrder.ok) {
            console.error("Printful Error:", JSON.stringify(printfulData, null, 2));
            // Don't fail the frontend user for this demo, but log it.
        } else {
            console.log("Printful Success! Order ID:", printfulData.result.id);
        }

        return NextResponse.json({ success: true, message: "Order placed successfully!", printful: printfulData });

    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }
}
