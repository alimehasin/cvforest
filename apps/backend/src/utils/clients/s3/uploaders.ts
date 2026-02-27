import * as crypto from 'node:crypto';
import * as path from 'node:path';
import {
  compressImage,
  prepareAndUpload,
  replaceFileExtension,
} from './helpers';
import type {
  UploadImageOptions,
  UploadOtherOptions,
  UploadPdfOptions,
  UploadVideoOptions,
} from './types';

export async function uploadImage({
  file,
  bucketName,
  isPublic,
  useNameAsKey = false,
}: UploadImageOptions) {
  const key = useNameAsKey
    ? replaceFileExtension(file.name, 'webp')
    : `${crypto.randomUUID()}.webp`;

  const f = await compressImage(file, key);
  return prepareAndUpload(bucketName, key, f, f.type, isPublic);
}

export async function uploadVideo({
  file,
  bucketName,
  isPublic,
  useNameAsKey = false,
}: UploadVideoOptions) {
  const ext = path.extname(file.name);
  const key = useNameAsKey ? file.name : `${crypto.randomUUID()}${ext}`;
  return prepareAndUpload(bucketName, key, file, file.type, isPublic);
}

export async function uploadOther({
  file,
  bucketName,
  isPublic,
  useNameAsKey = false,
}: UploadOtherOptions) {
  const ext = path.extname(file.name);
  const key = useNameAsKey ? file.name : `${crypto.randomUUID()}${ext}`;
  return prepareAndUpload(
    bucketName,
    key,
    file,
    file.type || 'application/octet-stream',
    isPublic,
  );
}

export async function uploadPdf({
  file,
  bucketName,
  isPublic,
  useNameAsKey = false,
}: UploadPdfOptions) {
  const key = useNameAsKey ? file.name : `${crypto.randomUUID()}.pdf`;
  return prepareAndUpload(bucketName, key, file, 'application/pdf', isPublic);
}
