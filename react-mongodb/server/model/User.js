const mongoose = require('../db')
const Schema = mongoose.Schema;
const Promise = require('promise');
const userSchema = new Schema({
  name: String,
  pwd: String,
  date:{type:Date,default:Date.now},
  hidden:Boolean,
  age:{type:Number,default:0},
  email:{type:String,default:''}
}, {
  versionKey: false
})

const User = mongoose.model('User', userSchema);

module.exports = {
  remove:function(where){
    let p = new Promise(function(resolve,reject){
      User.remove(where,function(err){
        if(err===null){
          resolve();
        }else{
          reject(err)
        }
      })
    })
    return p;
  },
  update:function(data,where){
    let p = new Promise(function(resolve,reject){
      User.update(where,data,function(err){
        if(err===null){
          resolve();
        }else{
          reject(err)
        }
      })
    })
    return p;
  },
  save:function(user){
    let p = new Promise(function(resolve,reject){
      // let user = new User({name:'张彤川',pwd:'123456','dd':3})
      let U = new User(user)
      U.save(function(err){
        if(err===null){
          resolve()
          // console.log("保存成功")
        }else{
          reject(err);
          // console.log("保存失败")
        }
      })
    });
    return p;

    user.save(function(err){
      if(err===null){
        console.log("保存成功")
      }else{
        console.log("保存失败")
      }
    })
  },
  find:function(){
    let p = new Promise(function(resolve,reject){
      User.find({},function(err,doc){
        if(err==null){
          resolve(doc)
        }else{
          reject(err)
        }
      })
    })
    return p;
  },
  findSort:function(col){
    let p = new Promise(function(resolve,reject){
      let query = User.find({})
      query.sort(col);
      //query.limit(3); //限制条数
      //query.skip(3)   //开始数 ，通过计算可是实现分页
      query.exec(function(err,doc){
        if(err==null){
          resolve(doc)
        }else{
          reject(err)
        }
      })

      // ({},function(err,doc){
      //   if(err==null){
      //     resolve(doc)
      //   }else{
      //     reject(err)
      //   }
      // })
    })
    return p;
  },
  findOne:function(where={}){
    console.log(where);
    let p = new Promise(function(resolve,reject){
      User.findOne(where,function(err,doc){
        if(err==null){
          resolve(doc)
        }else{
          reject(err)
        }
      })
    })
    return p;
  },
  findById:function(_id){
    let p = new Promise(function(resolve,reject){
      User.findById(_id,function(err,doc){
        if(err==null){
          resolve(doc)
        }else{
          reject(err)
        }
      })
    })
    return p;
  },
}
