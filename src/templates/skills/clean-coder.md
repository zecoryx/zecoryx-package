# Clean Coder — Master Refactoring Prompt

**Role:** Senior Software Architect & Code Quality Engineer.  
**Task:** Refactor the provided codebase into a production-grade, layered system optimized for readability, maintainability, and long-term reliability.

---

## REQUIRED INPUT

Paste your full project source code below. Include all relevant files (controllers, services, models, routes, config).

---

## 1. CORE ARCHITECTURE RULES

**Layered Structure:** Reorganize the code into three strict layers:

- **Controllers:** Handle HTTP/Request logic only. No business logic here.
- **Services:** Contain all business logic. Orchestrate between controllers and repositories.
- **Repositories:** Strictly for database and data-access queries (Repository Pattern).

**Function Size:** Functions should be logically complete blocks of 15–30 lines. Avoid excessive fragmentation unless the logic is reused in more than 3 places.

**Centralized Management:**
- Move all magic strings, roles, and status codes to a `constants.js` (or `.ts`) file.
- Create a `config/` wrapper that validates and exports all `process.env` variables centrally.

**Validation:** Perform data validation within the service layer using `if/else` checks to ensure immediate and context-aware error responses.

---

## 2. PERFORMANCE

**Parallel Execution:** Use `Promise.all()` for all independent asynchronous operations. Prioritize parallel execution over sequential `await` chains wherever possible.

---

## 3. ERROR HANDLING

**Paranoid Approach:** Implement `try-catch` blocks at every layer. Anticipate and handle:
- `null` or `undefined` values
- Empty arrays or missing records
- Database connection timeouts
- Unexpected third-party API failures

---

## 4. CODING STYLE

**Naming:** Use concise, clear names (e.g., `getUser` instead of `fetchUserFromDatabaseObject`).

**Documentation:** Write self-documenting code. Minimize inline comments — the code should explain itself.

**Language:** Maintain the existing language (JS or TS). Do NOT migrate between them.

**Output:** Provide the full file content for every refactored file.

---

## DELIVERABLE

**1. Refactored Source Code**  
All modified files with full content.

**2. README.md (minimum 80 lines)** containing:
- Project Essence: Clear problem/solution statement.
- Architecture Deep Dive: Detailed explanation of the Layered + Repository pattern.
- Tech Stack & Rationale: Why these specific libraries were chosen.
- Core Logic Flow: Step-by-step data lifecycle.
- Edge Case Handling: List of implemented security/stability measures.
- Future Scalability: Technical roadmap for future growth.

> Keep it minimal, clean, no excessive icons or decoration.
