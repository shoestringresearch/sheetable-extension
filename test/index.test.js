describe('Sheetable extension', function() {
  document.querySelector('body').innerHTML =
    `<iframe id="iframe" src="/test/extension.html" />`;
  let iframe = document.getElementById('iframe');
  let iframeReady = new Promise(resolve => iframe.onload = resolve);

  // Let Karma display iframe console output.
  // https://github.com/karma-runner/karma/issues/1373
  iframe.contentWindow.console = console;
  
  let proxy;
  beforeAll(async function() {
    await iframeReady;
    proxy = Comlink.wrap(Comlink.windowEndpoint(iframe.contentWindow));
  });
  
  it('should make RPC', async function() {
    let port = await proxy.getMessagePort();
    let remote = Comlink.wrap(port);
    let result = await remote.request(1, 2, Comlink.proxy((a, b) => a + b));
    expect(result).toBe(3);
  });
});
