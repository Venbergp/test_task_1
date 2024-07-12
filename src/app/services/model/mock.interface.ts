export interface File {
  name: string;
  content: string;
}

export interface Folder {
  name: string;
  files?: File[];
  folders?: Folder[];
}
