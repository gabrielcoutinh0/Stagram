export const getFocusableElements = (
  parent?: HTMLElement | null
): HTMLElement[] => {
  if (!parent) return [];

  return Array.from(
    parent.querySelectorAll(
      "a[href], button, input, textarea, select, details,[tabindex]"
    )
  )
    .filter(
      (el) =>
        el.getAttribute("tabindex") !== "-1" &&
        !el.hasAttribute("disabled") &&
        !el.getAttribute("aria-hidden")
    )

    .sort((a, b) => {
      const aIndex = Number(a.getAttribute("tabindex")) ?? 0;
      const bIndex = Number(b.getAttribute("tabindex")) ?? 0;
      if (aIndex === bIndex) return 0;
      if (aIndex === 0) return 1;
      if (bIndex === 0) return -1;
      return aIndex < bIndex ? -1 : 1;
    }) as HTMLElement[];
};
