# Client Presentation Acceptance Checklist

This checklist defines the rigorous quality standards required before presenting the Care Connect prototype to clients and stakeholders.

---

## 1. Demonstration Journeys
- [ ] **Flow 1 (Caregiver Journey)**:
  - Landing page → Sign up / Demo sign in → View profile → Browse opportunities → Apply filters (category, location) → View opportunity details → Submit interactive application → View updated application status.
- [ ] **Flow 2 (Business / Facility Owner Journey)**:
  - Landing page → Demo sign in as Business Owner → View facility dashboard → Review active opportunities → Review submitted caregiver applications → Update application status.
- [ ] **Flow 3 (Volunteer Journey)**:
  - Landing page → Demo sign in as Volunteer/Student → Filter opportunities by volunteer/student credit → View shift details → Submit application → View participation status.
- [ ] **Flow 4 (Simulated Messaging Journey)**:
  - Access messaging interface → Select conversation from inbox → View message history with timestamped dialog → Send simulated message in thread → Verify unread count updates.

---

## 2. Content & Polish Standards
- [ ] **No Dead Ends**: Every button, navigation link, card, and tab leads to a purposeful view, modal, or informative feedback state. No unlinked buttons or unhandled routes.
- [ ] **No Lorem Ipsum**: All opportunity descriptions, healthcare qualifications, facility overviews, applicant profiles, and messages use realistic, high-quality, fictional healthcare domain content.
- [ ] **No Broken Images**: All avatars and facility banners use reliable SVG placeholders, clean icon avatars, or guaranteed local asset paths.
- [ ] **Zero Console Errors**: Running the app locally produces zero JavaScript runtime errors, hydration warnings, or unhandled promise rejections.

---

## 3. Responsive Adaptability
- [ ] **375px (Mobile viewport)**: Full mobile navigation drawer, single-column card grids, touch-friendly touch targets (min 44x44px), readable typography without horizontal scroll.
- [ ] **768px (Tablet viewport)**: Clean responsive header, 2-column opportunity grid, adaptive filter drawer or collapsible sidebar.
- [ ] **1024px (Laptop viewport)**: Persistent sidebar or top navigation, comfortable reading line lengths, well-balanced whitespace.
- [ ] **1440px (Desktop viewport)**: Constrained maximum content width (`max-w-7xl`), centered alignment, zero awkward layout stretching.

---

## 4. Accessibility & Interaction Floor
- [ ] **Keyboard Navigation**: All interactive elements (buttons, inputs, filters, tabs, dialogs) are navigable using `Tab` and `Shift+Tab`.
- [ ] **Visible Focus Rings**: Distinct, high-contrast focus rings on focused elements.
- [ ] **Accessible Contrast**: All text satisfies WCAG AA contrast standards (minimum 4.5:1 for normal text against white and slate backgrounds).
- [ ] **ARIA Labels**: Screen-reader accessible labels on icon-only buttons and modal close triggers.

---

## 5. UI Feedback States
- [ ] **Loading States**: Clean skeleton loaders displayed while fetching asynchronous mock data.
- [ ] **Empty States**: Clear, encouraging empty states when search/filters return zero results or when the inbox has no messages.
- [ ] **Error States**: Helpful, friendly error fallbacks with recovery actions.
