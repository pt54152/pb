(function(angular){
	angular.module('todoApp.service',[])
		.service('serviceCtr',['$window',function($window){
			var that=this;
			//原始数据从本地获取
			var local=$window.localStorage;
			var arr=JSON.parse(local.getItem('arr'))||[];
      this.getData=function(){
      	return arr;
      }
      // 保存数据
			 this.save=function(){
			 	local.setItem('arr',JSON.stringify(arr));
			 }
			//添加数据
			this.addData=function(newTodo){
				var id;
        if(arr.length===0){
          id=1;
        }else{
          id=arr[arr.length-1].id+1;
        }
        arr.push({ id: id, name: newTodo, isCompleted: false})
        this.save();
			}
			//删除任务
			this.delData=function(id){
	      for(var i=0;i<arr.length;i++){
	        if(arr[i].id===id){
	          arr.splice(i,1);
	            break;
	        }
	      }
	      that.save();
	    }
	    // 切换用户选中状态
	    this.completeAll=function(isCompleteAll){
            for (var i=0;i<arr.length;i++){
               arr[i].isCompleted=isCompleteAll;
            }
      };
      this.complete=function(isCompleteAll){
          for(var i=0;i<arr.length;i++){
              if(!arr[i].isCompleted){
                  isCompleteAll=false;
                  break;
              }else{
                  isCompleteAll=true;
              }
          }
      }
      //清除已完成任务
      this.delComplete=function(todoList){
          var newArr=[];
          for (var i=0;i<arr.length;i++){
              if(arr[i].isCompleted===false){
                  newArr.push(arr[i]);
              }
          }
          todoList=arr=newArr;
          that.save();
      }
      this.isShow=function(){
          var res=false;
          for(var i=0;i<arr.length;i++){
              if(arr[i].isCompleted){
                  res=true;
                  break;
              }
          }
          return res;
      }
      //显示未完成任务数
      this.getCount=function(){
          var count=0;
          for (var i=0;i<arr.length;i++){
              if(arr[i].isCompleted===false){
                  count++;
              }
          }
          return count;
      }
      //显示不同状态的任务 以及当前任务高亮处理

		}])
})(angular)