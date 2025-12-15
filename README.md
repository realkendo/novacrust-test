# Crypto Checkout Component

This is a responsive, production-ready implementation of a Crypto Checkout experience using Next.js 15 and TailwindCSS.

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile.
- **Crypto-to-Cash Flow**: UI for converting crypto to fiat currency.
- **Custom Dropdowns**: built-in custom token and wallet selectors with icons.
- **Interactive States**: Hover effects, transitions, and focus states for better UX.
- **Clean Codebase**: Component-based architecture with TypeScript.

## Setup Instructions

1.  **Clone the repository** (if applicable) or download the source code.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: Custom SVGs

## Assumptions & Trade-offs

- **Icons**: Custom SVG icons were used instead of an icon library to strictly match the design without external dependencies.
- **State Management**: Local state `useState` is used for managing form inputs and dropdown visibility. For a larger app, I would use a more robust form library (like `react-hook-form`) or global state (like `zustand`).
- **Data**: Mock data is used for wallets and tokens. In a real application, this would likely come from an API or a Web3 provider.
- **Modal Behavior**: The component is currently rendered directly on the page layout as requested ("load in the home page"). In a real app, this would likely be a proper Modal using a Portal or a Dialog primitive (like Radix UI).

## Project Structure

- `app/page.tsx`: Main entry point rendering the checkout modal.
- `components/CryptoCheckoutModal.tsx`: The core component containing the checkout logic and UI.
