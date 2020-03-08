describe('Sheetable', function() {
  it('should exist', function() {
    expect(Sheetable).toBeDefined();
  });
  
  it('should have methods', function() {
    expect(Sheetable.provideMessagePort).toBeDefined();
    expect(Sheetable.attachRequestHandler).toBeDefined();
  });
});
