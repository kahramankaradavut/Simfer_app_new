import {
  CapacitorBarcodeScannerScanOrientation,
  Html5Qrcode
} from "./chunk-G5ODFC7U.js";
import {
  WebPlugin
} from "./chunk-2BX24SOZ.js";
import {
  __async
} from "./chunk-UL2P3LPA.js";

// node_modules/@capacitor/barcode-scanner/dist/esm/web.js
var CapacitorBarcodeScannerWeb = class extends WebPlugin {
  /**
   * Stops the barcode scanner and hides its UI.
   * @private
   * @returns {Promise<void>} A promise that resolves when the scanner has stopped and its UI is hidden.
   */
  stopAndHideScanner() {
    return __async(this, null, function* () {
      console.log(window.OSBarcodeWebScanner);
      if (window.OSBarcodeWebScanner) {
        yield window.OSBarcodeWebScanner.stop();
        window.OSBarcodeWebScanner = null;
      }
      document.getElementById("cap-os-barcode-scanner-container-dialog").style.display = "none";
    });
  }
  /**
   * Builds the HTML elements necessary for the barcode scanner UI.
   * This method checks if the scanner container exists before creating it to avoid duplicates.
   * It also sets up the close button to stop and hide the scanner on click.
   * @private
   */
  buildScannerElement() {
    if (document.getElementById("cap-os-barcode-scanner-container")) {
      document.getElementById("cap-os-barcode-scanner-container").className = "scanner-container-display";
      return;
    }
    const caposbarcodescannercontainer = document.body.appendChild(document.createElement("div"));
    caposbarcodescannercontainer.id = "cap-os-barcode-scanner-container";
    const caposbarcodescannercontainerdialog = document.createElement("div");
    caposbarcodescannercontainerdialog.id = "cap-os-barcode-scanner-container-dialog";
    caposbarcodescannercontainerdialog.className = "scanner-dialog";
    const caposbarcodescannercontainerdialoginner = document.createElement("div");
    caposbarcodescannercontainerdialoginner.className = "scanner-dialog-inner";
    const caposbarcodescannercontainerdialoginnerclose = document.createElement("span");
    caposbarcodescannercontainerdialoginnerclose.className = "close-button";
    caposbarcodescannercontainerdialoginnerclose.innerHTML = "&times;";
    caposbarcodescannercontainerdialoginner.appendChild(caposbarcodescannercontainerdialoginnerclose);
    const caposbarcodescannercontainerdialoginnercontainerp = document.createElement("p");
    caposbarcodescannercontainerdialoginnercontainerp.innerHTML = "&nbsp;";
    caposbarcodescannercontainerdialoginner.appendChild(caposbarcodescannercontainerdialoginnercontainerp);
    const caposbarcodescannercontainerdialoginnercontainer = document.createElement("div");
    caposbarcodescannercontainerdialoginnercontainer.className = "scanner-container-full-width";
    caposbarcodescannercontainerdialoginnercontainer.id = "cap-os-barcode-scanner-container-scanner";
    caposbarcodescannercontainerdialoginner.appendChild(caposbarcodescannercontainerdialoginnercontainer);
    caposbarcodescannercontainerdialog.appendChild(caposbarcodescannercontainerdialoginner);
    caposbarcodescannercontainer.appendChild(caposbarcodescannercontainerdialog);
    caposbarcodescannercontainerdialoginnerclose.onclick = this.stopAndHideScanner;
  }
  /**
   * Initiates a barcode scan using the user's camera and HTML5 QR code scanner.
   * Displays the scanner UI and waits for a scan to complete or fail.
   * @param {OSBarcodeScanOptions} options Configuration options for the scan, including camera direction and UI preferences.
   * @returns {Promise<OSBarcodeScanResult>} A promise that resolves with the scan result or rejects with an error.
   */
  scanBarcode(options) {
    return __async(this, null, function* () {
      this.buildScannerElement();
      document.getElementById("cap-os-barcode-scanner-container-dialog").style.display = "block";
      return new Promise((resolve, reject) => {
        var _a, _b;
        const param = {
          facingMode: options.cameraDirection === 1 ? "environment" : "user",
          hasScannerButton: false,
          scanButton: options.scanButton === void 0 ? false : options.scanButton,
          showScanLine: false,
          scanInstructions: options.scanInstructions ? options.scanInstructions : "",
          orientation: options.scanOrientation ? options.scanOrientation : CapacitorBarcodeScannerScanOrientation.PORTRAIT,
          showCameraSelection: ((_a = options.web) === null || _a === void 0 ? void 0 : _a.showCameraSelection) ? options.web.showCameraSelection : false,
          typeHint: options.hint === 17 ? void 0 : options.hint,
          scannerFPS: ((_b = options.web) === null || _b === void 0 ? void 0 : _b.scannerFPS) ? options.web.scannerFPS : 50
        };
        const scannerElement = document.getElementById("cap-os-barcode-scanner-container-scanner");
        if (!scannerElement) {
          throw new Error("Scanner Element is required for web");
        }
        window.OSBarcodeWebScanner = new Html5Qrcode(scannerElement.id);
        const Html5QrcodeConfig = {
          fps: param.scannerFPS,
          qrbox: scannerElement.getBoundingClientRect().width * (9 / 16) - 10,
          aspectRatio: 16 / 9,
          videoConstraints: {
            focusMode: "continuous",
            height: {
              min: 576,
              ideal: 1920
            },
            deviceId: void 0,
            facingMode: void 0
          }
        };
        const OSBarcodeWebScannerSuccessCallback = (decodedText, _decodedResult) => {
          this.stopAndHideScanner();
          resolve({
            ScanResult: decodedText
          });
        };
        const OSBarcodeWebScannerErrorCallback = (error) => {
          if (error.indexOf("NotFoundException") === -1 && error.indexOf("No barcode or QR code detected") === -1) {
            this.stopAndHideScanner();
            console.error(`[Scanner Web Error] ${error}`);
            reject(error);
          }
        };
        window.OSBarcodeWebScanner.start({
          facingMode: param.facingMode
        }, Html5QrcodeConfig, OSBarcodeWebScannerSuccessCallback, OSBarcodeWebScannerErrorCallback);
      });
    });
  }
};
export {
  CapacitorBarcodeScannerWeb
};
//# sourceMappingURL=web-M4XDYHYX.js.map
