type CallBack = () => Promise<void>;

export default class TypeWritter {
  #queue: CallBack[] = [];
  #element: HTMLElement;
  #loop: boolean;
  #typingSpeed: number;
  #deletingSpeed: number;

  constructor(
    parent: HTMLElement,
    { loop = false, typingSpeed = 50, deletingSpeed = 50 }
  ) {
    this.#element = document.createElement("div");
    this.#element.classList.add("textbox");
    parent.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  typeString(str: string) {
    this.#addtoQueue((resolve) => {
      console.log(str);
      let i = 0;
      const interval = setInterval(() => {
        this.#element.append(str[i]);
        i++;
        if (i >= str.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.#typingSpeed);
    });
    return this;
  }

  deleteChars(num: number) {
    this.#addtoQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (i >= num) {
          clearInterval(interval);
          resolve();
        }
      }, this.#deletingSpeed);
    });
    return this;
  }

  deleteAll(deleteSpeed = this.#deletingSpeed) {
    this.#addtoQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (this.#element.innerText.length === 0) {
          clearInterval(interval);
          resolve();
        }
      }, deleteSpeed);
    });
    return this;
  }

  pauseFor(duration: number) {
    this.#addtoQueue((resolve) => {
      setTimeout(resolve, duration);
    });
    return this;
  }

  async start() {
    let cb = this.#queue.shift();
    while (cb != null) {
      await cb();
      if (this.#loop) this.#queue.push(cb);
      cb = this.#queue.shift();
    }
    return this;
  }

  #addtoQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => {
      return new Promise(cb);
    });
  }
}
