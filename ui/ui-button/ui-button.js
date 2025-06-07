import {UIBase} from '../ui-base/ui-base.js';

class UIButton extends UIBase{
  #text = '';
  #iconLeading = '';
  #iconTrailing = '';
  #disabled = false;
  #loading = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'icon-leading':{name:'iconLeading',type:String,reflect:true},
    'icon-trailing':{name:'iconTrailing',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
    'loading':{name:'loading',type:Boolean,reflect:true}
  });

  get text(){return this.#text;}
  set text(value){
    if(!(this.#text = String(value || ''))) return;
    this.updateText('span',this.#text);
    this.reflect('text',this.#text);
    this.setAttributes(this,{
      'aria-label': this.#text
    });
  }

  get iconLeading(){return this.#iconLeading;}
  set iconLeading(value){
    if(!(this.#iconLeading = String(value || ''))) return;
    this.updateIcon('[leading]',this.#iconLeading);
    this.reflect('icon-leading',this.#iconLeading);
  }

  get iconTrailing(){return this.#iconTrailing;}
  set iconTrailing(value){
    if(!(this.#iconTrailing = String(value || ''))) return;
    this.updateIcon('[trailing]',this.#iconTrailing);
    this.reflect('icon-trailing',this.#iconTrailing);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.setAttributes(this,{
      'tabindex': this.#disabled ? '-1' : '0',
      'aria-disabled': this.#disabled ? 'true' : 'false'
    });
  }

  get loading(){return this.#loading;}
  set loading(value){
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.setAttributes(this, {
      'aria-busy': this.#loading ? 'true' : 'false'
    });
    this.loader();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    let height = this.height(32);

    this.setAttributes(this,{
      'role': 'button',
      'aria-busy': this.#loading ? 'true' : 'false'
    });

    this.disabled = this.hasAttribute('disabled');
    this.loading = this.hasAttribute('loading');

    const fragment = document.createDocumentFragment();

    if(this.#iconLeading){
      const icon = document.createElement('ui-icon');
      this.setAttributes(icon,{
        'height': height,
        'leading': ''
      });
      fragment.appendChild(icon);
    }

    if(this.#text){
      const span = document.createElement('span');
      fragment.appendChild(span);
    }

    if(this.#iconTrailing){
      const icon = document.createElement('ui-icon');
      this.setAttributes(icon,{
        'height': height,
        'trailing': ''
      });
      fragment.appendChild(icon);
    }

    this.appendChild(fragment);

    this.loader();

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  loader(){
    const spinner = this.querySelector('ui-spinner');

    if(this.#loading && !spinner){
      this.appendChild(document.createElement('ui-spinner'));
    }
    else if(!this.#loading && spinner){
      spinner.remove();
    }
  }

  onClick(e){
    if(this.disabled || this.#loading) return;
    if(typeof this.doAction === 'function') this.doAction(e);
  }

  onKeyDown(e){
    if(e.code !== 'Tab') e.preventDefault();
    if(this.#disabled || this.#loading) return;
    if(e.repeat) return;
    if(e.code === 'Enter' || e.code === 'Space') this.doAction(e);
  }

  doAction(e){
    console.log(e.type);
  }

}
customElements.define('ui-button',UIButton);