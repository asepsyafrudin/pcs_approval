import React, { useEffect } from "react";
import { printPlugin } from "@react-pdf-viewer/print";
import "@react-pdf-viewer/print/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "react-bootstrap";
import "./pdfviewer.css";
import { MdPrint } from "react-icons/md";

function PDFViewer(props) {
  const printPluginInstance = printPlugin();
  const { print } = printPluginInstance;
  const renderPage = (props) => {
    return (
      <>
        {props.canvasLayer.children}
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        >
          <div
            style={{
              color: "rgba(0, 0, 0, 0.2)",
              fontSize: `${8 * props.scale}rem`,
              fontWeight: "bold",
              textTransform: "uppercase",
              transform: "rotate(-45deg)",
              userSelect: "none",
            }}
          >
            Approve
          </div>
        </div>
        {props.annotationLayer.children}
        {props.textLayer.children}
      </>
    );
  };

  const printDoc = () => {
    window.print();
  };

  return (
    <div className="pdf-view">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
        <div className="button-view">
          <Button variant="primary" onClick={printDoc}>
            <MdPrint style={{ marginRight: "10px" }} /> Print
          </Button>
        </div>
        <div className="pdf-viewer sectionPrint">
          <Viewer
            fileUrl={require("../../../asset/files/SYLVIA SOEKANDAR - Kui.pdf")}
            renderPage={renderPage}
            plugins={[printPluginInstance]}
          />
        </div>
      </Worker>
    </div>
  );
}

export default PDFViewer;
