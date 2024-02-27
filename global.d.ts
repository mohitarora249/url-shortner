declare module '@metamask/jazzicon' {
  type Jazzicon = (diameter: number, seed: number) => HTMLElement;

  const jazzicon: Jazzicon;
  export default jazzicon;
}