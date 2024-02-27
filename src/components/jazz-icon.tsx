import React, { useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";

type Props = {
  text: string;
  diameter?: number;
  className?: string;
};

/**
 * Generates a Jazzicon based on the provided text.
 *
 * @param {string} text - The text used to generate the Jazzicon.
 * @param {number} diameter - The diameter of the Jazzicon. Default is 20.
 * @param {string} className - Additional CSS class name for the container. Default is an empty string.
 */
const JazzIcon = ({ text, diameter = 20, className = "" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Generate a Jazzicon based on the text prop
      const seed = parseInt(text, 36); // Convert text to a numeric seed
      const icon = jazzicon(diameter, seed);
      // Clear the container before appending the new icon
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(icon);
    }
  }, [text, diameter]);

  return <div className={className} ref={containerRef} />;
};

export default JazzIcon;