'use strict';
class Test {

  promiseAscii(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(text);
      }, 2000);
    });
  }

  async draw(myText) {
    const textArt =  await this.promiseAscii(myText);
    console.log(textArt);
  }
}

const test = new Test();
test.draw('this is a test');
