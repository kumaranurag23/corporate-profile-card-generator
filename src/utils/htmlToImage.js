import html2canvas from 'html2canvas';

export const downloadCardAsImage = (elementId, fileName) => {
  const element = document.getElementById(elementId);
  html2canvas(element).then((canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = fileName || 'profile-card.png';
    link.click();
  });
};