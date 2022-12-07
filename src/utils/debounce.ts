export function debounce(callback: (args: any) => void) {
  let timeoutId: any = null;

  return (...args: any) => {
    window.cancelAnimationFrame(timeoutId);
    timeoutId = window.requestAnimationFrame(() => {
      callback.apply(null, args);
    });
  };
}
