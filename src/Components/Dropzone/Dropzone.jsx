/* eslint-disable no-nested-ternary */
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Card,
  Group,
  Notification,
  Overlay,
  SimpleGrid,
  Text,
} from "@mantine/core";
import clsx from "clsx"
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { VALIDATION_REGEX } from "../../Utils/Constants";
import bytesToSize from "../../Utils/Helpers/byteToSize";
import getThumbnailForVideo from "../../Utils/Helpers/getThumbnailVideo";
import mimeTypeToReadable from "../../Utils/Helpers/mimeTypeToReadable";
import openInNewTab from "../../Utils/Helpers/openInNewTab";
import UploadIconNew from "../Assets/Icon/UploadIconNew";
import FileTypeIcon from "../FileTypeIcon/FileTypeIcon";

const fileNotSupported =
  "File type not supported, supported types:" +
  " .ppt, .pptx, .doc, .docx, .xls, .xlsx, .pdf," +
  " .png, .jpg, .jpeg, .gif, .mov";

function UploadZone({
  file,
  setFile,
  acceptType,
  idleStateElement,
  unsupportedMessage,
}) {
  const fileType = file?.[0]?.path?.toLowerCase();
  return (
    <Dropzone
      onDrop={(files) => setFile(files)}
      maxSize={100 * 1024 ** 2}
      accept={acceptType}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        {file !== null ? (
          <div className="flex items-center flex-col gap-2">
            <FileTypeIcon type={fileType} />
            {file !== null && <span>{file[0].name}</span>}
          </div>
        ) : (
          <>
            <Dropzone.Accept>{idleStateElement}</Dropzone.Accept>
            <Dropzone.Reject>
              <div className="grid justify-items-center gap-2">
                <Icon icon="tabler:x" color="#e73030" width={45} />
                <p className="text-red-500 text-center">
                  {unsupportedMessage}
                </p>
              </div>
            </Dropzone.Reject>
            <Dropzone.Idle>{idleStateElement}</Dropzone.Idle>
          </>
        )}
      </Group>
    </Dropzone>
  );
}

function CustomMantineDropzone({
  file,
  setFile,
  acceptType,
  maxSize = 10 * 1024 ** 2,
  description,
  orDescription,
  disabled,
  disabledDefaultCursor,
  onRejectValue = [],
  typeComponent = "single", // "single" || "multiple" || "videoType"
  maximumUploads,
  thumbnail,
}) {
  const [notificationStatement, setNotificationStatement] = useState({
    heading: "",
    message: "",
    isOpen: false,
  });

  const isValidFiles = useCallback(
    (newFiles) => {
      const valid = newFiles.every((newFile) => {
        const isFileSupported = acceptType.includes(newFile?.type);
        const supportedExtensions = acceptType
          .map((type) => mimeTypeToReadable(type))
          .join(", ");

        if (!isFileSupported) {
          setNotificationStatement({
            isOpen: true,
            message: `Supported file type are ${supportedExtensions}`,
            heading: "File type not supported",
          });
          return false;
        }

        if (newFile.size > maxSize) {
          setNotificationStatement({
            isOpen: true,
            message: `File size is too large, maximum file size is ${bytesToSize(
              maxSize,
            )}`,
            heading: "File size is too large",
          });
          return false;
        }

        return true;
      });
      return valid;
    },
    [acceptType, maxSize],
  );

  return (
    <>
      {notificationStatement.isOpen && (
        <Notification
          title={notificationStatement.heading}
          className="my-4 p-4"
          icon={<Icon icon="bi:x" width={30} />}
          color="red"
          onClose={() => setNotificationStatement({ isOpen: false })}
        >
          {notificationStatement.message}
        </Notification>
      )}
      <Dropzone
        multiple={maximumUploads > 1}
        onDrop={async (files) => {
          if (files?.length + file?.length > maximumUploads) {
            return;
          }
          if (isValidFiles(files)) {
            if (typeComponent === "multiple") {
              setFile([...(file || []), ...files]);
            } else {
              setFile(files);
            }
          }
          setNotificationStatement({ isOpen: false });
        }}
        accept={acceptType}
        onReject={(files) => {
          isValidFiles(files.map((item) => item.file));
        }}
        maxFiles={maximumUploads}
        maxSize={maxSize}
        classNames={{
          root: clsx(
            disabled &&
              "hover:bg-white cursor-not-allowed pointer-events-none",
            disabled && disabledDefaultCursor && "cursor-pointer",
            !!file?.length &&
              typeComponent === "single" &&
              "p-0 border-0 h-fit hover:bg-white",
          ),
          inner: "pointer-events-auto",
        }}
        activateOnClick={(() => {
          if (
            typeComponent === "multiple" &&
            file?.length < maximumUploads
          ) {
            return true;
          }

          if (
            file?.length === 0 ||
            file === null ||
            file === undefined
          ) {
            return true;
          }

          return false;
        })()}
        disabled={disabled}
      >
        <Group
          position="left"
          className={clsx(
            !!file?.length && typeComponent === "single"
              ? "h-fit"
              : "min-h-[220px]",
          )}
        >
          {disabled && (
            <Overlay color="gray" opacity={0.075} zIndex={0} />
          )}
          {file?.length ? (
            <>
              {(() => {
                switch (typeComponent) {
                  case "single":
                    return (
                      <SingleDocumentZone
                        disabled={disabled}
                        file={file}
                        setFile={setFile}
                        maximumUploads={maximumUploads}
                      />
                    );

                  case "multiple":
                    return (
                      <MultipleDocumentZone
                        files={file}
                        setFile={setFile}
                        orDescription={orDescription}
                        mimeTypes={acceptType}
                        maximumUploads={maximumUploads}
                        disabled={disabled}
                      />
                    );

                  case "videoType":
                    return (
                      <VideoComponentZone
                        fileVideo={file}
                        setFileVideo={setFile}
                        disabled={disabled}
                        thumbnail={thumbnail}
                      />
                    );

                  default:
                    return null;
                }
              })()}
            </>
          ) : (
            <DescriptionDropzone
              description={description}
              orDescription={orDescription}
            />
          )}
        </Group>
      </Dropzone>
    </>
  );
}

function SingleDocumentZone({ disabled, file, setFile }) {
  return (
    <div className="flex justify-between items-center w-full px-3 py-2 border border-grey rounded-md">
      <div className="flex gap-2 items-center">
        <Icon
          icon="ic:baseline-insert-drive-file"
          className="text-darkGrey"
        />
        <p className="text-medium text-darkGrey">{file?.[0]?.name}</p>
      </div>
      <ActionIcon
        color="gray"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation();
          setFile([]);
        }}
        disabled={disabled}
      >
        <Icon icon="bi:x" width={30} />
      </ActionIcon>
    </div>
  );
}

function MultipleDocumentZone({
  files,
  setFile,
  returnNullIfEmpty = false,
  orDescription,
  maximumUploads = 3,
  mimeTypes,
  maxSize,
  disabled,
}) {
  const previews = files?.map((file, index) => {
    const newFile = Object.assign(file, { id: index });
    const fileType =
      newFile?.type?.split("/")[1] || newFile?.type?.split("/")[0];
    const imageUrl = (() => {
      if (["jpg", "jpeg", "png"].includes(fileType)) {
        if (file instanceof File) return URL.createObjectURL(newFile);
        return newFile?.url;
      }
      return null;
    })();

    return (
      <Card
        key={newFile?.id}
        shadow="sm"
        className="h-[256px] overflow-visible cursor-pointer"
        radius="md"
        withBorder
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openInNewTab(file?.url);
        }}
      >
        {!disabled && (
          <ActionIcon
            id={index}
            className="absolute -top-2 -right-2 bg-gray-50 rounded-3xl border-[.4px]  border-gray-500"
            variant="filled"
            disabled={disabled}
          >
            <Icon
              icon="material-symbols:close"
              color="red"
              width="40"
              height="40"
              id={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const newFiles = files.filter(
                  ({ id }) => +id !== +e.target.id,
                );
                if (!returnNullIfEmpty) return setFile(newFiles);
                if (newFiles?.length === 0) return setFile([]);
                setFile(newFiles);
              }}
            />
          </ActionIcon>
        )}
        <Card.Section className="py-2 px-4 overflow-x-hidden">
          {["jpg", "jpeg", "png"].includes(fileType) ? (
            <img
              alt={newFile?.name}
              src={imageUrl}
              className="w-[300px] max-h-[210px] object-cover"
            />
          ) : (
            <FileTypeIcon type={fileType} />
          )}
          <Text
            className="mt-2 text-sm break-all truncate"
            weight={500}
          >
            {newFile?.name}
          </Text>
        </Card.Section>
      </Card>
    );
  });

  const cols = 4;
  const filledCols = files.length % cols;
  const dropzoneColSpan = cols - filledCols;

  return (
    <SimpleGrid
      cols={cols}
      breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      mt={previews?.length > 0 ? "xl" : 0}
    >
      {previews}
      {files?.length <= maximumUploads - 1 && (
        <Dropzone
          activateOnClick={false}
          onDrop={async (item) => {
            if (files?.length + item?.length > maximumUploads) return;
            const addNewItem = [...files, ...item];
            setFile(addNewItem);
          }}
          onReject={() => {
            setFile([]);
          }}
          multiple={maximumUploads > 1}
          maxFiles={maximumUploads}
          maxSize={maxSize || 10 * 1024 ** 2}
          accept={mimeTypes}
          styles={{
            root: {
              gridColumn: `span ${dropzoneColSpan} / span ${dropzoneColSpan}`,
            },
          }}
          classNames={{
            inner: "pointer-events-auto",
          }}
        >
          <Group
            position="left"
            style={{
              minHeight: 220,
            }}
          >
            <DescriptionDropzone orDescription={orDescription} />
          </Group>
        </Dropzone>
      )}
    </SimpleGrid>
  );
}

function VideoComponentZone({
  fileVideo,
  setFileVideo,
  disabled,
  thumbnail,
}) {
  const [videoThumb, setvideoThumb] = useState(thumbnail);

  const generateThumbnail = useCallback(
    async (files) => {
      if (thumbnail) return;
      const [file] = files;
      const isUrl = VALIDATION_REGEX.url.test(file?.url);
      const fileUrl = isUrl ? file?.url : URL.createObjectURL(file);
      const thumbUrl = await getThumbnailForVideo(fileUrl);
      setvideoThumb(thumbUrl);
    },
    [thumbnail],
  );

  useEffect(() => {
    if (fileVideo?.length !== 0) generateThumbnail(fileVideo);
  }, [fileVideo]);

  return (
    <Card
      shadow="sm"
      className="overflow-visible"
      radius="md"
      withBorder
    >
      <ActionIcon
        className="absolute -top-2 -right-2 bg-gray-50 rounded-3xl border-[.4px]  border-gray-500"
        variant="filled"
        onClick={disabled ? () => {} : () => setFileVideo([])}
      >
        <Icon
          icon="material-symbols:close"
          color="red"
          width="40"
          height="40"
        />
      </ActionIcon>
      <Card.Section className="py-2 px-4">
        <img
          src={videoThumb}
          className="aspect-video h-[200px] object-contain"
          alt="vid-thumb"
        />
        <Text
          className="mt-2 text-sm break-all truncate"
          weight={500}
        >
          {fileVideo[0]?.name}
        </Text>
      </Card.Section>
    </Card>
  );
}

function DescriptionDropzone({ description, orDescription }) {
  return (
    <div className="flex justify-center flex-col items-center w-full">
      <UploadIconNew />
      <Text
        size="xl"
        inline
        className="font-semibold mt-4 text-center"
      >
        {description || (
          <>
            Letakkan file di sini atau{" "}
            <span className="text-primary3">Cari File</span>
          </>
        )}
      </Text>
      <Text
        size="sm"
        color="dimmed"
        inline
        className="m-2 font-light text-darkGrey text-center"
      >
        {orDescription}
      </Text>
    </div>
  );
}

export { CustomMantineDropzone, UploadZone };

UploadZone.propTypes = {
  file: PropTypes.oneOfType([PropTypes.array]),
  setFile: PropTypes.func.isRequired,
  acceptType: PropTypes.oneOfType([PropTypes.array]),
  idleStateElement: PropTypes.oneOfType([PropTypes.element]),
  unsupportedMessage: PropTypes.string,
};

UploadZone.defaultProps = {
  file: null,
  acceptType: [
    MIME_TYPES.xls,
    MIME_TYPES.xlsx,
    MIME_TYPES.pdf,
    MIME_TYPES.doc,
    MIME_TYPES.docx,
    MIME_TYPES.ppt,
    MIME_TYPES.pptx,
    MIME_TYPES.png,
    MIME_TYPES.jpeg,
    MIME_TYPES.gif,
  ],
  idleStateElement: (
    <div className="flex items-center flex-col gap-2">
      <Icon
        className="text-primary3 mx-auto"
        icon="tabler:file"
        width="90"
      />
      <span className="text-darkGrey text-lg font-medium">
        Drop your file here or
        <span className="text-primary3"> browse</span>
      </span>
    </div>
  ),
  unsupportedMessage: fileNotSupported,
};

CustomMantineDropzone.propTypes = {
  file: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setFile: PropTypes.func.isRequired,
  acceptType: PropTypes.oneOfType([PropTypes.array]),
  maxSize: PropTypes.number,
  orDescription: PropTypes.string,
  disabled: PropTypes.bool,
  onRejectValue: PropTypes.oneOfType([PropTypes.array]),
  typeComponent: PropTypes.string,
  maximumUploads: PropTypes.number,
};

CustomMantineDropzone.defaultProps = {
  acceptType: [
    MIME_TYPES.xls,
    MIME_TYPES.xlsx,
    MIME_TYPES.pdf,
    MIME_TYPES.doc,
    MIME_TYPES.docx,
    MIME_TYPES.ppt,
    MIME_TYPES.pptx,
    MIME_TYPES.gif,
    MIME_TYPES.png,
    MIME_TYPES.jpeg,
  ],
  maxSize: 10 * 1024 ** 2,
  orDescription:
    "1600x1200 or higher recommended. Maximum uploaded file 2MB",
  disabled: false,
  onRejectValue: [],
  typeComponent: "single",
  maximumUploads: 1,
};
