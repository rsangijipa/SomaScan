## Legacy Isolation

This folder contains files removed from the active SomaScan runtime during structural stabilization.

### Moved here

- `legacy/components/BodyMap.tsx`
- `legacy/services/geminiService.ts`
- `legacy/experimental/models/`
- `legacy/experimental/scr/`
- `legacy/experimental/dist_snapshot/`
- `legacy/tests/test_engine.ts`
- `legacy/tests/test_output.txt`
- `legacy/tests/test_results.log`

### Why

- They do not participate in the current runtime flow.
- Some files contain outdated types, imports, or abandoned prototype paths.
- They remain available for reference without polluting the main build.
