export const titlePurify = (str: string) =>
  encodeURIComponent(str.replace(/\s/g, "_"));
