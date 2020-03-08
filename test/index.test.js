describe('Sheetable inside extension', function() {
  it('should exist', function() {
    expect(Sheetable).toBeDefined();
  });
  
  it('should have methods', function() {
    expect(Sheetable.provideMessagePort).toBeDefined();
    expect(Sheetable.attachRequestHandler).toBeDefined();
  });
});

describe('Sheetable outside extension', function() {
  document.querySelector('body').innerHTML =
    `<iframe id="iframe" src="/test/extension.html" />`;
  let iframe = document.getElementById('iframe');
  iframe.contentWindow.console = console;
  let iframeReady = new Promise(resolve => iframe.onload = resolve);

  let proxy;
  beforeAll(async function() {
    await iframeReady;
    proxy = Comlink.wrap(Comlink.windowEndpoint(iframe.contentWindow));
  });
  
  it('should call function', async function() {
    let result = await proxy.foo(1, 2);
    expect(result).toBe(1 + 2);
  });
});
