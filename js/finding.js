new Vue({
    el: ".app",
    data: {
      x: 0,
      y: 0
    },
    methods: {
      setWinSize() {
        this.winSize = {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      setPos(pos) {
        const minX = 0;
        const minY = 0;
  
        const maxX = Math.max(this.winSize.width - this.elSize.width, 0);
        const maxY = Math.max(this.winSize.height - this.elSize.height, 0);
  
        const x = Math.min(Math.max(minX, pos.x), maxX);
        const y = Math.min(Math.max(minY, pos.y), maxY);
  
        this.x = x;
        this.y = y;
      },
      mousedown(e) {
        this.isDragging = true;
        const { clientX, clientY } = e;
        this.clientPos = {
          x: clientX,
          y: clientY
        };
        this.startPos = {
          x: this.x,
          y: this.y
        };
      },
      mousemove(e) {
        if (!this.isDragging) {
          return;
        }
  
        const x = e.clientX - this.clientPos.x + this.startPos.x;
        const y = e.clientY - this.clientPos.y + this.startPos.y;
  
        this.setPos({
          x,
          y
        });
      },
      mouseup() {
        this.isDragging = false;
      }
    },
    created() {
      this.isDragging = false;
      this.clientPos = { x: 0, y: 0 };
      this.startPos = { x: 0, y: 0 };
  
      this.elSize = {
        width: 0,
        height: 0
      };
  
      this.winSize = {
        width: 0,
        height: 0
      };
    },
    mounted() {
      const { width, height } = this.$refs.el.getBoundingClientRect();
  
      this.elSize = {
        width,
        height
      };
  
      window.addEventListener("resize", () => {
        this.setWinSize();
        this.setPos({
          x: this.x,
          y: this.y
        });
      });
  
      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("mouseup", this.mouseup);
  
      this.setWinSize();
    }
  });
  