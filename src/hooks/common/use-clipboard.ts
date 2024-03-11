import { useState } from "react";
import useTimeout from "./use-timeout";

const ERROR = "Unable to copy";

/**
 * A custom hook for clipboard functionality.
 *
 * @returns {object} An object containing the following properties:
 *    - `copied` (boolean): Indicates whether the text has been successfully copied to the clipboard.
 *    - `copyToClipboard` (function): A function that copies the specified text to the clipboard.
 *    - `error` (string): An error message, if any error occurred during the copy operation.
 */
const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const setCopiedToFalse = () => setCopied(false);
  const { set } = useTimeout({ callback: setCopiedToFalse, delay: 1500 });
  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          set();
        })
        .catch((error) => {
          setError(ERROR);
          console.error(ERROR, error);
        });
    }
  };
  return { copied, copyToClipboard, error };
};

export default useClipboard;
