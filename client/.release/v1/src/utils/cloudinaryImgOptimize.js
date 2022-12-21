// optimize images
export const imgOptimize = (originSrc, contentType = '', width = 0, height = 0, quality) => {
  if (!originSrc) return '';
  let typeSplit = contentType.split('/')[1];
  let delay;
  let flags;

  const cloudinaryBaseURL = 'http://res.cloudinary.com/duy-do/image/upload';
  const checkURL = originSrc.indexOf(cloudinaryBaseURL);

  if (checkURL === -1) {
    return originSrc;
  }

  // Optimize Width and Height
  const maxWidth = 400;
  const maxHeight = 300;
  const ratio = maxWidth / width < maxHeight / height ? maxWidth / width : maxHeight / height;

  if (width > maxWidth || height > maxHeight) {
    width = width * ratio;
    height = height * ratio;
  }

  // Optimize with file "gif"
  if (typeSplit === 'gif') {
    quality = 50;
    delay = 200;
    flags = true;
  }

  if (contentType === 'sharedImg') {
    width = 100;
    height = 100;
  }

  let optimize = `${width ? `w_${width}` : ''}/${height ? `h_${height}` : ''}/${quality ? `q_${quality}` : 'q_auto'}/${
    delay ? `dl_${delay}` : ''
  }/${flags ? 'fl_lossy' : ''}`;

  // Remove slash "/" in last line
  if (optimize[optimize.length - 1] === '/') optimize = optimize.slice(0, optimize.length - 1);

  return originSrc.replace(cloudinaryBaseURL, `${cloudinaryBaseURL}/${optimize}`);
};
