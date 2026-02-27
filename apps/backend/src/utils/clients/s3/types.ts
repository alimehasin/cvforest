export interface UploadImageOptions {
  file: File;
  bucketName: string;
  isPublic: boolean;
  useNameAsKey?: boolean;
}

export interface UploadVideoOptions {
  file: File;
  bucketName: string;
  isPublic: boolean;
  useNameAsKey?: boolean;
}

export interface UploadPdfOptions {
  file: File;
  bucketName: string;
  isPublic: boolean;
  useNameAsKey?: boolean;
}

export interface UploadOtherOptions {
  file: File;
  bucketName: string;
  isPublic: boolean;
  useNameAsKey?: boolean;
}
