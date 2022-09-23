export const isGyazoUrl = (str: string) => {
  const url = new URL(str);
  if (url) {
    if (url.host === "gyazo.com") {
      return true;
    }
  }
  return false;
};

export const gyazoSrcset = (str: string) => {
  const url = new URL(str);
  if (url) {
    if (url.host === "gyazo.com") {
      if (/\/raw$/.test(url.pathname)) {
        return `${str.replace(/\/raw/, "/max_size/600")} 600w, ${
          str.replace(/\/raw/, "/max_size/1200")
        } 1200w`;
      }
    }
  }
  return str;
};
