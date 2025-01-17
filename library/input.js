class Input extends HTMLElement{
  constructor(){
    super();
    this.rendered = false;
  };

  render(){
    this.prefixAttribute = String(this.getAttribute('prefix')).trim();
    this.suffixAttribute = String(this.getAttribute('suffix')).trim();
    this.typeAttribute = String(this.getAttribute('type')).trim();
    this.placeholderAttribute = String(this.getAttribute('placeholder')).trim();

    // prefix icon
    if(this.prefixAttribute && this.prefixAttribute !== 'null'){
      this.prefixHTML =`
        <svg class="prefix"><use href="#${this.prefixAttribute}"/></svg>`;}
    else this.prefixHTML = '';

    // suffix icon
    if(this.suffixAttribute && this.suffixAttribute !== 'null'){
      this.suffixHTML =`
        <svg class="suffix"><use href="#${this.suffixAttribute}"/></svg>`;}
    else this.suffixHTML = '';

    // type
    if(this.typeAttribute && this.typeAttribute !== 'null'){
      this.typeHTML =` type="${this.typeAttribute}"`;}
    else this.typeHTML = '';

    // placeholder
    if(this.placeholderAttribute && this.placeholderAttribute !== 'null'){
      this.placeholderHTML =` placeholder="${this.placeholderAttribute}"`;}
    else this.placeholderHTML = '';

    // input
    this.inputHTML =`<input${this.typeHTML}${this.placeholderHTML}>`;

    // build
    this.innerHTML =`
      ${this.prefixHTML}
      ${this.inputHTML}
      ${this.suffixHTML}
    `;
   
    this.querySelector('input').addEventListener('focus', function(){
      this.closest('input-').classList.add('active')
    });

    this.querySelector('input').addEventListener('blur', function(){
      this.closest('input-').classList.remove('active')
    });

    this.rendered = true;

  };

  connectedCallback(){
    if(!this.rendered) this.render();
  };

  disconnectedCallback(){
    this.rendered = false;
  };

  static get observedAttributes(){
    return ['placeholder'];
  };

  attributeChangedCallback(name, oldValue, newValue){
    this.render();
  };

};

customElements.define('input-',Input);