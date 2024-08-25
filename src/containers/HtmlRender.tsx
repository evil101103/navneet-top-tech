import React from "react";
import { sanitizeHtml } from "../utils/sanitizeHTML";

interface HtmlRendererProps {
  htmlContent: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlContent }) => {
  const sanitizedHtml = sanitizeHtml(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default HtmlRenderer;
