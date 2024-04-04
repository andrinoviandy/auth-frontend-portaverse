import { MIME_TYPES } from "@mantine/dropzone";

export default function mimeTypeToReadable(type) {
  return Object.keys(MIME_TYPES).find(
    (key) => MIME_TYPES[key] === type,
  );
}
