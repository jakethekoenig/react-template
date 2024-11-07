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
     
     (event.source as Window).postMessage({
       type: 'snapshot',
       imageData: canvas.toDataURL('png')
     }, '*');
     
   } catch (err: unknown) {
     (event.source as Window).postMessage({
       type: 'snapshot_error',
       error: err instanceof Error ? err.message : String(err)
     }, '*');
   }
 });
};

export const initDevTools = () => {
 if (import.meta.env.DEV) {
   setupScreenshotListener();
 }
};