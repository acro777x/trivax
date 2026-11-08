/// <reference types="vite/client" />

declare module "https://*" {
  const content: any;
  export default content;
}
