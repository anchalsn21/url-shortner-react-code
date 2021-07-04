import React, { useState, useRef } from "react";
import "./App.css";
import { createUrl } from "./api/url";
import { showToastr } from "./utils/toastr";
import Header from "./components/Header";
import QRCode from "qrcode.react";
import ReactLoading from "react-loading";
import { Form, Button } from "react-bootstrap";

function App() {
  let [url, setUrl] = useState(null);
  let [shortUrl, setShortUrl] = useState(null);
  let [qrCode, setQrCode] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  const createShortUrl = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { data } = await createUrl({ url });
      setShortUrl(data?.url?.shortUrl);
      showToastr({
        type: "success",
        text: "Short url created Successfully",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showToastr({
        type: "error",
        text: "Something went wrong while creating ",
      });
    }
  };

  const generateQrCode = (u) => {
    //
    console.log({ u });
    setQrCode(true);
  };

  const copyTextToClipBoard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then((r) =>
        showToastr({ type: "success", text: "Copied Url successfully" })
      )
      .catch((e) =>
        showToastr({ type: "error", text: "Failed to copy text to clipboard" })
      );
  };

  const download = () => {
    const canvasImage = document.querySelector("canvas").toDataURL("image/png");
    // this can be used to download any image from webpage to local disk
    let xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = "image_name.png";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    xhr.open("GET", canvasImage); // This is to download the canvas Image
    xhr.send();
  };

  const ShowShortUrl = ({ genUrl }) => {
    return (
      <div className="show__short__url">
        <p>
          Short url is{" "}
          <mark
            title="Click to copy to clipboard"
            onClick={() => copyTextToClipBoard(genUrl)}
            id="gen__url"
          >
            {genUrl}
          </mark>
        </p>

        <div>
          <Button onClick={() => generateQrCode(genUrl)} variant="primary">
            Generate QR Code
          </Button>

          {qrCode ? (
            <>
              <div>
                <div className={"qr__code"}>
                  <QRCode value={genUrl} />
                </div>
                <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={download}
                >
                  Download QR
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="main ">
      <div className="main__header vertical__center">
        <Header />
      </div>
      <div className="url__form text-center">
        <Form onSubmit={createShortUrl}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter the URL below and generate short URL</Form.Label>
            <Form.Control
              type="url"
              name="url"
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="Enter Url"
            />
          </Form.Group>

          <Button variant="danger" type={isLoading ? "" : "reset"}>
            Clear
          </Button>

          <Button variant="success" type={isLoading ? "" : "submit"}>
            {isLoading ? "Genrating. . ." : "Generate shorten URL"}
          </Button>
        </Form>
      </div>

      {shortUrl ? <ShowShortUrl genUrl={shortUrl} /> : ""}
    </div>
  );
}

export default App;
