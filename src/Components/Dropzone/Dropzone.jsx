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
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import UploadIconNew from "../Assets/Icon/UploadIconNew";
import FileTypeIcon from "../FileTypeIcon/FileTypeIcon";
import bytesToSize from "../../Utils/Helpers/byteToSize";
import getThumbnailForVideo from "../../Utils/Helpers/getThumbnailVideo";
import mimeTypeToReadable from "../../Utils/Helpers/mimeTypeToReadable";
import openInNewTab from "../../Utils/Helpers/openInNewTab";
import clsx from "clsx";

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
          <div className="flex flex-col items-center gap-2">
            <FileTypeIcon type={fileType} />
            {file !== null && <span>{file[0].name}</span>}
          </div>
        ) : (
          <>
            <Dropzone.Accept>{idleStateElement}</Dropzone.Accept>
            <Dropzone.Reject>
              <div className="grid gap-2 justify-items-center">
                <Icon icon="tabler:x" color="#e73030" width={45} />
                <p className="text-center text-red-500">
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
          className="p-4 my-4"
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
          console.log("Files dropped:", files);
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

export function SingleDocumentZone({
  disabled,
  file,
  setFile,
  onClick = () => null,
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center justify-between w-full px-3 py-2 border rounded-md border-grey",
        onClick ? "cursor-pointer" : "",
      )}
    >
      <div className="flex items-center gap-2">
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
        <Card.Section className="px-4 py-2 overflow-x-hidden">
          {["jpg", "jpeg", "png"].includes(fileType) ? (
            <img
              alt={newFile?.name}
              src={imageUrl}
              className="w-[300px] object-cover"
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

  return (
    <SimpleGrid
      cols={4}
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

function VideoComponentZone({ fileVideo, setFileVideo, disabled }) {
  const [videoThumb, setvideoThumb] = useState(null);

  const generateThumbnail = useCallback(async (files) => {
    const [file] = files;
    const fileUrl = URL.createObjectURL(file);
    const thumbUrl = await getThumbnailForVideo(fileUrl);
    setvideoThumb(thumbUrl);
  }, []);

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
      <Card.Section className="px-4 py-2">
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
    <div className="flex flex-col items-center justify-center w-full">
      <UploadIconNew />
      <Text size="xl" inline className="mt-4 font-semibold">
        {description || (
          <>
            Letakkan dokumen di sini atau{" "}
            <span className="text-primary3">Cari Dokumen</span>
          </>
        )}
      </Text>
      <Text
        size="sm"
        color="dimmed"
        inline
        className="m-2 font-light text-center text-darkGrey"
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
    <div className="flex flex-col items-center gap-2">
      <Icon
        className="mx-auto text-primary3"
        icon="tabler:file"
        width="90"
      />
      <span className="text-lg font-medium text-darkGrey">
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
