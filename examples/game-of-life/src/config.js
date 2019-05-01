// On the WASM side, 32-bit color values are modified in ABGR order (alpha, blue, green, red)
// because WASM is little endian. This results in RGBA in memory, which is exactly what the image
// buffer, composed of 8-bit components, expects on the JS side.

/**
 * @type {u32}
 * @external
 * @const
 */
export var BGR_ALIVE;

/**
 * @type {u32}
 * @external
 * @const
 */
export var BGR_DEAD;

/**
 * @type {u32}
 * @external
 * @const
 */
export var BIT_ROT;
