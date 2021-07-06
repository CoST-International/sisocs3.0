import { EncryptPipe } from './encrypt.pipe';

describe('EncryptPipe', () => {
  it('create an instance', () => {
    const pipe = new EncryptPipe();
    expect(pipe).toBeTruthy();
  });
});
