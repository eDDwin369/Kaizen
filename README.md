# Kaizen Partner Portal 🚀

Kaizen is a premium, high-fidelity React-based Partner Portal Dashboard built on Vite. The application allows finance brokers and loan partners to browse, search, evaluate, and purchase pre-qualified loan client leads, featuring live wallet updates, dynamic transaction receipt generation, and a mathematical eligibility score gauge.

---

## 🌟 Key Features

1. **Dashboard Stats Grid**: Displays pre-computed lead counts (Total, Approved, Pending, and New) dynamically synchronized with active list states.
2. **Dynamic Filtering, Sorting & Search**: Supports real-time text matching, multiple category selections (Lead Status, Lead Type, State Location), and dual-directional sort parameters (ID, Price, Score).
3. **Smart Pagination Engine**: Generates a standard paging range (`<< < 1 2 3 ... 16 > >>`) dynamically updating with lead counts and customizable page-size selectors.
4. **Custom SVG Radial Gauge Component**: A lightweight, mathematically generated semi-circle gauge. Features include:
   - Dynamic trigonometric coordinates (`polarToCartesian`, `describeArc`).
   - Standard segmented intervals (Red, Yellow, Orange, Green) with uniform $9.0^\circ$ visual spacing.
   - Concentric dotted internal track lines.
   - Color-matched pointer knob with a soft CSS-blurred radial glow.
5. **Wallet Transaction Flow**: Supports automatic balance deduction, receipt invoicing tables, and real-time category updates.

---

## 🛠️ Technical Stack & Dependencies

- **Core**: React v19, JavaScript (ES6+), HTML5.
- **Build System**: Vite v8.
- **Styling**: Vanilla CSS utilizing custom HSL color variables and layout design tokens (no Tailwind or UI libraries, giving 100% control over design fidelity).
- **Icons**: Lucide React.
- **Type Checking**: Prop-Types (added for robust runtime prop validation).

---

## 🏗️ Architectural & Clean Code Highlights

### 1. Shared Utility Layer
Duplicated formatter algorithms are extracted into a unified module at [formatters.js](file:///Users/edwin/Desktop/kaizen/src/utils/formatters.js):
* `formatCurrency(val)`: Formats numeric currency inputs with no decimals (e.g. `$580`).
* `formatBalance(val)`: Formats decimal numeric currency balances (e.g. `$4,250.00`).

### 2. Memoization & Performance
* **Re-render Prevention**: Pure UI components like [LeadCard](file:///Users/edwin/Desktop/kaizen/src/components/LeadCard.jsx) and [StatsCard](file:///Users/edwin/Desktop/kaizen/src/components/StatsCard.jsx) are wrapped in `React.memo` to block redundant repaints when the parent Dashboard page processes keystrokes in the search bar.
* **Calculated States**: Standard Javascript operations (filtering, sorting) are memoized using `useMemo` in [Dashboard.jsx](file:///Users/edwin/Desktop/kaizen/src/components/Dashboard.jsx) to prevent recalculating arrays on every render.

### 3. Type Checking
Type safety and interface rigor are guaranteed at runtime via comprehensive `PropTypes` validation mappings on every component.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) installed.

### Installation
Clone the repository and install the dependencies:
```bash
# Install package dependencies
npm install
```

### Run Locally (Development Server)
Launch the local dev environment with hot reloading (HMR):
```bash
# Run Vite development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

### Production Build & Preview
Compile the asset bundle and check file sizes:
```bash
# Build the production bundle
npm run build

# Preview the built production code locally
npm run preview
```
