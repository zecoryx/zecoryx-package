# Zecoryx CLI — Refactored

## Project Essence

Zecoryx CLI is a professional-grade project generator designed to automate the scaffolding of modern web applications, backend services, and Telegram bots. It eliminates the repetitive setup work by providing battle-tested templates and a streamlined CLI experience.

## Architecture Deep Dive

The codebase has been refactored into a **Layered Architecture** combined with the **Repository Pattern**. This separation of concerns ensures that each part of the system has a single responsibility:

- **Controllers:** The `CliController` handles all user interactions and CLI logic. It is responsible for parsing input and displaying feedback, delegating all business logic to the service layer.
- **Services:** The `GeneratorService` contains the core business rules. It validates directory states, orchestrates the generation process, and manages the flow of data between the controller and the repository.
- **Repositories:** The `FsRepository` serves as the data access layer. It abstracts all file system operations, shell executions (like Git and Package Managers), and template reading. This makes the system more testable and easier to migrate to different storage solutions if needed.
- **Config & Constants:** All application-wide settings and magic strings are centralized in `config/` and `constants.js`, ensuring consistency and making the system easier to configure.

## Tech Stack & Rationale

- **Node.js:** The primary runtime for its vast ecosystem and ease of use in CLI tools.
- **Chalk & Figlet:** Chosen for providing a high-quality, professional visual experience in the terminal.
- **fs-extra:** Used for simplified and robust file system operations over the native `fs` module.
- **execa:** Provides a powerful and safe way to execute shell commands like `git init` and `npm install`.
- **Inquirer/Prompts:** (via `prompts.js`) Facilitates an interactive and intuitive user experience.

## Core Logic Flow

1. **Startup:** `main.js` initializes the dependency tree (Repo -> Service -> Controller).
2. **Input:** `CliController` triggers the interactive prompts to gather project requirements.
3. **Validation:** `GeneratorService` validates the destination directory and input parameters.
4. **Execution:** `GeneratorService` orchestrates the creation of the project structure, copying templates, and initializing tools like Git.
5. **Data Persistence:** `FsRepository` performs the actual file writes and shell commands.
6. **Completion:** `CliController` displays a success message with follow-up instructions.

## Edge Case Handling

- **Empty Directory Check:** The system prevents overwriting non-empty directories to avoid data loss.
- **Paranoid Error Handling:** Every layer is wrapped in `try-catch` blocks with descriptive error messages.
- **Resource Existence:** Templates and destination paths are verified before any operation is attempted.
- **Git Failures:** Git initialization is handled gracefully; if Git is not installed, the process continues without crashing.
- **Async Safety:** `Promise.all()` is used for independent operations (like copying multiple skill files) to maximize performance.

## Future Scalability

- **Plugin System:** The service-oriented architecture allows for easy addition of new project templates as plugins.
- **Remote Templates:** The `FsRepository` can be extended to fetch templates from remote repositories (GitHub/S3) instead of local files.
- **Telemetry:** A new service layer can be added to track usage and gather feedback for further improvements.
- **Enhanced Validation:** Integration of schema-based validation for configuration files.

---

_Built with by (zecoryx)_
