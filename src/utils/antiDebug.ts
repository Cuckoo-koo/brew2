/**
 * Client Anti-Debugging & Code Protection Guard
 * Hides and protects application source code when DevTools or Debugger mode is active.
 */
export function initAntiDebug() {
  if (typeof window === 'undefined') return;

  // 1. Disable inspect shortcut hotkeys
  const handleKeyDown = (e: KeyboardEvent) => {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Elements)
    // Mac equivalents: Cmd+Opt+I, Cmd+Opt+J, Cmd+Opt+C
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    if (
      isCtrlOrCmd &&
      e.shiftKey &&
      (e.key === 'I' ||
        e.key === 'i' ||
        e.key === 'J' ||
        e.key === 'j' ||
        e.key === 'C' ||
        e.key === 'c')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Page Source)
    if (isCtrlOrCmd && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save page source)
    if (isCtrlOrCmd && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // 2. Disable context menu (right click -> Inspect)
  const handleContextMenu = (e: MouseEvent) => {
    // Allow right click only in standard input/textarea for normal editing
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
    return false;
  };

  // 3. Anti-debugging trap: triggers anonymous debugger lock if DevTools opens
  let debugInterval: number | null = null;
  const startDebuggerTrap = () => {
    try {
      const antiDebugFn = function () {
        // Obfuscated debugger invocation
        const fn = new Function('debugger');
        fn();
      };
      debugInterval = window.setInterval(antiDebugFn, 150);
    } catch {
      // Ignore if blocked in strict sandbox
    }
  };

  // 4. Suppress console methods in production / client
  try {
    const noop = () => {};
    // Store original clear to wipe traces
    if (typeof console !== 'undefined') {
      console.clear();
      console.log = noop;
      console.info = noop;
      console.warn = noop;
      console.debug = noop;
      console.table = noop;
    }
  } catch {
    // Ignore console override errors
  }

  window.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener('contextmenu', handleContextMenu, true);
  startDebuggerTrap();

  return () => {
    window.removeEventListener('keydown', handleKeyDown, true);
    window.removeEventListener('contextmenu', handleContextMenu, true);
    if (debugInterval !== null) {
      clearInterval(debugInterval);
    }
  };
}
