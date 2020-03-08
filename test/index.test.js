describe('Sheetable iframe', function() {
  // Create iframe with a page that uses the Sheetable Extension API.
  document.querySelector('body').innerHTML =
    `<iframe id="iframe" src="/test/extension.html" />`;
  let iframe = document.getElementById('iframe');
  let iframeReady = new Promise(resolve => iframe.onload = resolve);

  // Let Karma display iframe console output.
  // https://github.com/karma-runner/karma/issues/1373
  iframe.contentWindow.console = console;

  // Use Comlink to get the remote proxy.
  let requestProxy;
  beforeAll(async function() {
    await iframeReady;

    // Get the MessagePort from the iframe.
    let portProxy = Comlink.wrap(Comlink.windowEndpoint(iframe.contentWindow));
    let port = await portProxy.getMessagePort();
    portProxy[Comlink.releaseProxy]();
    
    // Wrap the port.
    requestProxy = Comlink.wrap(port);
  });
  
  it('should make RPC', async function() {
    // Now we can make calls to the proxy. Objects (including
    // functions) can be passed as arguments using a proxy wrapper.
    let result = await requestProxy.request(1, 2, Comlink.proxy((a, b) => a + b));
    expect(result).toBe(3);
  });

  afterAll(function() {
    requestProxy[Comlink.relaseProxy]();
  });
});
