# Fix: `t.gradientEnd` ReferenceError across 52 files

## Root Cause

During CR-014 Phase 17, a global find-and-replace changed `#8b5cf6` to `${t.gradientEnd}`
across 52 files. In all 50 TSX page/component files, `t` is `useThemeStore()`:

```tsx
const t = useThemeStore()
```

The problem: `gradientEnd` was added to `lib/theme.ts` (`getThemeTokens()` function) but
**never added to the Zustand store** in `store/useThemeStore.ts`. So `t.accent` works fine
but `t.gradientEnd` is `undefined` — and in some compiled scopes causes a `ReferenceError`.

## Affected Files (52 total)

### Components (3)
- `components/ChatBot.tsx` (3 occurrences)
- `components/TopNav.tsx` (1 occurrence)
- `components/ThreadedComments.tsx` (2 occurrences)

### Pages (47)
- `app/(main)/group-hire/page.tsx` (3)
- `app/(main)/subscription/page.tsx`
- `app/(main)/disputes/page.tsx`
- `app/(main)/business/page.tsx`
- `app/auth/callback/page.tsx`
- `app/(main)/invoices/page.tsx`
- `app/(main)/learn/page.tsx`
- `app/(main)/marketplace/my-listings/page.tsx`
- `app/(main)/promotions/page.tsx`
- `app/(main)/family/page.tsx`
- `app/(main)/events/page.tsx`
- `app/(main)/wellness/page.tsx`
- `app/(main)/admin/page.tsx`
- `app/(main)/deto/page.tsx`
- `app/(main)/qr-verify/page.tsx`
- `app/(main)/safety/page.tsx`
- `app/(main)/news/page.tsx`
- `app/(main)/compare/page.tsx`
- `app/(main)/wallet/page.tsx`
- `app/(main)/buddylist/page.tsx`
- `app/(main)/calendar/page.tsx`
- `app/(main)/home/page.tsx`
- `app/(main)/marketplace/page.tsx`
- `app/(main)/voice-commerce/page.tsx`
- `app/(main)/reels/page.tsx`
- `app/(main)/profile/page.tsx`
- `app/(main)/community/page.tsx`
- `app/(chat)/chat/[id]/page.tsx`
- `app/(main)/worker/[id]/page.tsx`
- `app/(main)/jobplace/map/page.tsx`
- `app/(auth)/login/page.tsx`
- `app/(main)/netyard/page.tsx`
- `app/(main)/admin/features/page.tsx`
- `app/(main)/marketplace/create/page.tsx`
- `app/(main)/social-analytics/page.tsx`
- `app/(main)/friends/page.tsx`
- `app/(main)/profile/edit/page.tsx`
- `app/(main)/shopping/page.tsx`
- `app/(main)/buddy-groups/page.tsx`
- `app/(main)/admin/moderation/page.tsx`
- `app/(main)/jobplace/job/[id]/page.tsx`
- `app/(main)/settings/parental/page.tsx`
- `app/(main)/entertainment/page.tsx`
- `app/(main)/professional/page.tsx`
- `app/(main)/admin/infrastructure/page.tsx`
- `app/(main)/marketplace/listing/[id]/page.tsx`
- `app/(main)/admin/kill-switches/page.tsx`

### Test files (2)
- `tests/e2e.test.js`
- `tests/e2e-report-2026-03-24.json`

---

## Fix: Add `gradientEnd` to the Zustand Theme Store

### Step 1: Add the `computeGradientEnd` helper

In `store/useThemeStore.ts`, add this helper function (before the store creation):

```typescript
/**
 * Compute the gradient end color from an accent color.
 * Shifts the hue +20deg toward violet and adjusts lightness.
 * Default: #6366f1 (indigo) -> #8b5cf6 (violet)
 */
function computeGradientEnd(accentHex: string): string {
  // Parse hex to RGB
  const hex = accentHex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  // RGB to HSL
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  // Shift hue +20deg (toward violet), slightly reduce saturation, adjust lightness
  let newH = (h * 360 + 20) % 360
  let newS = Math.min(s * 0.85, 1)
  let newL = Math.max(Math.min(l * 0.95, 0.65), 0.35)

  // HSL to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = newL < 0.5 ? newL * (1 + newS) : newL + newS - newL * newS
  const p = 2 * newL - q
  const newR = Math.round(hue2rgb(p, q, newH/360 + 1/3) * 255)
  const newG = Math.round(hue2rgb(p, q, newH/360) * 255)
  const newB = Math.round(hue2rgb(p, q, newH/360 - 1/3) * 255)

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}
```

### Step 2: Add `gradientEnd` to the store state

In the Zustand `create()` call, add `gradientEnd` as a derived property.

Find where `accent` is defined/computed in the store and add `gradientEnd` next to it:

```diff
  // In the store state definition
  accent: accentColor,
+ gradientEnd: computeGradientEnd(accentColor),
```

And in the `setAccentColor` action (or wherever `accent` is updated), also update `gradientEnd`:

```diff
  setAccentColor: (color: string) => set({
    accentColor: color,
    accent: color,
+   gradientEnd: computeGradientEnd(color),
  }),
```

### Step 3: Add TypeScript type

In the store's type interface, add:

```diff
  accent: string
+ gradientEnd: string
```

---

## Alternative Quick Fix (if you want minimal changes)

If you don't want to add the computation, just hardcode the default:

```diff
  accent: accentColor,
+ gradientEnd: '#8b5cf6',
```

And update it in `setAccentColor`:

```diff
  setAccentColor: (color: string) => set({
    accentColor: color,
    accent: color,
+   gradientEnd: '#8b5cf6', // TODO: compute dynamically
  }),
```

This restores the original `#8b5cf6` value but keeps it in the theme system.

---

## Test File Fixes

The 2 test files also need updating:

### `tests/e2e.test.js`
The test assertions likely check for `#8b5cf6` in gradient styles. Update to check for
`t.gradientEnd` or the computed value.

### `tests/e2e-report-2026-03-24.json`
This is a test report — it will auto-regenerate after the fix.

---

## Verification

After applying the fix:

1. Run `npm run build` — should compile without errors
2. Visit any page (e.g., `/home`, `/marketplace`, `/admin`) — gradient buttons should render
3. Check browser console — no `ReferenceError: t is not defined`
4. Change accent color in settings — gradients should update dynamically
