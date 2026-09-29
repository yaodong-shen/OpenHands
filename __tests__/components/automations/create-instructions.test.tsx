import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  NavigationProvider,
  type NavigationContextValue,
} from "#/context/navigation-context";
import { CreateInstructions } from "#/components/features/automations/create-instructions";
import { I18nKey } from "#/i18n/declaration";
<<<<<<< HEAD
import { useConversationStore } from "#/stores/conversation-store";
import * as telemetry from "#/services/telemetry";
=======

const mocks = vi.hoisted(() => ({
  createConversationMutate: vi.fn(),
  setAutomationSetupDraft: vi.fn(),
  trackAutomationCreatedButton: vi.fn(),
}));

vi.mock("#/hooks/mutation/use-create-conversation", () => ({
  useCreateConversation: () => ({
    mutate: mocks.createConversationMutate,
    isPending: false,
  }),
}));

vi.mock("#/api/automation-setup-draft-store", () => ({
  PENDING_AUTOMATION_SETUP_ID: "pending-new-automation",
  setAutomationSetupDraft: (...args: unknown[]) =>
    mocks.setAutomationSetupDraft(...args),
  getAutomationSetupDraft: () => null,
  clearAutomationSetupDraft: () => undefined,
}));

vi.mock("#/contexts/active-backend-context", () => ({
  useActiveBackend: () => ({ backend: { kind: "local" } }),
}));

vi.mock("#/hooks/use-tracking", () => ({
  useTracking: () => ({
    trackAutomationCreatedButton: mocks.trackAutomationCreatedButton,
  }),
}));
>>>>>>> b1708a050 (feat: design the automation setup flow for drafts and testing (#17775))

vi.mock("#/hooks/query/use-settings", () => ({
  useSettings: () => ({ data: { user_consents_to_analytics: true } }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        [I18nKey.AUTOMATIONS$CREATE_AUTOMATION_BUTTON]: "Create Automation",
        [I18nKey.AUTOMATIONS$CREATE_AUTOMATION_PROMPT]: "Create an automation",
        [I18nKey.AUTOMATIONS$CREATE_INSTRUCTIONS_GUIDANCE]:
          "Include what the automation should do, when it should run, and where to send the results.",
      };
      return translations[key] || key;
    },
  }),
  Trans: ({
    i18nKey,
    components,
  }: {
    i18nKey: string;
    components?: Record<string, React.ReactElement>;
  }) => {
    if (i18nKey !== I18nKey.AUTOMATIONS$EMPTY_OPTION_CONVERSATION_DESC) {
      return i18nKey;
    }

    return (
      <>
        Start a new conversation and tell OpenHands to{" "}
        {components?.example
          ? React.cloneElement(
              components.example,
              {},
              <>
                {components.cmd
                  ? React.cloneElement(
                      components.cmd,
                      {},
                      "Create an automation",
                    )
                  : null}
                {components.punct
                  ? React.cloneElement(components.punct, {}, ".")
                  : null}
              </>,
            )
          : null}
      </>
    );
  },
}));

function renderCreateInstructions() {
  const value: NavigationContextValue = {
    currentPath: "/automations",
    conversationId: null,
    isNavigating: false,
    navigate: vi.fn(),
  };

  const result = render(
    <NavigationProvider value={value}>
      <CreateInstructions />
    </NavigationProvider>,
  );

  return { ...result, navigate: value.navigate };
}

describe("CreateInstructions", () => {
  let captureMock: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    captureMock = vi
      .spyOn(telemetry, "trackEvent")
      .mockResolvedValue(undefined);
    useConversationStore.setState({ messageToSend: null });
  });

  afterEach(() => {
    captureMock.mockRestore();
  });

  it("captures automation_created_button with the active backend kind when Create Automation is clicked", async () => {
    const user = userEvent.setup();
    renderCreateInstructions();

    await user.click(screen.getByTestId("automations-create-automation"));

    expect(captureMock).toHaveBeenCalledWith(
      "automation_created_button",
      expect.objectContaining({ backend_kind: "local" }),
    );
  });

<<<<<<< HEAD
  it("navigates to conversations with a prefilled prompt when Create Automation is clicked", async () => {
=======
  it("opens the setup form without creating a conversation", async () => {
>>>>>>> b1708a050 (feat: design the automation setup flow for drafts and testing (#17775))
    const user = userEvent.setup();
    const setMessageToSend = vi.fn();
    useConversationStore.setState({ setMessageToSend });
    const { navigate } = renderCreateInstructions();

    await user.click(screen.getByTestId("automations-create-automation"));

<<<<<<< HEAD
    expect(navigate).toHaveBeenCalledWith("/conversations");
    await waitFor(() => {
      expect(setMessageToSend).toHaveBeenCalledWith("Create an automation");
    });
=======
    expect(mocks.createConversationMutate).not.toHaveBeenCalled();
    expect(mocks.setAutomationSetupDraft).toHaveBeenCalledWith(
      "pending-new-automation",
      {
        prompt: "",
        kind: "prompt",
      },
    );
    expect(navigate).toHaveBeenCalledWith("/automations/setup");
>>>>>>> b1708a050 (feat: design the automation setup flow for drafts and testing (#17775))
  });
});
