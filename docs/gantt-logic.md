# Gantt Chart Timeline Logic

This document explains how the Gantt chart timeline scale works in the resume application.

## Overview

The Gantt chart visualizes work experience across a 25-year timeline from **2000 to 2025**. Each position is represented as a horizontal bar positioned according to its start and end dates.

## Timeline Scale

### Base Configuration
- **Timeline Start**: Year 2000 (value = 0)
- **Timeline End**: Year 2025 (value = 25)
- **Total Span**: 25 years
- **Width Calculation**: Each unit = 4% of chart width (25 units × 4% = 100%)

### Timeline Markers
The chart displays 6 year markers at 5-year intervals:
- '00 (2000) - left: 0%
- '05 (2005) - left: 20%
- '10 (2010) - left: 40%
- '15 (2015) - left: 60%
- '20 (2020) - left: 80%
- '25 (2025) - right: 0%

## Date to Gantt Value Conversion

### Formula
```
gantt_value = (Year - 2000) + (Month - 1) / 12
```

### Month Decimal Values
| Month     | Value | Calculation |
|-----------|-------|-------------|
| January   | 0.00  | (1-1)/12    |
| February  | 0.08  | (2-1)/12    |
| March     | 0.17  | (3-1)/12    |
| April     | 0.25  | (4-1)/12    |
| May       | 0.33  | (5-1)/12    |
| June      | 0.42  | (6-1)/12    |
| July      | 0.50  | (7-1)/12    |
| August    | 0.58  | (8-1)/12    |
| September | 0.67  | (9-1)/12    |
| October   | 0.75  | (10-1)/12   |
| November  | 0.83  | (11-1)/12   |
| December  | 0.92  | (12-1)/12   |

**Note**: For ongoing positions marked as "Present", use December 2024 (24.92) or the current month.

## Examples

### Example 1: VA Position (May 2023 - Present)
```json
{
  "date_start": "2023-05",
  "date_end": "present",
  "gantt_start": 23.33,
  "gantt_end": 24.92
}
```

**Calculation:**
- Start: May 2023 = 23 + (5-1)/12 = 23 + 0.33 = **23.33**
- End: Dec 2024 = 24 + (12-1)/12 = 24 + 0.92 = **24.92**

### Example 2: TroyMD (May 2016 - May 2023)
```json
{
  "date_start": "2016-05",
  "date_end": "2023-05",
  "gantt_start": 16.33,
  "gantt_end": 23.33
}
```

**Calculation:**
- Start: May 2016 = 16 + 0.33 = **16.33**
- End: May 2023 = 23 + 0.33 = **23.33**

### Example 3: AAHS (November 2018 - March 2019)
```json
{
  "date_start": "2018-11",
  "date_end": "2019-03",
  "gantt_start": 18.83,
  "gantt_end": 19.17
}
```

**Calculation:**
- Start: Nov 2018 = 18 + (11-1)/12 = 18 + 0.83 = **18.83**
- End: Mar 2019 = 19 + (3-1)/12 = 19 + 0.17 = **19.17**

### Example 4: Wellmont (March 2010 - September 2014)
```json
{
  "date_start": "2010-03",
  "date_end": "2014-09",
  "gantt_start": 10.17,
  "gantt_end": 14.67
}
```

**Calculation:**
- Start: Mar 2010 = 10 + 0.17 = **10.17**
- End: Sep 2014 = 14 + 0.67 = **14.67**

### Example 5: UTMB (July 2006 - March 2010)
```json
{
  "date_start": "2006-07",
  "date_end": "2010-03",
  "gantt_start": 6.50,
  "gantt_end": 10.17
}
```

**Calculation:**
- Start: Jul 2006 = 6 + 0.50 = **6.50**
- End: Mar 2010 = 10 + 0.17 = **10.17**

## CSS Implementation

The Gantt chart uses CSS custom properties (variables) to position entries:

```css
.gantt-entry {
    width: calc((var(--end) - var(--start)) * 4%);
    margin-left: calc(var(--start) * 4%);
}
```

### HTML Usage
```html
<div class="gantt-entry admin"
     style="--start: 23.33; --end: 24.92;">
    <div class="entry-label">MD/IT: VA*</div>
</div>
```

## Label Positioning

To prevent label overlap, entries can have special positioning classes:

### Default Behavior
- **Odd entries**: Labels below the bar
- **Even entries**: Labels above the bar (applied via `:nth-child(even)`)

### Manual Override
Use the `gantt_position` field in the JSON:

```json
{
  "gantt_position": "top",     // Force label above
  "gantt_position": "bottom"   // Force label below
}
```

This adds the CSS class `.label-top` or `.label-bottom` to the entry.

## Category Colors

Entries are color-coded by category:

| Category       | CSS Class    | Color                       |
|----------------|--------------|----------------------------|
| Administrative | `.admin`     | rgba(52, 152, 219, 0.75)   |
| Clinical       | `.clinical`  | rgba(46, 204, 113, 0.75)   |
| Academic       | `.academic`  | rgba(155, 89, 182, 0.75)   |

## Quick Reference Calculator

For quick calculations, use this formula:

```
gantt_start = (start_year - 2000) + (start_month - 1) / 12
gantt_end = (end_year - 2000) + (end_month - 1) / 12
```

Round to 2 decimal places for consistency.

## Updating the Timeline

### When to Update
Update `gantt_start` and `gantt_end` values when:
1. Adding a new position
2. Correcting existing dates
3. Updating "Present" positions (recommended to update quarterly)

### Data File Location
All Gantt values are stored in:
```
frontend/data/roles.json
```

Each role object should include:
```json
{
  "gantt_start": <calculated_value>,
  "gantt_end": <calculated_value>,
  "gantt_label": "Short: Label",
  "gantt_position": "top" | "bottom" (optional)
}
```

## Common Pitfalls

1. **Month indexing**: Remember months are 1-12, but the formula uses (month - 1) / 12
2. **Decimal precision**: Use at least 2 decimal places (e.g., 23.33 not 23.3)
3. **Present positions**: Don't use 25.0 for present, use current month's value
4. **Overlapping labels**: Use `gantt_position` to manually adjust if needed

## Testing

After updating values, verify:
1. Bar appears in correct year range
2. Bar width matches duration
3. Label is readable and doesn't overlap
4. Timeline grid lines align with bars

View the chart in "Summary View" to see all positions visualized.
