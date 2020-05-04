const fs = require('fs')
const path = require('path')

//   await fs.rename(tem.path,'D:\imgDataBase'+tem.originalFilename,function(err){
//     console.log(err);
// })  跨磁盘操作不可

avatarUpload=async function(img,id){
    let readStream=await fs.createReadStream(img.path);
    let newName=await img.originalFilename.replace(/^([^s]*)\./,id+".");
    await checkFolder("D://imgDatabase");
    await checkFolder("D://imgDatabase//userAvatar");
    let writeStream=await fs.createWriteStream('D://imgDatabase//userAvatar//'+newName);
    await readStream.pipe(writeStream);
    await readStream.on('end',function(){
    fs.unlinkSync(img.path);
    });
    return 'imgDatabase//userAvatar//'+newName;
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

module.exports = {avatarUpload,checkFolder}