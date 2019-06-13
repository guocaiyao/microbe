export function upload(callback,url){
  send({
    url: url,
    //maxSize: 100,
    multiple: true,    
    callback: callback
  });
}

function send(option){  
  let fd = new FormData(),
    xhr = new XMLHttpRequest(),
    input;
  input = document.createElement('input');   
  input.setAttribute('id', 'myUploadInput');
  input.setAttribute('type', 'file');
  input.setAttribute('name', 'file');
  if(option.multiple){
    input.setAttribute('multiple', true);
  }
  document.body.appendChild(input);
  input.style.display = 'none';
  input.click();
  let fileType = ['doc','docx','xls','xlsx','pdf','jpg','jpeg','png','ppt','pptx','svg','ogg','mp4','zip'];  
    
  $('#myUploadInput').on('input propertychange',function(){
    if(!input.value){return;}
    let type = input.value.split('.').pop();
    if(fileType.indexOf(type.toLocaleLowerCase()) == -1){
      alert("File error!");
      return;
    }
    // for(let i=0, file; file=input.files[i++];){
    //   if(option.maxSize &&  file.size > option.maxSize * 1024 * 1024){
    //     alert('請上傳小於'+option.maxSize+'M的文件');
    //     return;
    //   }
    // }
    let fileName = [];
    for(let i=0, file; file=input.files[i++];){
      fd.append('file', file);
      fileName.push(file);
    } 

    xhr.open('post', option.url);     
    xhr.onreadystatechange = function(){
      if(xhr.status == 200){
        if(xhr.readyState == 4){
          if(option.callback instanceof Function){
            option.callback(JSON.parse(xhr.responseText));            
            if(JSON.parse(xhr.responseText).status.code!=200){
              
            }        
          }
        }
      }else{
        console.log('error')
      }
    }    
    xhr.upload.onprogress = function(event){
      let pre = Math.floor(100 * event.loaded / event.total);      
    }             
    xhr.send(fd);
  });
  document.body.removeChild(input);    
}