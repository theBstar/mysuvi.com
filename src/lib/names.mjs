/**
 * Build the name fields getwaitlist list 21636 requires from an email address.
 *
 * The list rejects a signup missing first_name or last_name, but the approved
 * design has a single email field. Rather than inventing plausible-looking
 * names from the local part, the address itself goes in first_name and
 * last_name is an explicit placeholder — so nothing in the export can be
 * mistaken for a name the visitor actually gave.
 */
export const LAST_NAME_PLACEHOLDER = '-'

export function namesFromEmail(email) {
  return {
    firstName: String(email || '').trim(),
    lastName: LAST_NAME_PLACEHOLDER,
  }
}
