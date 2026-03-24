# Fix: Client-Side Exception on datore.website/home

## Root Cause

The Supabase client in `src/lib/supabase.ts` uses a **publishable key** (`sb_publishable_VJQmqpXug6S-En0TUCBgBw_HnP5QXyJ`) instead of the **legacy anon JWT key**. The `@supabase/gotrue-js@2.98.0` library bundled in the app does not have explicit support for the new publishable key format — it expects a JWT for the `Authorization: Bearer` header and for internal session management.

When the app loads on the client side:
1. `createClient()` initializes with the publishable key
2. `auth.onAuthStateChange()` fires and tries to recover/refresh the session
3. The GoTrue auth endpoint rejects the non-JWT key in the Authorization header
4. This causes an unhandled exception during the auth initialization flow
5. The `(main)/layout` has no `error.tsx` boundary, so Next.js shows the generic "Application error" page

## Fix 1: Replace Supabase Key (Critical)

In `src/lib/supabase.ts`, replace the publishable key with the legacy anon JWT key:

```diff
- const supabaseAnonKey = "sb_publishable_VJQmqpXug6S-En0TUCBgBw_HnP5QXyJ"
+ const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpY3FpZGFoemVzbHprYmlrdmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzc4OTAsImV4cCI6MjA4NzYxMzg5MH0.rnG2zGCuojWWBdEkzoP7PZOvSpTTtdi8prihjr1J6Gs"
```

Or better yet, move the key to an environment variable:

```diff
- const supabaseAnonKey = "sb_publishable_VJQmqpXug6S-En0TUCBgBw_HnP5QXyJ"
+ const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
```

Then set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Environment Variables to the legacy JWT key above.

## Fix 2: Add Error Boundary (Defensive)

Create `src/app/(main)/error.tsx` to prevent the generic "Application error" page:

```tsx
'use client'

export default function MainError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a16',
      color: '#f0f0f5',
      padding: 24,
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: 14, color: '#a0a0b8', marginBottom: 24, maxWidth: 400 }}>
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 14
        }}
      >
        Try Again
      </button>
    </div>
  )
}
```

## Fix 3: Protect Layout getSession Call

In `src/app/(main)/layout.tsx`, the `useEffect` that calls `getSession()` lacks a try/catch:

```diff
  useEffect(() => {
    (async () => {
+     try {
        const { data } = await getSession()
        const uid = data?.session?.user?.id
        if (uid) {
          updatePresence(uid)
          intervalRef.current = setInterval(() => updatePresence(uid), 300000)
        }
+     } catch (e) {
+       console.warn('[Layout] Session check failed:', e)
+     }
    })()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])
```

## Verification

After applying these fixes and redeploying:
1. Visit `datore.website/home` — should show loading skeleton then redirect to login (or show feed if authenticated)
2. Check browser console — should have no unhandled exceptions
3. Visit `datore.website/login` — should render the login form correctly
