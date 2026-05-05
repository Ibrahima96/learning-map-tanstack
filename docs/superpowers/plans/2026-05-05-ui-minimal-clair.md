# Minimal Clair UI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the student list and student form into a cleaner, more readable minimal interface with a shared visual language.

**Architecture:** Keep the existing TanStack route structure and upgrade the UI in place. Add a shared shell in the root document, simplify the header/footer, and make the student card and form the two reusable visual primitives that define the new look.

**Tech Stack:** React 19, TanStack Start, Tailwind CSS 4, shadcn/ui primitives, lucide-react.

---

### Task 1: Shared app shell

**Files:**
- Modify: `src/routes/__root.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update the root layout to render the shared header/footer**

```tsx
// Render the app shell around all routes.
```

- [ ] **Step 2: Simplify the header and footer visuals**

```tsx
// Keep the branding, theme toggle, and core navigation.
```

- [ ] **Step 3: Verify the layout still renders all routes**

Run: `npm run build`
Expected: build succeeds without route or import errors.

### Task 2: Students list

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `src/components/CardStudents.tsx`
- Modify: `types.d.ts`

- [ ] **Step 1: Replace the raw list with a structured hero and responsive card grid**

```tsx
// Show summary stats, a primary CTA, and a card grid.
```

- [ ] **Step 2: Turn the student card into a reusable data card**

```tsx
// Display name, age, class, and a subtle metadata footer.
```

- [ ] **Step 3: Fix the student card type**

```ts
// Rename the typoed global interface and add optional timestamps.
```

- [ ] **Step 4: Run a build check**

Run: `npm run build`
Expected: the home route compiles and the new card props type-check.

### Task 3: Student form

**Files:**
- Modify: `src/components/Form.tsx`
- Modify: `src/routes/students/form.tsx`

- [ ] **Step 1: Rework the form into a cleaner two-column page**

```tsx
// Use a calmer intro area and a tighter card layout for the fields.
```

- [ ] **Step 2: Tighten the form validation and button styling**

```tsx
// Make the required fields explicit and keep the submit state visible.
```

- [ ] **Step 3: Run a build check**

Run: `npm run build`
Expected: the form route compiles and the UI remains responsive.
