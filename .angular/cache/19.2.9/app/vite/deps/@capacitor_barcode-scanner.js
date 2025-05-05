import {
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
  CapacitorBarcodeScannerTypeHintALLOption
} from "./chunk-G5ODFC7U.js";
import {
  registerPlugin
} from "./chunk-2BX24SOZ.js";
import {
  __async
} from "./chunk-UL2P3LPA.js";

// node_modules/@capacitor/barcode-scanner/dist/esm/utils.js
var barcodeScannerCss = [{
  selector: ".scanner-container-display",
  css: "display: block;"
}, {
  selector: ".scanner-dialog",
  css: "display: none; position: fixed; z-index: 999; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4);"
}, {
  selector: ".scanner-dialog-inner",
  css: "background-color: #fefefe; margin: 2% auto; padding: 20px; border: 1px solid #888; width: 96%;"
}, {
  selector: ".close-button",
  css: "color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer;"
}, {
  selector: ".close-button:hover",
  css: "color: #222;"
}, {
  selector: ".scanner-container-full-width",
  css: "width: 100%;"
}];
function applyCss(cssRules) {
  const styleId = "custom-style-os-cap-barcode";
  let styleElement = document.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  if (styleElement.sheet) {
    while (styleElement.sheet.cssRules.length) {
      styleElement.sheet.deleteRule(0);
    }
    for (const {
      selector,
      css
    } of cssRules) {
      styleElement.sheet.insertRule(`${selector} { ${css} }`);
    }
  } else {
    styleElement.textContent = "";
    for (const {
      selector,
      css
    } of cssRules) {
      styleElement.textContent += `${selector} { ${css} }`;
    }
  }
}

// node_modules/@capacitor/barcode-scanner/dist/esm/index.js
var CapacitorBarcodeScannerImpl = registerPlugin("CapacitorBarcodeScanner", {
  web: () => {
    applyCss(barcodeScannerCss);
    return import("./web-M4XDYHYX.js").then((m) => new m.CapacitorBarcodeScannerWeb());
  }
});
var CapacitorBarcodeScanner = class {
  static scanBarcode(options) {
    return __async(this, null, function* () {
      options.scanInstructions = options.scanInstructions || " ";
      options.scanButton = options.scanButton || false;
      options.scanText = options.scanText || " ";
      options.cameraDirection = options.cameraDirection || CapacitorBarcodeScannerCameraDirection.BACK;
      options.scanOrientation = options.scanOrientation || CapacitorBarcodeScannerScanOrientation.ADAPTIVE;
      return CapacitorBarcodeScannerImpl.scanBarcode(options);
    });
  }
};
export {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerAndroidScanningLibrary,
  CapacitorBarcodeScannerCameraDirection,
  CapacitorBarcodeScannerScanOrientation,
  CapacitorBarcodeScannerTypeHint,
  CapacitorBarcodeScannerTypeHintALLOption
};
//# sourceMappingURL=@capacitor_barcode-scanner.js.map
