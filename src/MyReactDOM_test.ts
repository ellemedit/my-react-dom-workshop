import type { ReactNode } from "react";
import ReactReconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";

const mockReactContext = {
  $$typeof: 0,
  Consumer: undefined as unknown as object,
  Provider: undefined as unknown as object,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0,
};

const reconciler = ReactReconciler({
  // Modes
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  // Core Methods
  createInstance: () => {
    // start here
  },
  createTextInstance: () => {},
  appendInitialChild: () => {},
  finalizeInitialChildren: () => false,
  shouldSetTextContent: () => false,
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),
  getPublicInstance: (inst: unknown) => inst,
  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  isPrimaryRenderer: true,
  noTimeout: -1,

  // Mutation Methods
  appendChild: () => {},
  appendChildToContainer: () => {},
  removeChild: () => {},
  removeChildFromContainer: () => {},
  insertBefore: () => {},
  insertInContainerBefore: () => {},
  commitUpdate: () => {},
  commitTextUpdate: () => {},
  clearContainer: () => {},

  // 필수 scaffold 메서드 추가
  preparePortalMount: () => {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => null,
  detachDeletedInstance: () => {},
  setCurrentUpdatePriority: () => {},
  getCurrentUpdatePriority: () => DefaultEventPriority,
  resolveUpdatePriority: () => DefaultEventPriority,
  resetFormInstance: () => {},
  requestPostPaintCallback: () => {},
  shouldAttemptEagerTransition: () => false,
  trackSchedulerEvent: () => {},
  resolveEventType: () => null,
  resolveEventTimeStamp: () => 0,
  maySuspendCommit: () => false,
  preloadInstance: () => false,
  startSuspendingCommit: () => {},
  suspendInstance: () => {},
  waitForCommitToBeReady: () => null,

  // 누락된 필드 scaffold
  NotPendingTransition: null,
  HostTransitionContext: mockReactContext as any,
});

export function createRoot(container: HTMLElement) {
  const reactContainer = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "mini",
    (_error) => {},
    null
  );

  function render(node: ReactNode) {
    reconciler.updateContainer(node, reactContainer, null, null);
  }
  return { render };
}
