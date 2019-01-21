# CreepyUI
a creepy style UI
## thanks
http://www.ankokukoubou.com/
## main color     
#af111c     
## main font    
[Nosifer](https://github.com/google/fonts/blob/master/ofl/nosifer/Nosifer-Regular.ttf)       
## less -> css
```bash
lessc creepy.less creepy.css
```
## use
font + normalize + creepy.css
```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Amatic+SC|Creepster|Nosifer|Special+Elite|Stardos+Stencil" rel="stylesheet">
  <link rel="stylesheet" href="./normalize.css">
  <link rel="stylesheet" href="./creepy.css">
</head>
jumpscare
```html
<script src="./creepy.js"></script>
```
```JavaScript
/**
 * jumpScare(url)
 * jumpScare.show(during)
 * jumpScare.loop(interval, during)
 */
let jumpScare = creepy.jumpScare('https://wx3.sinaimg.cn/mw690/686d7361ly1fsfd8dlce1j20qo0k0wnn.jpg')
document.querySelector('.js-show').addEventListener('click',()=>{
    jumpScare.show(2000)
})
document.querySelector('.js-loop').addEventListener('click',()=>{
    jumpScare.loop(4000,1000)
})
```

