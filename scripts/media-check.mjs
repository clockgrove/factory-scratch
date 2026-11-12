import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const LFS_PREFIX = Buffer.from('version https://git-lfs.github.com/spec/v1', 'ascii');

/** Describes a media file as one line: missing, an LFS pointer, or its size, RIFF/WAVE status and sha256 prefix. */
export function describeMedia(path, buffer) {
  if (buffer === null) return `${path} missing`;
  if (buffer.subarray(0, LFS_PREFIX.length).equals(LFS_PREFIX)) return `${path} lfs-pointer`;
  const riff =
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WAVE';
  const sha = createHash('sha256').update(buffer).digest('hex').slice(0, 12);
  return `${path} bytes ${buffer.length} riff ${riff ? 'yes' : 'no'} sha256 ${sha}`;
}

/** Reads the file named by the first argument and prints its description, always succeeding. */
function main() {
  try {
    const path = process.argv[2] ?? '';
    let buffer;
    try {
      buffer = readFileSync(path);
    } catch {
      buffer = null;
    }
    console.log(describeMedia(path, buffer));
  } catch {
    // The check reports and never fails.
  }
  process.exitCode = 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
