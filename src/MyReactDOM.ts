import type { ReactNode } from "react";
import ReactReconciler from "react-reconciler";
import {
  DefaultEventPriority,
  NoEventPriority,
} from "react-reconciler/constants";

const mockReactContext = {
  $$typeof: 0,
  Consumer: undefined as unknown as object,
  Provider: undefined as unknown as object,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0,
};
console.log("MyReactDOM loaded");

let updatePriority = NoEventPriority;

const reconciler = ReactReconciler({
  // Modes
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  // Core Methods
  createInstance: (
    type: string,
    props: any,
    rootContainer,
    hostContext,
    internalHandle
  ) => {
    const instance = document.createElement(type);
    for (const key in props) {
      if (key === "children") {
        // instance.innerHTML = props.children;
      } else if (key === "className") {
        instance.className = props.className;
      } else if (key === "onClick") {
        instance.addEventListener("click", props.onClick);
      } else {
        instance.setAttribute(key, props[key]);
      }
    }
    return instance;
  },
  createTextInstance: (text) => {
    console.log("createTextInstance", text);
    return document.createTextNode(text);
  },
  appendInitialChild: (parent, child) => {
    console.log("appendInitialChild", parent, child);
    parent.appendChild(child);
  },
  finalizeInitialChildren: (...args) => {
    console.log("finalizeInitialChildren", ...args);
    return false;
  },
  shouldSetTextContent: (type, props: any) => {
    console.log("shouldSetTextContent", type, props);
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  getRootHostContext: (...args) => {
    console.log("getRootHostContext", ...args);
    return {};
  },
  getChildHostContext: (...args) => {
    console.log("getChildHostContext", ...args);
    return {};
  },
  getPublicInstance: (inst) => {
    console.log("getPublicInstance", inst);
    return inst;
  },
  prepareForCommit: (...args) => {
    console.log("prepareForCommit", ...args);
    return null;
  },
  resetAfterCommit: (...args) => {
    console.log("resetAfterCommit", ...args);
  },
  isPrimaryRenderer: true,
  noTimeout: -1,

  // Mutation Methods
  appendChild: (parent, child) => {
    console.log("appendChild", parent, child);
    parent.appendChild(child);
  },
  appendChildToContainer: (container: HTMLElement, child: HTMLElement) => {
    console.log("appendChildToContainer", container, child);
    container.appendChild(child);
  },
  removeChild: (parent: HTMLElement, child: HTMLElement) => {
    parent.removeChild(child);
  },
  removeChildFromContainer: (...args) => {
    console.log("removeChildFromContainer", ...args);
  },
  insertBefore: (...args) => {
    console.log("insertBefore", ...args);
  },
  insertInContainerBefore: (...args) => {
    console.log("insertInContainerBefore", ...args);
  },
  commitUpdate: (instance: HTMLElement, type, oldProps: any, props: any) => {
    for (const key in oldProps) {
      if (key === "onClick") {
        instance.removeEventListener("click", oldProps.onClick);
      }
    }
    for (const key in props) {
      if (key === "children") {
        // instance.innerHTML = props.children;
      } else if (key === "className") {
        instance.className = props.className;
      } else if (key === "onClick") {
        instance.addEventListener("click", props.onClick);
      } else {
        instance.setAttribute(key, props[key]);
      }
    }
  },
  commitTextUpdate: (instance, oldText, newText) => {
    instance.textContent = newText;
  },
  clearContainer: (...args) => {
    console.log("clearContainer", ...args);
  },

  // 필수 scaffold 메서드 추가
  preparePortalMount: (...args) => {
    console.log("preparePortalMount", ...args);
  },
  scheduleTimeout: (...args) => {
    console.log("scheduleTimeout", ...args);
    return setTimeout(...args);
  },
  cancelTimeout: (...args) => {
    console.log("cancelTimeout", ...args);
    return clearTimeout(...args);
  },
  getInstanceFromNode: (...args) => {
    console.log("getInstanceFromNode", ...args);
    return null;
  },
  beforeActiveInstanceBlur: (...args) => {
    console.log("beforeActiveInstanceBlur", ...args);
  },
  afterActiveInstanceBlur: (...args) => {
    console.log("afterActiveInstanceBlur", ...args);
  },
  prepareScopeUpdate: (...args) => {
    console.log("prepareScopeUpdate", ...args);
  },
  getInstanceFromScope: (...args) => {
    console.log("getInstanceFromScope", ...args);
    return null;
  },
  detachDeletedInstance: (...args) => {
    console.log("detachDeletedInstance", ...args);
  },
  setCurrentUpdatePriority: (priority) => {
    updatePriority = priority;
  },
  getCurrentUpdatePriority: () => {
    return updatePriority;
  },
  resolveUpdatePriority: () => {
    if (updatePriority === NoEventPriority) {
      return DefaultEventPriority;
    }
    return updatePriority;
  },
  resetFormInstance: (...args) => {
    console.log("resetFormInstance", ...args);
  },
  requestPostPaintCallback: (...args) => {
    console.log("requestPostPaintCallback", ...args);
  },
  shouldAttemptEagerTransition: (...args) => {
    console.log("shouldAttemptEagerTransition", ...args);
    return false;
  },
  trackSchedulerEvent: (...args) => {
    console.log("trackSchedulerEvent", ...args);
  },
  resolveEventType: (...args) => {
    console.log("resolveEventType", ...args);
    return null;
  },
  resolveEventTimeStamp: (...args) => {
    console.log("resolveEventTimeStamp", ...args);
    return 0;
  },
  maySuspendCommit: (...args) => {
    console.log("maySuspendCommit", ...args);
    return false;
  },
  preloadInstance: (...args) => {
    console.log("preloadInstance", ...args);
    return false;
  },
  startSuspendingCommit: (...args) => {
    console.log("startSuspendingCommit", ...args);
  },
  suspendInstance: (...args) => {
    console.log("suspendInstance", ...args);
  },
  waitForCommitToBeReady: (...args) => {
    console.log("waitForCommitToBeReady", ...args);
    return null;
  },

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
