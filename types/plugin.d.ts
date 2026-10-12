/// <reference path="./lunr.d.ts" />

declare namespace LunrLanguages {
  interface LunrLike {
    [key: string]: any;
  }

  type Plugin = (lunr: LunrLike, ...options: any[]) => void;
}

declare const plugin: LunrLanguages.Plugin;

export = plugin;
