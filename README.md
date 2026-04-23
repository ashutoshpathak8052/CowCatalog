# 🐄 Cow Catalog App

A React Native CLI application for managing livestock records. Built as a take-home assignment to demonstrate mobile architecture, local data persistence, and clean UI patterns without a backend.

---

## Features

| ID    | Feature              | Description                                                  |
|-------|----------------------|--------------------------------------------------------------|
| CA-01 | Cow List Screen      | Scrollable list of cows with ear tag, status badge, pen, and last event date |
| CA-02 | Search & Filters     | Real-time search by ear tag; filter chips for status and pen |
| CA-03 | Add Cow Screen       | Form with field validation, duplicate ear tag detection, and required field enforcement |
| CA-04 | Cow Detail Screen    | Full cow profile with a mock event timeline (weight checks, treatments, vaccinations) |

---

## Tech Stack

| Layer       | Choice                                      |
|-------------|---------------------------------------------|
| Framework   | React Native CLI 0.85 (bare workflow)       |
| Language    | JavaScript (ES2020+)                        |
| Navigation  | React Navigation v7 — Stack Navigator       |
| Storage     | `@react-native-async-storage/async-storage` |
| Icons       | `react-native-vector-icons` (Ionicons)      |
| Node        | >= 22.11.0                                  |

---

## Architecture & Approach

```
src/
├── components/       # Reusable UI primitives
│   ├── ChipPicker    # Multi-option filter selector
│   ├── EmptyState    # Zero-results placeholder
│   ├── FAB           # Floating action button
│   ├── FormField     # Labelled input wrapper
│   └── StatusBadge   # Colour-coded status pill
├── navigation/       # AppNavigator (Stack config + header options)
├── screens/          # CowListScreen, AddCowScreen, CowDetailScreen
├── services/         # cowService — business logic (create, search, filter)
├── storage/          # cowStorage (AsyncStorage I/O) + mockData seed
└── utils/            # constants, helpers (generateId), theme tokens
```

**Separation of concerns:**
- `storage/` owns all AsyncStorage reads/writes — nothing else touches the storage key directly.
- `services/` owns business rules (duplicate ear tag check, cow construction) and calls into `storage/`.
- `screens/` call `services/` only — they never touch AsyncStorage directly.
- `components/` are fully stateless and reusable across screens.

**State management:** Local `useState` + `useEffect` per screen. No global store was needed given the single-user, offline-only scope. Data is loaded on screen focus and passed down as props.

---

## Design Choices

**React Native CLI over Expo**
Full control over native modules. `react-native-vector-icons` and `react-native-gesture-handler` require native linking, which is straightforward with CLI and avoids Expo SDK version constraints.

**AsyncStorage**
Lightweight, zero-config, and ships as a well-maintained community package. Sufficient for a local-only dataset of this size. No SQLite overhead needed.

**Simple UI**
Intentional. The goal was to demonstrate architecture and data flow, not visual polish. A consistent theme file (`theme.js`) and a small set of reusable components keep the UI coherent without over-engineering it.

**Stack Navigation**
Linear flow (List → Detail, List → Add) maps naturally to a stack. No tabs or drawers were needed, keeping the navigation config minimal and readable.

---

## Offline Behavior

- On first launch, `MOCK_COWS` seed data is written to AsyncStorage under the key `@cow_catalog`.
- All subsequent reads pull from AsyncStorage — no network calls are made anywhere in the app.
- Cows added via the form are appended to the stored array and persist across app restarts.
- The event timeline on the detail screen uses shared `MOCK_EVENTS` (static) since there is no per-cow event log in this version.

---

## Trade-offs & Assumptions

- **No backend** — all data is device-local. Multi-device sync is out of scope.
- **Mock timeline** — all cows share the same `MOCK_EVENTS` list. A real implementation would store events per cow ID.
- **No edit/delete** — read and create only, as per assignment scope.
- **Validation scope** — ear tag uniqueness and required fields are enforced; no regex format validation on ear tag strings.
- **No pagination** — the list renders all cows. Acceptable for a small dataset; a production build would use `FlatList` with `onEndReached`.

---

## How to Run

**Prerequisites:** Node >= 22.11, Xcode (iOS) or Android Studio (Android), CocoaPods (iOS).

```sh
# 1. Install JS dependencies
npm install

# 2. iOS — install native pods (first run or after native dep changes)
bundle install
bundle exec pod install

# 3. Start Metro
npm start

# 4. Run on device/simulator (in a separate terminal)
npm run android
# or
npm run ios
```

---

## Demo Instructions

**Add a cow**
1. Tap the **+** FAB on the Cow List screen.
2. Fill in Ear Tag, Sex, Pen, Status, and Weight.
3. Tap **Save** — the new cow appears at the bottom of the list.
4. Try submitting with a duplicate ear tag to see the validation error.

**Search & filter**
1. Type an ear tag fragment (e.g. `ET-0`) in the search bar — the list filters in real time.
2. Tap a **Status** chip (e.g. `In Treatment`) to filter by status.
3. Tap a **Pen** chip (e.g. `Pen A`) to narrow further.
4. Clear chips to reset.

**View details**
1. Tap any cow row to open the Detail screen.
2. Review the profile card (sex, pen, weight, dates).
3. Scroll down to see the event timeline.

---

## Future Improvements

- **Backend integration** — REST or GraphQL API with JWT auth; replace AsyncStorage reads with API calls.
- **Per-cow event log** — store events by cow ID; allow adding new events from the detail screen.
- **Edit & delete** — swipe-to-delete on list rows; edit form pre-populated from existing record.
- **Pagination / infinite scroll** — `onEndReached` + cursor-based pagination for large herds.
- **Unit & integration tests** — Jest + React Native Testing Library for service logic and screen interactions.
- **Improved UI/UX** — skeleton loaders, pull-to-refresh, haptic feedback, dark mode support.
