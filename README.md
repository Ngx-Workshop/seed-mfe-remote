# Angular MFE remote seed

An executable Angular MVVM starter for Ngx-Workshop. The example-document journey
demonstrates a stateless API client, singleton server-state store, scoped view
models, orchestration/presentation components, typed forms and recoverable errors.
Components use inline HTML/SCSS, BEM classes, OnPush and shell theme tokens.

Runtime features are grouped under src/app/features/<feature>; tests mirror the
source under testing/app. The [architecture guide](docs/architecture.md) describes
responsibilities and contracts. Start with [AGENTS.md](AGENTS.md),
[development](docs/development.md), [testing](testing/README.md) and the
[adoption checklist](docs/seed-adoption.md) when creating a product remote.

## Local checks

Use Node 22 and npm ci, then run:

```sh
npm run check:architecture
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

npm start serves on 4201; npm run dev:bundle watches/serves the federation bundle.
Supply a same-origin /api/example-crud gateway for real service requests. Unit tests
use HTTP doubles and need no backend. App/Routes exports, federation exposures and
hello-world route remain compatible with the original seed.

The [Spec Kit-inspired workflow](.specify/README.md) supplies principles and
spec/plan/tasks/handoff templates without requiring a CLI or slash commands.
See [MVVM starter handoff](specs/001-mvvm-starter/handoff.md) for verification.

Before adopting: rename identity/build/deployment targets, choose the correct
service contracts, replace the example feature, specify auth and register the
remote/API mapping with the platform owners. Review the copied deployment workflow
before pushing to main; it still targets the seed directory.
