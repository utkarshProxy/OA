# Rebuild the section as an AI orchestration ecosystem

Replace the numbered six-step grid with one visual system centered on an OBOU AI orchestrator. This is not a timeline or process diagram: it shows information and work moving through the business at the same time.

## Composition

- **Center:** a large, distinctive AI orchestrator “brain” built from a dense network of small nodes, paths, signals, and status marks. It should feel intelligent and active without using a generic brain icon.
- **Incoming activity:** sources feed toward the orchestrator from different directions:
  - phone call from a new lead → voice agent
  - social likes, comments, and messages
  - email and enquiry data
  - documents and business information
- **Connected business systems:** CRM, calendar, inbox, accounting, and internal tools exchange information with the orchestrator rather than sitting in a one-way chain.
- **Work produced:** visible outputs branch outward:
  - qualified lead and CRM update
  - follow-up email
  - booked meeting
  - invoice and operations task
  - social response or content action
- **Business result:** a highlighted money path lands with the business owner, making the commercial outcome unmistakable.

## Visual language

- Keep the OBOU dark ink background and existing paper, coral, and acid-yellow palette.
- Use thin circuit-like connectors, small travelling data packets, compact labels, signal bars, and simple line icons.
- The central orchestrator gets the most visual weight. Inputs remain quieter; completed actions and revenue become brighter.
- Avoid cards, a literal numbered sequence, a stock brain illustration, a dashboard frame, gradients outside the brand palette, or technical jargon.
- Keep the current section label “The simple version”; replace the six-step copy with concise labels attached to the actual inputs, systems, and outputs.

## Motion

- Animate small packets from calls, social activity, email, and documents into the center.
- Pulse the orchestrator as it routes signals into CRM, email, invoicing, calendar, and operations.
- Show completed actions travelling outward, with the revenue path completing last.
- Pause or simplify movement when off-screen; present a fully connected static diagram when reduced motion is preferred.

## Responsive behavior

- Desktop uses a wide ecosystem with the orchestrator in the center, incoming sources on the left/top, systems around it, and business outputs on the right/bottom.
- Mobile keeps the orchestrator central and arranges compact input and output clusters around it in a tall composition. Reduce connector count and animation density without turning it into a list.

## Technical notes

- Rebuild `Story()` in `src/routes/index.tsx` as a semantic orchestration diagram with reusable node data for sources, systems, and outputs.
- Use inline SVG for connectors and simple icons, plus accessible text labels in the document structure.
- Add section-specific styles and token-based animation rules in `src/styles.css`; extend the existing responsive and reduced-motion rules.
- No new colors, fonts, dependencies, invented performance figures, or changes outside this homepage section.
- Verify the finished visual at desktop and mobile sizes, confirm there is no overlap or horizontal overflow, and run the existing build check.