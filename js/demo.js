const myData = { foo: 'bar' }; // replace with your data

const xhr = new XMLHttpRequest();
xhr.open('POST', '/my_route');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    // success!
  } else {
    // handle error
  }
};
xhr.send(JSON.stringify(myData));
