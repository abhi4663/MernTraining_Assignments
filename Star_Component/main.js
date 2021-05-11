class StarRating extends HTMLElement {
    constructor() {
      super(); 
      let score = this.getAttribute("score");    
      let total = this.getAttribute("total"); 
      let minimum = this.getAttribute("min");
  
      let rating = ((+score - +minimum) * 5) / (+total - +minimum);
      
      let value = Math.floor(rating);
      
      var template = "";
      for (let i = 0; i < value; i++) {
        template += `<i class="fa fa-star" aria-hidden="true"></i>`;
      }
  
      if (+rating % 1)
        template += `<i class="fa fa-star-half" aria-hidden="true"></i>`;
      this.innerHTML = template;
    }
  } 
  window.customElements.define("star-rating", StarRating);