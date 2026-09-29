export const AUTOMATION_SETUP_TAG_KEY = "automationsetup";
export const AUTOMATION_DRAFT_ID_TAG_KEY = "automationdraftid";
<<<<<<< HEAD
=======
export const AUTOMATION_MATERIALIZED_DRAFT_ID_TAG_KEY =
  "automationmaterializeddraftid";
/** Existing automation opened in the setup page, rather than a new draft. */
export const AUTOMATION_EDIT_ID_TAG_KEY = "automationeditid";
>>>>>>> b1708a050 (feat: design the automation setup flow for drafts and testing (#17775))
export const AUTOMATION_SETUP_TAG_VALUE = "draft";

export function getAutomationDraftIdFromTags(
  tags: Record<string, string> | null | undefined,
): string | null {
  const draftId = tags?.[AUTOMATION_DRAFT_ID_TAG_KEY]?.trim();
  return draftId || null;
}

<<<<<<< HEAD
=======
export function getAutomationMaterializedDraftIdFromTags(
  tags: Record<string, string> | null | undefined,
): string | null {
  const draftId = tags?.[AUTOMATION_MATERIALIZED_DRAFT_ID_TAG_KEY]?.trim();
  return draftId || null;
}

export function getAutomationEditIdFromTags(
  tags: Record<string, string> | null | undefined,
): string | null {
  const automationId = tags?.[AUTOMATION_EDIT_ID_TAG_KEY]?.trim();
  return automationId || null;
}

>>>>>>> b1708a050 (feat: design the automation setup flow for drafts and testing (#17775))
export function hasAutomationSetupModeTag(
  tags: Record<string, string> | null | undefined,
): boolean {
  return tags?.[AUTOMATION_SETUP_TAG_KEY] === AUTOMATION_SETUP_TAG_VALUE;
}

export function buildAutomationSetupModeTags(
  tags: Record<string, string> | null | undefined,
): Record<string, string> {
  return {
    ...(tags ?? {}),
    [AUTOMATION_SETUP_TAG_KEY]: AUTOMATION_SETUP_TAG_VALUE,
  };
}

/**
 * Mark a conversation as the editor for one saved automation.
 *
 * The setup-mode tag opens the form. The edit id tells Save and Test
 * which automation to update, and is kept separate from draft ids so
 * editing does not resume an unrelated server draft.
 */
export function buildAutomationEditTags(
  tags: Record<string, string> | null | undefined,
  automationId: string,
): Record<string, string> {
  return {
    ...buildAutomationSetupModeTags(tags),
    [AUTOMATION_EDIT_ID_TAG_KEY]: automationId,
  };
}

export function buildAutomationDraftTags(
  tags: Record<string, string> | null | undefined,
  draftId: string,
): Record<string, string> {
  return {
    ...buildAutomationSetupModeTags(tags),
    [AUTOMATION_DRAFT_ID_TAG_KEY]: draftId,
  };
}

export function removeAutomationDraftTags(
  tags: Record<string, string> | null | undefined,
): Record<string, string> {
  const next = { ...(tags ?? {}) };
  delete next[AUTOMATION_SETUP_TAG_KEY];
  delete next[AUTOMATION_DRAFT_ID_TAG_KEY];
<<<<<<< HEAD
=======
  delete next[AUTOMATION_MATERIALIZED_DRAFT_ID_TAG_KEY];
  delete next[AUTOMATION_EDIT_ID_TAG_KEY];
>>>>>>> b1708a050 (feat: design the automation setup flow for drafts and testing (#17775))
  return next;
}
