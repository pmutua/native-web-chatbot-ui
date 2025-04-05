export class ResizableHandle {
    static create(container, onResize) {
      const handle = document.createElement('div');
      handle.className = 'resize-handle';
  
      let isResizing = false;
      let startX = 0;
      let startWidth = 0;
  
      handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = container.offsetWidth;
        document.documentElement.style.cursor = 'col-resize';
  
        const mouseMove = (e) => {
          if (!isResizing) return;
          const newWidth = startWidth + (e.clientX - startX);
          onResize(Math.min(Math.max(newWidth, 200), window.innerWidth - 40));
        };
  
        const mouseUp = () => {
          isResizing = false;
          document.documentElement.style.cursor = '';
          document.removeEventListener('mousemove', mouseMove);
          document.removeEventListener('mouseup', mouseUp);
        };
  
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
      });
  
      return handle;
    }
  }
  