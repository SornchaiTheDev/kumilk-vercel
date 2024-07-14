import sharp from 'sharp';

/**
 * Reduces the size of an image buffer while maintaining aspect ratio.
 * @param {Buffer} buffer - The input image buffer.
 * @param {number} [quality=100] - The quality of the output image (1-100).
 * @param {number} [drop=2] - The amount to reduce quality in each iteration.
 * @param {number} [maxFileSize=200] - The desired maximum file size in kilobytes (KB).
 * @returns {Promise<Buffer>} - The resized image buffer.
 */
async function reduceImageSize({
  buffer,
  quality = 100,
  drop = 2,
  maxFileSize = 200,
}: {
  buffer: Buffer;
  quality?: number;
  drop?: number;
  maxFileSize?: number;
}): Promise<Buffer> {
  let currentQuality = quality;
  let outputBuffer = buffer;

  while (outputBuffer.length > maxFileSize * 1024 && currentQuality > 0) {
    outputBuffer = await sharp(buffer)
      .jpeg({ quality: currentQuality })
      .toBuffer();

    currentQuality -= drop;
  }

  return outputBuffer;
}

export default reduceImageSize;
