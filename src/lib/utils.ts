/**
 * Smoothly scrolls to a section by its ID
 * @param sectionId - The ID of the section to scroll to
 */
export function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
