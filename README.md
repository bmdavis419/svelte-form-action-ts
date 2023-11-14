## Actions + Zod

Super, super simple example showing how to efficiently parse formData in a form action.

The package you need is here: ```pnpm add zod-form-data```

## Files of note

- [src/routes/+page.svelte](src/routes/+page.svelte): The client side form (with progressive enhancement)
- [src/routes/+page.server.ts](src/routes/+page.server.ts): The server side action (with zod form checking)