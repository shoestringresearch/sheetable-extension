import * as Comlink from 'comlink';

export default {

  /**
   * Install a callback to return a MessagePort.
   *
   * @param {function} callback
   */
  provideMessagePort(callback) {
    Comlink.expose({
      async getMessagePort() {
        let port = await callback();
        return Comlink.transfer(port, [port]);
      }
    }, Comlink.windowEndpoint(self.parent));
  },

  /**
   * @callback requestHandler
   * @param {Object} database - Database proxy.
   * @param {Object} args - Extension-defined arguments.
   * @param {Object} env - Environment settings.
   */
  
  /**
   * Install a handler to receive requests.
   *
   * @param {Object} messagePort - Local port of the MessageChannel.
   * @param {requestHandler} handler - Callback for requests.
   *
   * Call this function to configure the local port of a
   * MessageChannel before returning the other port via the
   * provideMessagePort() callback. This should be called in the
   * context (i.e. window or worker) that is handling the request.
   */
  attachRequestHandler(messagePort, handler) {
    Comlink.expose({
      request: handler,

      ping() {
      }
    }, messagePort);
  }
};
