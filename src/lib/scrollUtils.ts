/**
 * Utility function to smoothly scroll to a section by its ID
 * Works with Next.js and client-side navigation
 * Dispatches a custom event so parent components can handle tab switching
 */
export function scrollToSection(id: string) {
  // Dispatch custom event for components to listen to (e.g., to switch tabs)
  window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id } }));

  // Small delay to ensure tab is switched before scrolling
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 100);
}
