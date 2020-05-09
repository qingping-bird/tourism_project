const fs = require('fs')
const path = require('path')

//   await fs.rename(tem.path,'D:\imgDataBase'+tem.originalFilename,function(err){
//     console.log(err);
// })  跨磁盘操作不可

projectImgUpload=async function(img,id,url){
    let readStream=await fs.createReadStream(img.path);
    let newName=await img.originalFilename.replace(/^([^s]*)\./,id+".");
    await checkFolder(url);
    let writeStream=await fs.createWriteStream(url+newName);
    await readStream.pipe(writeStream);
    await readStream.on('end',function(){
    fs.unlinkSync(img.path);
    });
    return url+newName;
}

checkFolder=async function(folderName){
    fs.access(folderName, fs.constants.F_OK, function(err){
        if(err){
            fs.mkdir(folderName, function(err){
                if(err){
                   console.log(err);
                   return;
                 }
              });
        }
        return
       });
}

module.exports = {projectImgUpload,checkFolder}