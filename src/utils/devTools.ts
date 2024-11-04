import html2canvas from 'html2canvas';

const setupScreenshotListener = () => {
 window.addEventListener('message', async (event) => {
   // Only handle takeSnapshot requests from localhost
   if (event.origin !== 'http://localhost' || 
       event.data.type !== 'takeSnapshot' || 
       !event.source) {
     return;
   }

   try {
     const canvas = await html2canvas(document.documentElement, {
       useCORS: true,
       scale: 1,
       windowWidth: window.innerWidth,
       windowHeight: window.innerHeight
     });
     
     event.source.postMessage({
       type: 'snapshot',
       imageData: canvas.toDataURL('png')
     }, event.origin);
     
   } catch (err) {
     event.source.postMessage({
       type: 'snapshot_error',
       error: err.message
     }, event.origin);
   }
 });
};

export const initDevTools = () => {
 if (import.meta.env.DEV) {
   setupScreenshotListener();
 }
};