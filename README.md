# TeslaVolt Investments

A responsive, front-end concept for electric-vehicle discovery and a sample mobility investment platform. Built with React, TypeScript, Vite, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Vite listens on `0.0.0.0:5173` so the development server can be reached from a forwarded Codespaces port. In VS Code, open the **Ports** tab, forward the port shown by Vite if it is not already forwarded, and open the forwarded address. If the default port is occupied, Vite automatically selects another port. To preview on your phone, set that port's visibility to **Public** if required by your Codespaces settings, then open its forwarded HTTPS address on your phone. Keep the Codespace running while previewing.

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Demo limitations

This repository contains a front-end prototype only. Sign-up and login do not create or authenticate accounts, forms do not transmit or persist personal data, and the dashboard contains fictional placeholder data. Administrator screens are demonstrations and are not protected. All displayed investment opportunities and financial figures are fictional examples, not offers, financial products, or advice. TeslaVolt is not authorized, affiliated with, or endorsed by Tesla, Inc.

## Chaport live chat

The floating support button opens the official Chaport web widget, loaded from Chaport's script. The public App ID from the supplied installation code is included as the default configuration.

1. Copy `.env.example` to `.env.local`.
2. Keep the included `VITE_CHAPORT_APP_ID` value, or replace it with the public App ID from your Chaport account if needed.
3. Restart the Vite development server or rebuild the site after changing the value.

The site loads Chaport's official widget script once and opens it from the floating button. Manage conversations from your Chaport account or its mobile app. The App ID is public and included in the frontend build; never put passwords or private API credentials in this variable. Chaport must be enabled for the site in your account for visitors to message you.

The vehicle-specific **INVEST IN THIS MODEL** button opens that same widget and displays a prepared, model-specific message to copy into the chat. Chaport's documented JavaScript API exposes an `open` method but no message-prefill method, so the visitor must paste and send the message themselves. The site does not send it automatically.

Vehicle range and acceleration figures are estimates for selected configurations; verify current, market-specific figures on each linked Tesla model page. The next-generation Roadster is shown as an announced vehicle, and its final production specifications, timing, availability, and pricing are not represented as confirmed.
