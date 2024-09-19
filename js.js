function mouse(content){
    if (content.id==='insta'){
        content.innerHTML='@box._.min'}
    else if(content.id==='tstory'){
        content.innerHTML='NotePad📝'
    }
    else if(content.id=='github'){
        content.innerHTML='BlueBox <img class="img" id="bluebox" src="img/bluebox.jpg">'
    }
}
function leave(content){
    if (content.id==='insta'){
    content.innerHTML='<img class="img" src="img/instagram.webp">  instagram'}
    else if (content.id==='tstory'){
        content.innerHTML='<img class="img" src="img/tstory.png">  T-story'}
    else if (content.id==='github'){
        content.innerHTML='<img class="img" src="img/github.webp">  git-hub'}
}
function brightdown(self){
    self.style.filter="brightness(1)"
}
function brightup(self){
    self.style.filter="brightness(1.25)"
}
// <!-- dd -->
