var currentPage = 0;

var form = document.getElementById('target');
var pages = form.children[0].children;
  var progressBar = document.getElementById('progress-bar').children[0];

for(var i = 0; i < pages.length; i++ )
  {
    pages[i].style.display = "none";
  }
pages[currentPage].style.display = "block";
pages[currentPage].classList.add('active');
document.getElementById('next-button').addEventListener('click', nextPage);
function nextPage() 
{
  progress = ((currentPage + 1) / pages.length) * 100;
  progressBar.style.width = progress + "%"; 
  progressBar.style.backgroundColor = "#" + progress; + progress
  if(currentPage + 1 < pages.length)
    {
  console.log('next');

  pages[currentPage].classList.add('inactive');
  
  setTimeout(function()
  {
    pages[currentPage].style.display = "none";
    currentPage++;
    pages[currentPage].style.display = "block";
    pages[currentPage].classList.add('active');
  }, 500);
  }
  else 
    {
        setTimeout(function(){alert('done!');}, 1000);
    }
}