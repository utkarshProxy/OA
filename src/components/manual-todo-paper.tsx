import "./manual-todo-paper.css";

const tasks = [
  "Check new enquiries",
  "Look up customer details",
  "Find the last conversation",
  "Draft a personal reply",
  "Confirm the pricing",
  "Copy notes into the CRM",
  "Set a follow-up reminder",
  "Actually send the follow-up",
];

export function ManualTodoPaper() {
  return (
    <article className="manual-paper" aria-label="Manual workflow to-do list">
      <span className="manual-paper__tape" aria-hidden="true" />
      <header>
        <span className="manual-paper__label">01 / MANUAL</span>
        <h3>Today</h3>
        <p>Things I still need to do...</p>
      </header>
      <ul className="manual-paper__tasks">
        {tasks.map((task, index) => (
          <li key={task} className={index < 2 ? "is-done" : undefined}>
            <span className="manual-paper__checkbox" aria-hidden="true">
              {index < 2 ? "✓" : ""}
            </span>
            <span className={`manual-paper__task ${index === 3 ? "is-underlined" : ""}`}>
              {index < 2 ? <del>{task}</del> : task}
              {index < 2 && (
                <svg
                  className="manual-paper__strike"
                  viewBox="0 0 240 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 13 Q64 5 122 10 T238 7 M5 8 Q110 14 232 4" />
                </svg>
              )}
              {index === 3 && (
                <svg
                  className="manual-paper__underline"
                  viewBox="0 0 240 18"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8 Q24 13 49 8 T94 9 T146 7 T194 10 T237 6 M7 14 Q119 10 230 13" />
                </svg>
              )}
              {index === 4 && (
                <span className="manual-paper__questions" aria-label="Needs clarification">
                  ??
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="manual-paper__note">Don't forget this time!</p>
    </article>
  );
}
