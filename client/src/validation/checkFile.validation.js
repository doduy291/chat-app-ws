const types = 'JPG,PNG,GIF,BMP,TIFF,ICO,PDF,EPS,PSD,SVG,WebP,JXR,WDP';
const maxSize = 5000000; // ~ 5mb

export const checkFile = (fileType, fileSize) => {
  // Check size
  if (fileSize > maxSize) {
    return {
      correct: false,
      msg: SizeErrorMsg(),
    };
  }

  // Check type
  if (!types.toLowerCase().includes(fileType)) {
    return {
      correct: false,
      msg: TypeErrorMsg(),
    };
  }
};

const SizeErrorMsg = () => (
  <>
    <span>Your file size is too large</span>
    <p>Max size is 5.00 MB</p>
  </>
);
const TypeErrorMsg = () => (
  <>
    <span>Not supported this file yet</span>
    <p>At present, only support PDF and other image files.</p>
  </>
);
