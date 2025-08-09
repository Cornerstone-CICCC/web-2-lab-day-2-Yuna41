$(function() {

  let currentUserId = 1
  
  function loadUserData(UserId){
    // console.log(UserId)

    // user info
    $.ajax({
      url: `https://dummyjson.com/users/${UserId}`,
      type: "GET",
      success(info){
        buildInfoSec(info)
      },
      error(err){
        console.log(err)
      }
    })
    // posts
    $.ajax({
      url: `https://dummyjson.com/users/${UserId}/posts`,
      type: "GET",
      success(response){
        const posts = response.posts
        buildPostSec(posts)
      },
      error(err){
        console.log(err)
      }
    })
    // todos
    $.ajax({
      url: `https://dummyjson.com/users/${UserId}/todos`,
      type: "GET",
      success(response){
        const todos = response.todos
        buildTodoSec(todos)
      },
      error(err){
        console.log(err)
      }
    })
  }

  // after loading window
  loadUserData(currentUserId)

  // after clicking prev
  const prevBtn = $('header button:first-child')
  prevBtn.on('click', function(){
    if(currentUserId === 1){
      currentUserId = 30
      loadUserData(currentUserId)
    } else {
      currentUserId--
      loadUserData(currentUserId)
    }
  })

  // after clicking next
  const nextBtn = $('header button:last-child')
  nextBtn.on('click', function(){
    if(currentUserId === 30){
      currentUserId = 1
      loadUserData(currentUserId)
    } else {
      currentUserId++
      loadUserData(currentUserId)
    }
  })

  $('.posts h3').on('click', function(){
    $(this).next().slideToggle()
  })
  $('.todos h3').on('click', function(){
    $(this).next().slideToggle()
  })

  // modal
  $(document).on('click', '.mdl-btn-open', function(){
    const postId = $(this).attr('mdl-id')
    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      type: "GET",
      success(modal){
        buildModal(modal)
      },
      error(err){
        console.log(err)
      }
    })
  })
})


function buildInfoSec(arr){
  const boxImg = $('.info__image img')
  const boxContent = $('.info__content')
  const ttlPosts = $('.posts h3')
  const ttlTodos = $('.todos h3')

  boxImg.attr('src', arr.image)
  boxContent.html(
    `<h1>${arr.firstName} ${arr.lastName}</h1>
      <dl>
        <div>
          <dt>Age: </dt>
          <dd>${arr.age}</dd>
        </div>
        <div>
          <dt>Email: </dt>
          <dd>${arr.email}</dd>
        </div>
        <div>
          <dt>Phone: </dt>
          <dd>${arr.phone}</dd>
        </div>
      </dl>
    `
  )
  ttlPosts.text(`${arr.firstName}'s Posts`)
  ttlTodos.text(`${arr.firstName}'s To Dos`)
}

function buildPostSec(arr){
  const listPosts = $('.posts ul')
  let itemHtml = ''
  if(arr.length === 0){
    listPosts.html('<li>User has no posts</li>')
  } else {
    arr.forEach(el => {
      itemHtml += `<li><div><strong class="mdl-btn-open" mdl-id="${el.id}">${el.title}</strong></div><p>${el.body}</p></li>`
    })
    listPosts.html(itemHtml)
  }
}

function buildTodoSec(arr){
  const listTodos = $('.todos ul')
  let itemHtml = ''
  if(arr.length === 0){
    listTodos.html('<li>User has no todos</li>')
  } else {
    arr.forEach(el => {
      itemHtml += `<li>${el.todo}</li>`
    })
    listTodos.html(itemHtml)
  }
}

function buildModal(arr){
  $(document).on('click', '.mdl-btn-close', function(){
    $('.overlay').remove()
  })
  $('.container').append(
    `<div class="overlay">
      <div class="modal">
        <h4>${arr.title}</h4>
        <p>${arr.body}</p>
        <p class="mdl-view"><span>Views:</span>${arr.views}</p>
        <button class="mdl-btn-close">Close Modal</button>
      </div>
    </div>`
  )
}
