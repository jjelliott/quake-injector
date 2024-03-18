import {open} from "@tauri-apps/api/shell";

export function navigate(href) {
  if (href.startsWith("http")){
    return open(href);
  } else if (href.startsWith("/")){
    return open(`https://www.quaddicted.com${href}`);
  }
  return open(`https://www.quaddicted.com/reviews/${href}`);

}