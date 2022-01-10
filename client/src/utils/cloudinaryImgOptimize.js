// optimize images
export const imgOptimize = (originSrc, width = 0, height = 0, quality) => {
  if (!originSrc) return '';

  const cloudinaryBaseURL = 'http://res.cloudinary.com/duy-do/image/upload';
  const checkURL = originSrc.indexOf(cloudinaryBaseURL);

  if (checkURL === -1) {
    return originSrc;
  }

  const maxWidth = 400;
  const maxHeight = 300;
  const ratio = maxWidth / width < maxHeight / height ? maxWidth / width : maxHeight / height;

  if (width > maxWidth || height > maxHeight) {
    width = width * ratio;
    height = height * ratio;
  }

  let optimize = `${width ? `w_${width}` : ''}/${height ? `h_${height}` : ''}/${quality ? `q_${quality}` : 'q_auto'}`;

  if (optimize[optimize.length - 1] === '/') optimize = optimize.slice(0, optimize.length - 1);

  return originSrc.replace(cloudinaryBaseURL, `${cloudinaryBaseURL}/${optimize}`);
};
