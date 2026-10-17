export interface AppcFileReadResult { data_base64: string; }
export interface AppcFileWriteResult { written: boolean; }
export interface AppcFileDeleteResult { deleted: boolean; }
export interface AppcFileListEntry { path: string; kind: "file" | "directory"; size: number | null; }
export interface AppcFileListResult { entries: AppcFileListEntry[]; }
export interface AppcFileStatResult { exists: boolean; kind: "file" | "directory" | null; size: number | null; }
