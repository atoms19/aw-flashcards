flashCardsStorage={
 
}
function loaddata(){
flashCardsStorage=JSON.parse(localStorage.getItem('flashCardData'))||{group:[['welcome to flash cards ','press + button to add new flashcard']]}

}
loaddata()
loadSideBar()
class FlashCard{
  constructor(question,answer){
    this.question=question
    this.answer=answer
  }
  display(){
    this.card=create('div')
    this.card.addClass('card')
    this.ques=create('div')
    this.ques.addClass('question')
    this.ques.text(this.question)
    this.ans=create('div')
    this.ans.addClass('answer','hide')
    
   this.ans.text(this.answer)
   this.card.addChild(this.ques.elem)
   this.card.addChild(this.ans.elem)
   this.ans.addClass('natural-rotator')
   new finder('.card-container').addChild(this.card.elem)
   this.card.checkFor('click',()=>{
     this.flip()
   })
  }
  flip(){
    this.card.addClass('anim')
  this.card.toggleClass('isanswer')
  this.ques.toggleClass('hide')
  this.ans.toggleClass('hide')

  setTimeout(()=>{
    this.card.removeClass('anim')
this.ques.toggleClass('natural-rotator')
this.ans.toggleClass('natural-rotator')
  },500)
  }
  slide(){
    this.card.toggleClass('anim-s')
    
    this.card.remove()
  }
}

//d=new FlashCard('capital of romania','rome')
//d.display()

loadFlashCardGroup(Object.keys(flashCardsStorage)[0])

new finder('.floating-btn').checkFor('click',()=>{
 new finder('#card-screen').toggleClass('hide')
 new finder('#new-card-screen').toggleClass('hide')
})

new finder('.back-btn').checkFor('click',()=>{
 new finder('#card-screen').toggleClass('hide')
 new finder('#new-card-screen').toggleClass('hide')
})
new finder('.addcard-btn').checkFor('click',()=>{
  c=new finder('.container')
  q=c.child(0).value()
  a=c.child(1).value()
  g=c.child(2).value()
  if(q!='' && a!='' && g!=''){
    if(flashCardsStorage[g]==undefined){
      flashCardsStorage[g]=[]
    }
    flashCardsStorage[g].push([q,a])
    c.child(0).value('')
    c.child(1).value('')
    localStorage.setItem('flashCardData',JSON.stringify(flashCardsStorage))
    loadSideBar()
  }
})

function loadSideBar(){
new finder('.side-bar').html('')
Object.keys(flashCardsStorage).forEach((group)=>{
 
  new finder('.side-bar').addChild(create('div').addClass('group').checkFor('click',()=>{
    loadFlashCardGroup(group)
  }).text(group).elem)
})
}
isop=false
new finder('.menu-btn').checkFor('click',()=>{
  new finder('.side-bar').toggleClass('open')
  if(!isop){
    new finder('.menu-btn').html(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--secondary)" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
    
    `)
    isop=true
  }else{
    new finder('.menu-btn').html(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--secondary)" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>`)
isop=false
  }
 
  
  })
count=1
new finder('#new-card-btn').checkFor('click',()=>{
  if(count<flashcards.length){
    card1.slide()
    card1=new FlashCard(flashcards[count][0],flashcards[count][1])
    
  card1.display()
  
  card1.card.addClass('anim-s')
  
  setTimeout(()=>{
    card1.card.removeClass('anim-s')
  },600)
  count++
  }else{
    count=0
  }
})

function loadFlashCardGroup(g){
  new finder('.card-container').html('')
  flashcards=flashCardsStorage[g].sort(()=>{
   return 0.5-Math.random()
  })
  card1=new FlashCard(flashcards[0][0],flashcards[0][1])
card1.display()
  count=1
}

function clearData(){
  localStorage.setItem('flashCardData',0)
                                 }
