import { Writable } from 'stream';
import printer from '../src';

describe('printer', () => {
  beforeEach(() => {
    printer.setOutStream(process.stdout);
    printer.setErrorStream(process.stderr);
  });

  describe('error', () => {
    it('writes to process.stderr by default', () => {
      const spy = jest.spyOn(process.stderr, 'write');
      // @ts-ignore
      spy.mockImplementation(() => {});
      printer.error('error-message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual('error-message');
      spy.mockRestore();
    });
  });

  describe('print', () => {
    it('writes to process.stdout by default', () => {
      const spy = jest.spyOn(process.stdout, 'write');
      // @ts-ignore
      spy.mockImplementation(() => {});
      printer.print('info-message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual('info-message');
      spy.mockRestore();
    });
  });

  describe('clearLine', () => {
    it('clears the line for the provided stream(s)', () => {
      const writeOut = jest.fn();
      const writeErr = jest.fn();
      const stdout = new Writable({ write: writeOut });
      const stderr = new Writable({ write: writeErr });
      (stdout as NodeJS.WriteStream).isTTY = true;
      printer.setOutStream(stdout);
      printer.setErrorStream(stderr);
      printer.clearLine(printer.print, printer.error);
      expect(writeOut).toHaveBeenCalledTimes(1);
      expect(writeErr).toHaveBeenCalledTimes(1);
      expect(writeOut.mock.calls[0][0].toString()).toEqual('\x1b[999D\x1b[K');
      expect(writeErr.mock.calls[0][0].toString()).toEqual('\x1b[999D\x1b[K');
    });
  });

  describe('isTTY', () => {
    it('returns false if the current log stream is not TTY', () => {
      const customStream = new Writable();
      printer.setOutStream(customStream);
      expect(printer.isTTY).toEqual(false);
    });
  });

  describe('setErrorStream', () => {
    it('sets the error stream', () => {
      let data = '';
      const write = (chunk: string): void => {
        data += chunk.toString();
      };
      const stream = new Writable({ write });
      const spy = jest.spyOn(process.stderr, 'write');
      printer.setErrorStream(stream);
      printer.error('error-message');
      expect(spy).not.toHaveBeenCalled();
      expect(data).toEqual('error-message');
      spy.mockRestore();
    });

    it('can be silenced by setting the stream to null', () => {
      const spy = jest.spyOn(process.stderr, 'write');
      printer.setErrorStream(process.stderr);
      printer.setErrorStream(null);
      printer.error('error-message');
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('setLogStream', () => {
    it('sets the log stream', () => {
      let data = '';
      const write = (chunk: string): void => {
        data += chunk.toString();
      };
      const stream = new Writable({ write });
      const spy = jest.spyOn(process.stdout, 'write');
      printer.setOutStream(stream);
      printer.print('info-message');
      expect(spy).not.toHaveBeenCalled();
      expect(data).toEqual('info-message');
      spy.mockRestore();
    });

    it('can be silenced by setting the stream to null', () => {
      const spy = jest.spyOn(process.stdout, 'write');
      printer.setOutStream(process.stdout);
      printer.setOutStream(null);
      printer.print('info-message');
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
