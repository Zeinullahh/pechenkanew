# Lessons Learned

## Lesson: Match Exact Design When Porting from Existing Repositories
- **Pattern**: When the user asks to integrate or showcase platforms from an existing repository, DO NOT invent a synthetic or simplified mockup design with generic Tailwind classes.
- **Rule**: Inspect the actual source code of the source repository (`globals.css`, component JSX, classes, colors, icons, layout structure, headers, borders, fonts). Copy and adapt the real UI components with their actual design system, gradients, SVG elements, and visual styling so that the sandbox is an authentic 1:1 replica of the real product, only stubbing out the backend API calls with client-side state.
