# Crypto Checkout Component

This is a responsive, production-ready implementation of a Crypto Checkout experience using Next.js 16 and TailwindCSS.

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile.
- **Crypto-to-Cash Flow**: UI for converting crypto to fiat currency.
- **Input Validation**: Robust form validation using Joi schemas.
- **Custom Dropdowns**: Built-in custom token and wallet selectors.
- **Interactive States**: Hover effects, transitions, and focus states for better UX.
- **Clean Codebase**: Component-based architecture with TypeScript and reusable UI components.

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

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Validation**: Joi
- **Icons**: Lucide React

## Assumptions & Trade-offs

- **State Management**: Local state (`useState`) is used for managing form inputs, validation errors, and dropdown visibility within `CryptoCheckoutModal`. For a larger app with more complex global data requirements, a state management library like `zustand` or `redux` would be preferred.
- **Data Persistence**: This is a frontend-only implementation. Data for tokens, wallets, and banks is mocked (in `lib/data`). In a real application, this would be fetched from a backend API or Web3 provider.
- **Validation**: `Joi` is used for runtime validation of the form inputs to ensure data integrity before "submission", providing a robust layer often found in production-grade financial apps.
- **Modal Behavior**: The component is currently rendered directly on the page layout as requested. In a real application, this would likely be implemented as a proper Modal using a Portal or a Dialog primitive (like Radix UI) to overlay on top of other content.
- **UI Components**: Reusable components (Buttons, Inputs, Selects) are abstracted into `components/ui` to demonstrate a clean, scalable project structure.

## Project Structure

- `app/page.tsx`: Main entry point rendering the checkout modal.
- `components/CryptoCheckoutModal.tsx`: The core component containing the checkout logic, state, and validation.
- `components/ui/`: Directory containing reusable atomic components (Button, Input, CurrencyInput, etc.).
- `lib/data.ts`: Mock data definitions.
