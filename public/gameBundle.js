(()=>{"use strict";class e{constructor(e){this.graphicsConfig=e,this.components=[],document.documentElement.style.height="100%",document.documentElement.style.width="100%",document.body.style.height="100%",document.body.style.width="100%",document.body.style.margin="0",this.setup(),this.div=this.generateDiv(this.graphicsConfig.parent)}update(e){for(var t of this.components)t.update(e)}generateDiv(e){var t=document.createElement("div");return t.id=e,t.style.position="absolute",t.style.height="100%",t.style.width="100%",t.style.zIndex="1",t.style.backgroundImage="/images/test.jpg",t.appendChild(this.generateCanvas()),document.body.appendChild(t),console.log("test"),t}generateCanvas(){var e=document.createElement("CANVAS");return e.id=this.graphicsConfig.canvasID,console.log(this.parseStyle(this.graphicsConfig.style)),console.log("Before"),e.setAttribute("style",this.parseStyle(this.graphicsConfig.style)),e}getCtx(){return this.getCanvas().getContext("2d")}getCanvas(){var e=document.getElementById(this.graphicsConfig.canvasID);if(e instanceof HTMLCanvasElement)return e;throw Error("engineCanvas should be a reserved id for DOM Components")}parseStyle(e){var t=Object.entries(e).map((([e,t])=>e+":"+t+";"));return console.log(this.graphicsConfig.parent),t.join(" ")}setup(){var e=new Image;e.src="/images/test.jpg",e.style.position="absolute",e.style.zIndex="-1",e.style.width="100%",e.style.height="100%",document.body.appendChild(e)}}class t{constructor(){this.components=[]}update(e){for(var t of this.components)t.update(e)}}class s{constructor(e="engineDiv",t="engineCanvas",s={},n){this.parent=e,this.canvasID=t,this.style=s,this.background=n}}class n{}class i{constructor(e=[],t=0){0==e.length?this.scenes=[]:this.scenes=e,this.currentIdx=t}switchScenes(e){return this.currentIdx=e,this.getCurrentScene()}getCurrentScene(){return this.scenes[this.currentIdx]}getCurrentEntities(){return this.scenes[this.currentIdx].entities}addCurrentEntity(e){}}class r{constructor(s=new n){this.canvasID="engineCanvas",this.sceneManager=new i,this.systems=[],this.engineConfig=s,this.engineConfig.physicsConfig&&this.systems.push(new t),this.engineConfig.graphicsConfig&&this.systems.push(new e(this.engineConfig.graphicsConfig)),this.running=!1}start(){for(this.running=!0;this.running;);}}window.onload=()=>{new r({physicsConfig:{},graphicsConfig:new s("test","193as",{"background-color":"blue"})})}})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0QsWUFBWUksU0FFeENDLGlCQUFpQkMsS0NqQmQsTUFBTUMsRUFDVC9ELFlBQVlnRSxFQUFhLElBQUliLEdBQ3pCakQsS0FBSzBCLFNBQVcsZUFDaEIxQixLQUFLK0QsYUFBZSxJQUFJYixFQUN4QmxELEtBQUtnRSxRQUFVLEdBQ2ZoRSxLQUFLaUUsYUFBZUgsRUFDaEI5RCxLQUFLaUUsYUFBYUMsZUFDbEJsRSxLQUFLZ0UsUUFBUUcsS0FBSyxJQUFJckIsR0FFdEI5QyxLQUFLaUUsYUFBYWxFLGdCQUNsQkMsS0FBS2dFLFFBQVFHLEtBQUssSUFBSXRFLEVBQWVHLEtBQUtpRSxhQUFhbEUsaUJBRTNEQyxLQUFLb0UsU0FBVSxFQTJFbkJDLFFBRUksSUFEQXJFLEtBQUtvRSxTQUFVLEVBQ1JwRSxLQUFLb0UsWUMzRnBCRSxPQUFPQyxPQUFTLEtBdUNDLElBQUlWLEVBQU8sQ0FDcEJLLGNBQWUsR0FDZm5FLGVBQWdCLElBQUlnRCxFQUFlLE9BQVEsUUFBUyxDQUFFLG1CQUFvQixhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVybi1iYWNrZW5kLXN0YXJ0ZXIta2l0Ly4vZGlzdC9lbmdpbmUvc3JjL2dyYXBoaWNzL0dyYXBoaWNFbmdpbmUuanMiLCJ3ZWJwYWNrOi8vbWVybi1iYWNrZW5kLXN0YXJ0ZXIta2l0Ly4vZGlzdC9lbmdpbmUvc3JjL3BoeXNpY3MvUGh5c2ljc0VuZ2luZS5qcyIsIndlYnBhY2s6Ly9tZXJuLWJhY2tlbmQtc3RhcnRlci1raXQvLi9kaXN0L2VuZ2luZS9zcmMvdHlwZXMvY29uZmlnLmpzIiwid2VicGFjazovL21lcm4tYmFja2VuZC1zdGFydGVyLWtpdC8uL2Rpc3QvZW5naW5lL3NyYy9jb3JlL21hbmFnZXJzL1NjZW5lTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9tZXJuLWJhY2tlbmQtc3RhcnRlci1raXQvLi9kaXN0L2VuZ2luZS9zcmMvY29yZS9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vbWVybi1iYWNrZW5kLXN0YXJ0ZXIta2l0Ly4vZGlzdC9HYW1lRnJvbnRlbmQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdyYXBoaWNzRW5naW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKGdyYXBoaWNzQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljc0NvbmZpZyA9IGdyYXBoaWNzQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuZGl2ID0gdGhpcy5nZW5lcmF0ZURpdih0aGlzLmdyYXBoaWNzQ29uZmlnLnBhcmVudCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBmb3IgKHZhciBjb21wIG9mIHRoaXMuY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBjb21wLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVEaXYocGFyZW50KSB7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRpdi5pZCA9IHBhcmVudDtcclxuICAgICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS56SW5kZXggPSBcIjFcIjtcclxuICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCIvaW1hZ2VzL3Rlc3QuanBnXCI7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuZ2VuZXJhdGVDYW52YXMoKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVDYW52YXMoKSB7XHJcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJDQU5WQVNcIik7XHJcbiAgICAgICAgY2FudmFzLmlkID0gdGhpcy5ncmFwaGljc0NvbmZpZy5jYW52YXNJRDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcnNlU3R5bGUodGhpcy5ncmFwaGljc0NvbmZpZy5zdHlsZSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3JlXCIpO1xyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5wYXJzZVN0eWxlKHRoaXMuZ3JhcGhpY3NDb25maWcuc3R5bGUpKTtcclxuICAgICAgICByZXR1cm4gY2FudmFzO1xyXG4gICAgfVxyXG4gICAgZ2V0Q3R4KCkge1xyXG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzLmdldENhbnZhcygpO1xyXG4gICAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2FudmFzKCkge1xyXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdyYXBoaWNzQ29uZmlnLmNhbnZhc0lEKTtcclxuICAgICAgICBpZiAoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbnZhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiZW5naW5lQ2FudmFzIHNob3VsZCBiZSBhIHJlc2VydmVkIGlkIGZvciBET00gQ29tcG9uZW50c1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYXJzZVN0eWxlKHN0eWxlT2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIGNzc0FycmF5ID0gT2JqZWN0LmVudHJpZXMoc3R5bGVPYmplY3QpLm1hcCgoW2ssIHZdKSA9PiBrICsgXCI6XCIgKyB2ICsgXCI7XCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JhcGhpY3NDb25maWcucGFyZW50KTtcclxuICAgICAgICByZXR1cm4gY3NzQXJyYXkuam9pbihcIiBcIik7XHJcbiAgICB9XHJcbiAgICBzZXR1cCgpIHtcclxuICAgICAgICBpZiAodHJ1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gXCIvaW1hZ2VzL3Rlc3QuanBnXCI7XHJcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgICAgICBpbWFnZS5zdHlsZS56SW5kZXggPSBcIi0xXCI7XHJcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R3JhcGhpY0VuZ2luZS5qcy5tYXAiLCJleHBvcnQgY2xhc3MgUGh5c2ljc0VuZ2luZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIGZvciAodmFyIGNvbXAgb2YgdGhpcy5jb21wb25lbnRzKSB7XHJcbiAgICAgICAgICAgIGNvbXAudXBkYXRlKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGh5c2ljc0VuZ2luZS5qcy5tYXAiLCIvKipcclxuICogRGVzY3JpYmVzIHRoZSBDU1MgcHJvcGVydGllcyBvZiB0aGUgY2FudmFzIGVsZW1lbnRcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQaHlzaWNzQ29uZmlnIHtcclxufVxyXG5leHBvcnQgY2xhc3MgR3JhcGhpY3NDb25maWcge1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50ID0gXCJlbmdpbmVEaXZcIiwgY2FudmFzSUQgPSBcImVuZ2luZUNhbnZhc1wiLCBzdHlsZSA9IHt9LCBiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5jYW52YXNJRCA9IGNhbnZhc0lEO1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBFbmdpbmVDb25maWcge1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi8uLi90eXBlcy9zY2VuZS5qc1wiO1xyXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lcyA9IFtdLCBpbmRleCA9IDApIHtcclxuICAgICAgICBpZiAoc2NlbmVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lcyA9IHNjZW5lcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SWR4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2hTY2VuZXMoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJZHggPSBpbmRleDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50U2NlbmUoKTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRTY2VuZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXNbdGhpcy5jdXJyZW50SWR4XTtcclxuICAgIH1cclxuICAgIGdldEN1cnJlbnRFbnRpdGllcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXNbdGhpcy5jdXJyZW50SWR4XS5lbnRpdGllcztcclxuICAgIH1cclxuICAgIGFkZEN1cnJlbnRFbnRpdHkoZW50aXR5KSB7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRGVmYXVsdFNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjZW5lTWFuYWdlci5qcy5tYXAiLCJpbXBvcnQgeyBHcmFwaGljc0VuZ2luZSB9IGZyb20gXCIuLi9ncmFwaGljcy9HcmFwaGljRW5naW5lLmpzXCI7XHJcbmltcG9ydCB7IFBoeXNpY3NFbmdpbmUgfSBmcm9tIFwiLi4vcGh5c2ljcy9QaHlzaWNzRW5naW5lLmpzXCI7XHJcbmltcG9ydCB7IEVuZ2luZUNvbmZpZyB9IGZyb20gXCIuLi90eXBlcy9jb25maWcuanNcIjtcclxuaW1wb3J0IHsgU2NlbmVNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlcnMvU2NlbmVNYW5hZ2VyLmpzXCI7XHJcbmV4cG9ydCBjbGFzcyBFbmdpbmUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZUNvbmZpZyA9IG5ldyBFbmdpbmVDb25maWcoKSkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzSUQgPSBcImVuZ2luZUNhbnZhc1wiO1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYW5hZ2VyID0gbmV3IFNjZW5lTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5naW5lQ29uZmlnID0gZ2FtZUNvbmZpZztcclxuICAgICAgICBpZiAodGhpcy5lbmdpbmVDb25maWcucGh5c2ljc0NvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN5c3RlbXMucHVzaChuZXcgUGh5c2ljc0VuZ2luZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZW5naW5lQ29uZmlnLmdyYXBoaWNzQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtcy5wdXNoKG5ldyBHcmFwaGljc0VuZ2luZSh0aGlzLmVuZ2luZUNvbmZpZy5ncmFwaGljc0NvbmZpZykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKlxyXG4gICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIlxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gXCIwXCJcclxuICAgICAgICB0aGlzLnNldHVwKClcclxuICAgICAgICB0aGlzLmRpdiA9IHRoaXMuZ2VuZXJhdGVEaXYodGhpcy5lbmdpbmVDb25maWcucGFyZW50KSA7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICBwYXJzZVN0eWxlKHN0eWxlT2JqZWN0OiBPYmplY3QpOiAgc3RyaW5nIHtcclxuICAgICAgICB2YXIgY3NzQXJyYXk6IHN0cmluZ1tdID0gT2JqZWN0LmVudHJpZXMoc3R5bGVPYmplY3QpLm1hcCgoW2ssdl0pID0+IGsgKyBcIjpcIiArIHYgKyBcIjtcIilcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVuZ2luZUNvbmZpZy5wYXJlbnQpXHJcbiAgICAgICAgcmV0dXJuIGNzc0FycmF5LmpvaW4oXCIgXCIpXHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgLyoqXHJcbiAgICBnZW5lcmF0ZURpdihwYXJlbnQ6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBkaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBkaXYuaWQgPSBwYXJlbnRcclxuICAgICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCJcclxuICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCJcclxuICAgICAgICBkaXYuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxyXG4gICAgICAgIGRpdi5zdHlsZS56SW5kZXggPSBcIjFcIlxyXG4gICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIi9pbWFnZXMvdGVzdC5qcGdcIlxyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLmdlbmVyYXRlQ2FudmFzKCkpXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKVxyXG4gICAgICAgIHJldHVybiBkaXZcclxuICAgIH1cclxuICAgIGdlbmVyYXRlQ2FudmFzKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkNBTlZBU1wiKVxyXG4gICAgICAgIGNhbnZhcy5pZCA9IHRoaXMuY2FudmFzSURcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcnNlU3R5bGUodGhpcy5lbmdpbmVDb25maWcuc3R5bGUpKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3JlXCIpXHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCB0aGlzLnBhcnNlU3R5bGUodGhpcy5lbmdpbmVDb25maWcuc3R5bGUpKVxyXG4gICAgICAgIHJldHVybiBjYW52YXNcclxuICAgIH1cclxuICAgIGdldEN0eCgpIHtcclxuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5nZXRDYW52YXMoKVxyXG4gICAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXHJcbiAgICB9XHJcbiAgICBnZXRDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQge1xyXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmNhbnZhc0lEKVxyXG4gICAgICAgIGlmIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FudmFzXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJlbmdpbmVDYW52YXMgc2hvdWxkIGJlIGEgcmVzZXJ2ZWQgaWQgZm9yIERPTSBDb21wb25lbnRzXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgKlxyXG4gICAgIFxyXG4gICAgc2V0dXAoKSB7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZW5naW5lQ29uZmlnXHJcbiAgICAgICAgaWYgKHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKClcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gXCIvaW1hZ2VzL3Rlc3QuanBnXCJcclxuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUucG9zaXRpb24gPVwiYWJzb2x1dGVcIlxyXG4gICAgICAgICAgICBpbWFnZS5zdHlsZS56SW5kZXggPSBcIi0xXCJcclxuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxyXG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5oZWlnaHQ9IFwiMTAwJVwiXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGltYWdlKVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZSAodGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVuZ2luZS5qcy5tYXAiLCJpbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiLi4vZW5naW5lL3NyYy9jb3JlL2VuZ2luZS5qc1wiO1xyXG5pbXBvcnQgeyBHcmFwaGljc0NvbmZpZyB9IGZyb20gXCIuLi9lbmdpbmUvc3JjL3R5cGVzL2NvbmZpZy5qc1wiO1xyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgIFxyXG4gICAgdmFyIHNvY2tldDogU29ja2V0ID0gaW8oKVxyXG5cclxuICAgIGxldCBDT05GSUc6IFBoYXNlci5UeXBlcy5Db3JlLkdhbWVDb25maWcgPSB7XHJcbiAgICAgICAgdHlwZTogUGhhc2VyLkFVVE8sXHJcbiAgICAgICAgdGl0bGU6ICd0ZXN0JyxcclxuICAgICAgICBwYXJlbnQ6ICdnYW1lJyxcclxuICAgICAgICBzY2VuZTogW1xyXG4gICAgICAgICAgICBuZXcgV2FpdGluZ1NjZW5lKHNvY2tldClcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNjYWxlOiB7XHJcbiAgICAgICAgICAgIG1vZGU6IFBoYXNlci5TY2FsZS5DRU5URVJfQk9USCxcclxuICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAtICh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSxcclxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC0gKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjM2FiYTNhXCIsXHJcbiAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUsXHJcblxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250YWluZXI6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKT0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCcpXHJcbiAgICAgICAgICAgIHZhciByb29tSWQ6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgICAgICAgICB2YXIgcm9vbUFycjogc3RyaW5nW10gID0gcm9vbUlkLnNwbGl0KFwiL1wiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyb29tQXJyW3Jvb21BcnIubGVuZ3RoLTFdKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyb29tSWQpXHJcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KFwiQWRkUGxheWVyXCIsIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiUGxheWVyTmFtZVwiKSwgcm9vbUFycltyb29tQXJyLmxlbmd0aC0xXSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBzb2NrZXQub24oXCJkaXNjb25uZWN0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc2Nvbm5lY3RlZCcpXHJcbiAgICAgICAgfSlcclxuICAgIHZhciBnYW1lOiBQaGFzZXIuR2FtZSA9IG5ldyBQaGFzZXIuR2FtZShDT05GSUcpXHJcbiAgICAqL1xyXG4gICAgdmFyIGVuZ2luZSA9IG5ldyBFbmdpbmUoe1xyXG4gICAgICAgIHBoeXNpY3NDb25maWc6IHt9LFxyXG4gICAgICAgIGdyYXBoaWNzQ29uZmlnOiBuZXcgR3JhcGhpY3NDb25maWcoXCJ0ZXN0XCIsIFwiMTkzYXNcIiwgeyBcImJhY2tncm91bmQtY29sb3JcIjogXCJibHVlXCIgfSlcclxuICAgIH0pO1xyXG59O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOlsiR3JhcGhpY3NFbmdpbmUiLCJjb25zdHJ1Y3RvciIsImdyYXBoaWNzQ29uZmlnIiwidGhpcyIsImNvbXBvbmVudHMiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlIiwiaGVpZ2h0Iiwid2lkdGgiLCJib2R5IiwibWFyZ2luIiwic2V0dXAiLCJkaXYiLCJnZW5lcmF0ZURpdiIsInBhcmVudCIsInVwZGF0ZSIsImR0IiwiY29tcCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInBvc2l0aW9uIiwiekluZGV4IiwiYmFja2dyb3VuZEltYWdlIiwiYXBwZW5kQ2hpbGQiLCJnZW5lcmF0ZUNhbnZhcyIsImNvbnNvbGUiLCJsb2ciLCJjYW52YXMiLCJjYW52YXNJRCIsInBhcnNlU3R5bGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRDdHgiLCJnZXRDYW52YXMiLCJnZXRDb250ZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJIVE1MQ2FudmFzRWxlbWVudCIsIkVycm9yIiwic3R5bGVPYmplY3QiLCJjc3NBcnJheSIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJrIiwidiIsImpvaW4iLCJpbWFnZSIsIkltYWdlIiwic3JjIiwiUGh5c2ljc0VuZ2luZSIsIkdyYXBoaWNzQ29uZmlnIiwiYmFja2dyb3VuZCIsIkVuZ2luZUNvbmZpZyIsIlNjZW5lTWFuYWdlciIsInNjZW5lcyIsImluZGV4IiwibGVuZ3RoIiwiY3VycmVudElkeCIsInN3aXRjaFNjZW5lcyIsImdldEN1cnJlbnRTY2VuZSIsImdldEN1cnJlbnRFbnRpdGllcyIsImVudGl0aWVzIiwiYWRkQ3VycmVudEVudGl0eSIsImVudGl0eSIsIkVuZ2luZSIsImdhbWVDb25maWciLCJzY2VuZU1hbmFnZXIiLCJzeXN0ZW1zIiwiZW5naW5lQ29uZmlnIiwicGh5c2ljc0NvbmZpZyIsInB1c2giLCJydW5uaW5nIiwic3RhcnQiLCJ3aW5kb3ciLCJvbmxvYWQiXSwic291cmNlUm9vdCI6IiJ9