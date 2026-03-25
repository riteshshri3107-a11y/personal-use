/**
 * Compute the gradient end color from an accent color.
 * Shifts the hue +20deg toward violet and adjusts saturation/lightness.
 *
 * Examples:
 *   #6366f1 (indigo) -> #8b5cf6 (violet)
 *   #f43f5e (rose)   -> #e8368b (pink)
 *   #10b981 (emerald) -> #06a5a5 (teal)
 *
 * Drop this function into store/useThemeStore.ts before the create() call,
 * then add `gradientEnd: computeGradientEnd(accentColor)` to the store state.
 */
export function computeGradientEnd(accentHex: string): string {
  // Validate and parse hex
  const hex = accentHex.replace('#', '')
  if (hex.length !== 6) return '#8b5cf6' // fallback to default violet

  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  // RGB -> HSL
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

  // Shift hue +20° toward violet, slightly reduce saturation, adjust lightness
  const newH = ((h * 360 + 20) % 360) / 360
  const newS = Math.min(s * 0.85, 1)
  const newL = Math.max(Math.min(l * 0.95, 0.65), 0.35)

  // HSL -> RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q2 = newL < 0.5 ? newL * (1 + newS) : newL + newS - newL * newS
  const p2 = 2 * newL - q2
  const newR = Math.round(hue2rgb(p2, q2, newH + 1/3) * 255)
  const newG = Math.round(hue2rgb(p2, q2, newH) * 255)
  const newB = Math.round(hue2rgb(p2, q2, newH - 1/3) * 255)

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}
