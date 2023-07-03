/// <reference types="react-scripts" />
declare module 'path';
declare module 'buffer' {
  const buffer: never;
  export = buffer;
}

declare module 'stream' {
  const stream: never;
  export = stream;
}

declare module 'crypto' {
  const crypto: never;
  export = crypto;
}
