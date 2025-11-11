# Design Guidelines: Personal Account Management App

## Design Approach
**Selected Approach**: Design System Approach using Material Design
**Justification**: This is a utility-focused, information-dense productivity application where efficiency and learnability are paramount. The app requires standard UI patterns for forms, tables, and data visualization.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: Primary 219 69% 34% (deep blue), Secondary 219 20% 95% (light gray)
- Dark mode: Primary 219 69% 60% (lighter blue), Secondary 219 15% 15% (dark gray)

**Functional Colors:**
- Success: 142 76% 36% (green for profits)
- Warning: 38 92% 50% (amber for low stock alerts)
- Error: 0 84% 60% (red for losses/validation errors)

### B. Typography
- **Primary Font**: Inter (Google Fonts)
- **Headers**: Font weights 600-700, sizes 24px-32px
- **Body Text**: Font weight 400, size 16px
- **Data/Numbers**: Font weight 500, tabular numbers for financial data
- **Small Text**: 14px for labels and secondary information

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
- Consistent 6-unit gaps between major sections
- 4-unit padding for cards and containers
- 2-unit spacing for form elements and small components

### D. Component Library

**Core Components:**
- **Navigation**: Fixed sidebar with collapsible sections
- **Cards**: Elevated surfaces with subtle shadows for metrics and data groupings
- **Tables**: Striped rows, sortable headers, pagination for large datasets
- **Forms**: Floating labels, inline validation with error states
- **Charts**: Simple bar/line charts for financial trends using Chart.js
- **Buttons**: Primary (filled), secondary (outlined), and text variants

**Data Display:**
- **Metric Cards**: Large numbers with percentage changes and trend indicators
- **Transaction Lists**: Compact rows with icons, amounts in PKR formatting
- **Status Badges**: Colored pills for stock levels (High/Medium/Low)

### E. Functional Design Elements

**Currency Formatting**: All amounts display as "PKR 1,234.56" with proper comma separation

**Validation States:**
- Input borders turn red with error messages below for invalid data
- Success states with green borders for completed actions
- Real-time validation for item names (no empty strings) and amounts (positive numbers only)

**Data Tables:**
- Sortable columns with arrow indicators
- Row hover states for better scanning
- Compact spacing to show more data per screen

**Dashboard Layout:**
- 4-column metric cards at top showing key KPIs
- Two-column layout below with recent transactions and quick actions
- Responsive collapse to single column on mobile

**Navigation Structure:**
- Dashboard (default view)
- Purchases (add/view/edit purchase records)
- Sales (record sales and view history)
- Stock (inventory management with alerts)
- Reports (daily/monthly P&L with date filters)
- Cash Flow (in/out transaction tracking)

This design prioritizes data clarity, efficient workflows, and Pakistani Rupee financial formatting while maintaining a clean, professional appearance suitable for personal business management.