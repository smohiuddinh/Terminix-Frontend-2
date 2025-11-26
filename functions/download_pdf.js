// utils/downloadFile.js

export const downloadFile = (fileUrl, filename = 'candidate-resume') => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
