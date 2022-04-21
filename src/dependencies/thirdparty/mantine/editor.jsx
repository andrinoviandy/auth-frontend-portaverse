import { RichTextEditor } from "@mantine/rte";
import { axiosNestClient } from "../../axios/nest/apiClient";

const initialValue = "<p><em>Type your text here . . .</em></p>";

const handleImageUpload = (file) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    axiosNestClient
      .post("/upload", formData)
      .then((res) => {
        resolve(res.data.data.file_url);
      })
      .catch(() => reject(new Error("Upload failed")));
  });

const MantineRTE = ({ payload, handleOnchange }) => {
  return (
    <RichTextEditor
      className="min-h-[60vh] mb-7"
      value={payload.knowledge_documentation.basic || initialValue}
      onImageUpload={handleImageUpload}
      onChange={(e) =>
        handleOnchange(e, "knowledge_documentation", "basic")
      }
    />
  );
};

export default MantineRTE;
