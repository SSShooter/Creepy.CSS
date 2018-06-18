let creepy = {
  jumpScare(url) {
    let conteiner = document.createElement('div')
    conteiner.style.cssText = `
        display: none;
        position:fixed;
        top:0;
        left:0;
        height: 100%;
        width: 100%;
        background-color: #000000;
        background-image:url(${url});
        background-size: contain;
        background-repeat:no-repeat;
        background-position:center; 
      `
    document.body.appendChild(conteiner)
    return {
      show(during) {
        conteiner.style.display = 'block'
        setTimeout(() => {
          conteiner.style.display = 'none'
        }, during || 1000)
      },
      hide() {
        conteiner.style.display = 'none'
      },
      loop(interval, during) {
        setInterval(() => {
          conteiner.style.display = 'block'
          setTimeout(() => {
            conteiner.style.display = 'none'
          }, during || 1000)
        }, interval || 1000 * 60)
      }
    }
  }
}
