// On the WASM side, 32-bit color values are modified in ABGR order (alpha, blue, green, red)
// because WASM is little endian. This results in RGBA in memory, which is exactly what the image
// buffer, composed of 8-bit components, expects on the JS side.

/**
 * @const {u32}
 * @declare
 */
export var BGR_ALIVE;

/**
 * @const {u32}
 * @declare
 */
export var BGR_DEAD;

/**
 * @const {u32}
 * @declare
 */
export var BIT_ROT;
