import React from "react";

function PDFViewer({ fileUrl }) {
  return (
    <embed src={fileUrl} type="application/pdf" width="100%" height="100%" />
  );
}

export default PDFViewer;
