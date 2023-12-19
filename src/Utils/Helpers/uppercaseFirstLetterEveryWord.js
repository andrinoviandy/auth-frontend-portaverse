/* eslint-disable no-unsafe-optional-chaining */
export default function uppercaseFirstLetterEveryWord(myString = "") {
  const toLower = myString?.toLowerCase()?.trim();
  const words = toLower?.split(" ");

  return words
    ?.map((word) => {
      return word?.[0]?.toUpperCase() + word?.substring(1);
    })
    ?.join(" ");
}
