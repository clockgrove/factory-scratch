import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { clickWav } from '../scripts/gen-click.mjs';

const wav = clickWav();

test('file is 204 bytes', () => {
  assert.equal(wav.length, 204);
});

test('RIFF and WAVE tags with RIFF size 196', () => {
  assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
  assert.equal(wav.readUInt32LE(4), 196);
  assert.equal(wav.toString('ascii', 8, 12), 'WAVE');
});

test('fmt chunk describes 8000 Hz mono 16-bit PCM', () => {
  assert.equal(wav.toString('ascii', 12, 16), 'fmt ');
  assert.equal(wav.readUInt32LE(16), 16);
  assert.equal(wav.readUInt16LE(20), 1);
  assert.equal(wav.readUInt16LE(22), 1);
  assert.equal(wav.readUInt32LE(24), 8000);
  assert.equal(wav.readUInt32LE(28), 16000);
  assert.equal(wav.readUInt16LE(32), 2);
  assert.equal(wav.readUInt16LE(34), 16);
});

test('data chunk holds 80 samples', () => {
  assert.equal(wav.toString('ascii', 36, 40), 'data');
  assert.equal(wav.readUInt32LE(40), 160);
});

test('sample 0 is 0', () => {
  assert.equal(wav.readInt16LE(44), 0);
});

test('sample 1 follows the 1000 Hz sine', () => {
  assert.equal(wav.readInt16LE(46), 11585);
});

test('sample 2 is the peak 16383', () => {
  assert.equal(wav.readInt16LE(48), 16383);
});

test('two calls return equal buffers', () => {
  assert.deepEqual(clickWav(), clickWav());
});

test('sha256 matches the pinned digest', () => {
  assert.equal(
    createHash('sha256').update(clickWav()).digest('hex'),
    'b79fac1d443c261f5848b4bfd5a16e0b149082376cbe1f158e74ee5dd43a2419',
  );
});
