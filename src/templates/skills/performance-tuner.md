# Performance Tuner — Master Optimization Prompt

**Role:** Senior Full-Stack Performance Engineer & Infrastructure Architect.  
**Objective:** Analyze and refactor the provided project for maximum speed, minimal latency, and optimal resource utilization. Target: Lighthouse 100 (Frontend) and high-throughput (Backend).

---

## REQUIRED INPUT

Paste your full project source code. Include frontend components, backend routes/services, database query files, and `package.json`.

---

## 1. FRONTEND OPTIMIZATION (Web Vitals Focus)

**Tree-Shaking & Bundle Size:**
- Eliminate all unused exports and dead code.
- Replace heavy libraries with lightweight alternatives (e.g., `date-fns` instead of `moment`).

**Code Splitting:**
- Implement aggressive lazy loading for all routes and heavy components.
- Ensure the initial bundle is minimal — only load what is needed on first render.

**Rendering:**
- Optimize for FCP (First Contentful Paint) and LCP (Largest Contentful Paint).
- Minimize re-renders using `useMemo` and `useCallback` only where calculation costs are genuinely high.

**Assets:**
- Recommend WebP format for all images.
- Implement placeholder strategies (blur-up or skeleton) to prevent CLS (Cumulative Layout Shift).

---

## 2. BACKEND & DATABASE OPTIMIZATION

**Database Queries:**
- Analyze and rewrite queries for maximum efficiency.
- Add indexing for all searchable and frequently filtered fields.
- Eliminate N+1 query problems using joins, `include`, or batching.

**Caching Strategy (Dual-Layer):**
- Use **Redis** for frequently accessed, shared data across requests.
- Use **in-memory caching** for short-lived, high-frequency data within a single process.

**CPU-Intensive Tasks:**
- Offload heavy operations (data processing, image manipulation, large JSON parsing) to **Worker Threads** to keep the Node.js Event Loop free.

---

## 3. DATA TRANSFER & API

**Sparse Fieldsets:**
- Modify API endpoints to support selective field fetching.
- Never send the entire object when only 2–3 fields are needed by the client.

**Payload Minimization:**
- Strip all unnecessary metadata from JSON responses.
- Use short, meaningful keys if payload size is critical (e.g., high-frequency mobile requests).

---

## 4. CODE ARCHITECTURE

**Layered Structure:** Follow Controllers → Services → Repositories separation. (Architecture details: see `clean-coder.md`)

**Parallel Execution:** Every independent I/O operation (DB, Cache, External APIs) MUST run in parallel using `Promise.all()`. Sequential `await` chains are a red flag.

---

## 5. ERROR HANDLING

- Implement `try-catch` blocks at every layer.
- Handle edge cases: null pointers, request timeouts, database connection drops.
- Never let unhandled promise rejections crash the server.

---

## DELIVERABLE

**1. Refactored Source Code**  
All optimized files with full content.

**2. Performance-Driven README.md (80+ lines)** containing:
- System Overview: Core purpose and performance goals.
- Architecture Specifications: Layered + Repository + Worker Threads structure.
- Optimization Log: Specific techniques applied (tree-shaking, indexing, Redis strategy, etc.).
- Performance Metrics: Target Web Vitals scores and RPS (Requests Per Second) benchmarks.
