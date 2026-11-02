# TeslaVolt

A responsive automotive and home-energy discovery concept built with React, TypeScript, Vite, and Tailwind CSS. TeslaVolt is independent and is not authorized by, affiliated with, or endorsed by Tesla, Inc.

## Run locally

```bash
npm install
npm run dev
```

Vite listens on `0.0.0.0:5173` so the development server can be reached from a forwarded Codespaces port. In VS Code, open the **Ports** tab, forward the port shown by Vite if it is not already forwarded, and open the forwarded address. If the default port is occupied, Vite automatically selects another port. To preview on your phone, set that port's visibility to **Public** if required by your Codespaces settings, then open its forwarded HTTPS address on your phone. Keep the Codespace running while previewing.

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Product and account limitations

This repository contains a front-end concept only. Vehicle and energy forms prepare an enquiry for the visitor to review in Chaport; they do not place orders, reservations, or payments. Chaport's documented JavaScript API exposes an `open` method but no message-prefill method, so the visitor must copy the prepared enquiry into the chat and send it themselves. The site does not send it automatically.

Sign-up, login, and dashboard screens are demonstrations only; they do not create accounts, authenticate users, or connect to a backend. The admin preview is not protected and must not be used to manage real users or customer information.

The site has a separate investment-information page, but no investment service, product, or offer is configured. No company registration details, regulatory authorisation, investment terms, product-specific risk disclosures, complaint-handling process, Bybit wallet address, or supported USDT network have been supplied for an investment operator. The site makes no claim that an investment operator is licensed or regulated. Deposit and TXID fields are disabled; the site does not accept or store submissions, verify transactions, or approve deposits. It has no pending-deposit queue or investment transaction records. The member/admin screens are previews. Do not send funds or TXIDs, and do not treat this prototype as financial advice or an investment offer. Investment can result in loss, and crypto transfers may be irreversible.

## Chaport live chat

The floating support button opens the official Chaport web widget, loaded from Chaport's script. The public App ID from the supplied installation code is included as the default configuration.

1. Copy `.env.example` to `.env.local`.
2. Keep the included `VITE_CHAPORT_APP_ID` value, or replace it with the public App ID from your Chaport account if needed.
3. Restart the Vite development server or rebuild the site after changing the value.

The site loads Chaport's official widget script once and opens the same widget from the floating support button. Product enquiries prepare a message with the visitor's submitted details for them to review and send. Manage conversations from your Chaport account or its mobile app. The App ID is public and included in the frontend build; never put passwords or private API credentials in this variable. Chaport must be enabled for the site in your account for visitors to message you.

## Full Self-Driving video

The default player embeds Tesla's official **Full Self-Driving (Supervised)** YouTube upload using YouTube's privacy-enhanced embed player. It has controls, supports responsive inline playback, and does not autoplay. YouTube may restrict embedded playback based on the video's settings, region, or visitor's browser.

The official upload is a relevant FSD demonstration, but its available metadata does not verify every scene requested for the site, including the complete city-intersection and passenger sequence. To use your own verified video instead, set `VITE_FSD_VIDEO_URL` in `.env.local` to a browser-accessible video file URL and restart Vite. The configured video uses the native player and existing fallback.

Full Self-Driving (Supervised) requires active driver supervision and does not make a vehicle fully autonomous. Model images and vehicle specifications should be checked against the linked official Tesla pages for current market-specific information. The Roadster is presented as an announced prototype; its production design, specifications, timing, and availability are not confirmed. Its requested feature categories are explicitly identified as unverified concepts.

## Website images and credits

Vehicle galleries and energy product photography are included locally under `public/images`, so the site does not depend on third-party image servers at runtime. The vehicle and product photos are from Wikimedia Commons; their photographer and license links are shown with the relevant gallery or product image. The wind-turbine background is an Unsplash-licensed image. Custom local SVG artwork is used if a photo cannot load. These are illustrative images and do not imply product availability or endorsement.

The Roadster showcase uses official Tesla YouTube embeds for the Roadster, interface, event, and concept-feature videos. These play through YouTube's player; they are not downloaded, cropped, or rehosted. Embedding a video does not grant permission to reuse its stills or other media. No verified license for standalone official Roadster images was found, so no unofficial Roadster photographs are shown in the showcase. YouTube embed availability remains subject to Tesla's video settings and YouTube's playback restrictions.
