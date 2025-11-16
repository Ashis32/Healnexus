# HealNexus Design Guidelines

## Design Approach

**Selected Framework:** Material Design with Healthcare Dashboard References
- Primary inspiration: Apple Health, Fitbit Dashboard, Google Fit
- Rationale: Data-dense health monitoring requires proven UX patterns for medical metrics, real-time updates, and multi-device consistency
- Key principles: Clarity, accessibility, real-time responsiveness, medical-grade professionalism

---

## Typography

**Font Families:**
- Primary: Inter (via Google Fonts CDN) - excellent for data readability
- Monospace: JetBrains Mono - for numerical health metrics

**Hierarchy:**
- Dashboard Title (HealNexus): text-3xl md:text-4xl font-bold
- Section Headers: text-xl md:text-2xl font-semibold
- Metric Labels: text-sm font-medium uppercase tracking-wide
- Metric Values: text-4xl md:text-5xl font-bold (monospace)
- Secondary Info: text-sm md:text-base
- Graph Labels: text-xs md:text-sm

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Card padding: p-4 md:p-6
- Section spacing: space-y-6 md:space-y-8
- Grid gaps: gap-4 md:gap-6
- Container margins: mx-4 md:mx-8

**Responsive Grid:**
```
Mobile: Single column (grid-cols-1)
Tablet: 2 columns (md:grid-cols-2)
Desktop: 3-4 columns (lg:grid-cols-3, xl:grid-cols-4)
```

**Container Structure:**
- Max width: max-w-7xl mx-auto
- Full viewport height: min-h-screen
- Sections: py-6 md:py-8

---

## Component Library

### 1. Navigation Header
- Fixed top bar with backdrop blur: sticky top-0 backdrop-blur-md
- Logo + App name on left
- Export button with date picker on right
- Height: h-16 md:h-20
- Mobile: Hamburger menu for secondary actions

### 2. Live Metric Cards (Grid Layout)
Display all 12 parameters in card grid:
- Card: rounded-xl shadow-lg p-4 md:p-6
- Icon: w-8 h-8 (Heroicons - heart, activity, thermometer, etc.)
- Label: Small text above
- Value: Large monospace number with unit
- Status indicator: Small dot showing real-time status
- Sparkline: Micro-trend line below value (optional mini-graph)

Grid arrangement:
- 2 cards per row on mobile
- 3 cards per row on tablet
- 4 cards per row on desktop

### 3. Primary Graph Section
**Heart Rate & ECG Chart:**
- Full-width card: col-span-full
- Real-time line chart with smooth animation
- Time-based x-axis (last 30 seconds/minutes)
- Dual y-axes if needed
- Legend with current values
- Height: h-64 md:h-80

**Temperature Trend:**
- Half-width on desktop, full on mobile
- Line chart with time series
- Normal range indicator band
- Height: h-48 md:h-64

### 4. Motion Visualization Dashboard
**Accelerometer & Gyroscope:**
- 3D or multi-line chart showing X, Y, Z axes
- Toggle between accelerometer/gyroscope views
- Real-time updating
- Grid: md:grid-cols-2 (side by side on desktop)
- Height: h-64 each

### 5. Steps Counter
- Prominent circular progress indicator
- Center: Large step count
- Ring showing progress to daily goal (e.g., 10,000 steps)
- Size: w-48 h-48 md:w-64 md:h-64
- Positioned as featured card

### 6. Export Control Panel
- Date range picker: Start date + End date inputs
- Export format selector: Excel/CSV toggle
- Download button: Prominent, full-width on mobile
- Positioned in header or dedicated section
- Shows selected date range clearly

### 7. Real-time Status Indicator
- Top-right corner badge
- Pulsing animation when receiving data
- "Live" text with timestamp
- Firebase connection status

---

## Graph Specifications

**Chart Library:** Chart.js or Recharts (React-friendly)
- Line charts: Smooth curves, 2px stroke width
- Grid lines: Subtle, don't overwhelm data
- Tooltips: Show exact values on hover
- Responsive: Maintain aspect ratio
- Auto-scale: Adjust y-axis based on data range

**Update Frequency:**
- Real-time metrics: Update every 1-2 seconds
- Graphs: Smooth transitions, append new data points
- No jarring re-renders

---

## Mobile-First Considerations

**Touch Targets:**
- Minimum button size: h-12 w-12
- Card tap areas: Full card clickable for detail view
- Gesture support: Swipe between graph views

**Viewport Optimization:**
- Stack all sections vertically on mobile
- Collapse navigation to hamburger
- Graphs use full width
- Reduce padding/spacing proportionally

**APK-Ready Features:**
- Navigation matches Android patterns
- Back button support
- Bottom navigation bar option
- Splash screen placeholder
- Offline data caching indicator

---

## Accessibility

- ARIA labels for all graphs and metrics
- Keyboard navigation for export controls
- High contrast for metric values
- Screen reader announcements for real-time updates
- Focus indicators: ring-2 ring-offset-2

---

## Animation Strategy

**Minimal, Purposeful Motion:**
- Data update transitions: 300ms ease-in-out
- Loading states: Skeleton screens, not spinners
- Real-time pulse: Subtle glow on live indicator
- Graph animations: Smooth line drawing on mount
- NO decorative animations that distract from medical data

---

## Icons

**Library:** Heroicons (via CDN)
- Activity/Heart: heart icon
- ECG: chart-bar-square icon
- Temperature: thermometer icon
- Motion: arrows-pointing-out icon
- Steps: walking icon (custom if needed)
- Export: arrow-down-tray icon
- Calendar: calendar icon

---

## Special Considerations

**Medical Dashboard Standards:**
- Clear visual hierarchy: Critical metrics (heart rate) larger/more prominent
- Error states: Red indicators for abnormal readings with clear alerts
- Historical comparison: Show previous values or trends
- Data accuracy: Display precise decimals where medically relevant
- Privacy: Subtle patient ID or session info (if multi-user)

**Performance:**
- Lazy load historical data
- Virtualize long data lists
- Debounce real-time updates to prevent UI thrashing
- Optimize graph re-renders