# Lessons Learned

## Lesson: Match Exact Design When Porting from Existing Repositories
- **Pattern**: When the user asks to integrate or showcase platforms from an existing repository, DO NOT invent a synthetic or simplified mockup design with generic Tailwind classes.
- **Rule**: Inspect the actual source code of the source repository (`globals.css`, component JSX, classes, colors, icons, layout structure, headers, borders, fonts). Copy and adapt the real UI components with their actual design system, gradients, SVG elements, and visual styling so that the sandbox is an authentic 1:1 replica of the real product, only stubbing out the backend API calls with client-side state.

## Lesson: Fullscreen Modals and Shadcn Dialog Transforms
- **Pattern**: Shadcn UI `<DialogPrimitive.Content>` includes `fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]` by default for centered popups. If a modal is intended to be full-screen (`fixed inset-0 w-screen h-screen`), `translate-x-[-50%]` and `translate-y-[-50%]` cause the entire dialog to shift by 50vw and 50vh, hiding the top 75% of the modal off-screen.
- **Rule**: For full-screen or custom-anchored dialogs, always explicitly neutralize the default centering transform with `translate-x-0 translate-y-0 top-0 left-0` and `style={{ transform: "none", top: 0, left: 0, width: "100vw", height: "100vh" }}` so that the modal covers the viewport starting at (0, 0).
## Lesson: Modals in Scaled Embedded Sandboxes
- **Pattern**: When porting a standalone full-screen application into an embedded sandbox container (e.g. `1384px × 950px` with CSS scale transforms), portalling full-screen dialogs to `document.body` breaks them out of the sandbox container and causes them to cover the entire host webpage.
- **Rule**: Fullscreen views and drawers within sandboxed products must be rendered as in-container overlays (`absolute inset-0 z-40 w-full h-full`) rather than portalling to `document.body`. This guarantees they inherit the stage's scaling, coordinate system, and clipping boundaries without escaping onto the parent application.
