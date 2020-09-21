export function onClientEntry() {
  const delay = Number(new URL(document.location).searchParams.get('delay'));

  return new Promise((resolve) => {
    setTimeout(function () {
      resolve();
    }, 1000 * delay);
  });
}
