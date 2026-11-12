import assert from 'node:assert/strict';
import { test } from 'node:test';
import { beepWav } from '../scripts/gen-beep.mjs';
import { describeMedia } from '../scripts/media-check.mjs';

test('describes a WAV buffer with size, riff yes and sha256 prefix', () => {
  assert.equal(
    describeMedia('media/beep.wav', beepWav()),
    'media/beep.wav bytes 4044 riff yes sha256 faa6433613ef',
  );
});

test('describes a non-WAV buffer as riff no', () => {
  assert.equal(
    describeMedia('media/x.wav', Buffer.from('hello')),
    'media/x.wav bytes 5 riff no sha256 2cf24dba5fb0',
  );
});

test('describes a Git LFS pointer as lfs-pointer', () => {
  const pointer = Buffer.from(
    'version https://git-lfs.github.com/spec/v1\noid sha256:faa6433613ef3732c87555cee537cb519b614797ab4d70d5d389b2dd03fdc2b1\nsize 4044\n',
  );
  assert.equal(describeMedia('media/beep.wav', pointer), 'media/beep.wav lfs-pointer');
});

test('describes a null buffer as missing', () => {
  assert.equal(describeMedia('media/beep.wav', null), 'media/beep.wav missing');
});

test('describes a RIFF buffer that is not WAVE as riff no', () => {
  const buf = Buffer.alloc(12);
  buf.write('RIFF', 0, 'ascii');
  buf.write('AVI ', 8, 'ascii');
  assert.equal(describeMedia('media/a.avi', buf), 'media/a.avi bytes 12 riff no sha256 3b947eb5a9ca');
});
