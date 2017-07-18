(function (angular) {
	'use strict';
    angular.module('todoApp',[])
            .controller('TodoController',['$scope','$location',todoHandler])
    function todoHandler($scope,$location){
        // 1 展示任务列表
        var arr=[
            { id: 1, name: '吃饭', isCompleted: false },
            { id: 2, name: '睡觉', isCompleted: true },
            { id: 3, name: '打豆豆', isCompleted: false },
            { id: 4, name: '豆豆是谁', isCompleted: false}
        ]
        $scope.arr=arr;
        // 2 添加任务
        $scope.newTodo='';
        $scope.sumbit= function () {
            var id;
            if(arr.length===0){
                id=1;
            }else{
                id=arr[arr.length-1].id+1;
            }
            arr.push({ id: id, name: $scope.newTodo, isCompleted: false})
            $scope.newTodo='';
        }
        // 3 删除一条任务
        $scope.del=function(id){
            for(var i=0;i<arr.length;i++){
                if(arr[i].id===id){
                    arr.splice(i,1);
                    return;
                }
            }
        }
        // 4 修改任务
        $scope.editingId=-1;
        $scope.edit=function(id){
            $scope.editingId=id;
        }
        $scope.editSave=function(){
            $scope.editingId=-1;
        }
        // 5 切换任务选中状态
        $scope.isCompleteAll=false;
        $scope.completeAll=function(){
            for (var i=0;i<arr.length;i++){
               arr[i].isCompleted=$scope.isCompleteAll;
            }
        };
        $scope.complete=function(){
            for(var i=0;i<arr.length;i++){
                if(!arr[i].isCompleted){
                    $scope.isCompleteAll=false;
                    break;
                }else{
                    $scope.isCompleteAll=true;
                }
            }
        }
        // 6 清除已完成任务
        $scope.delComplete=function(){
            var newArr=[];
            for (var i=0;i<arr.length;i++){
                if(arr[i].isCompleted===false){
                    newArr.push(arr[i]);
                }
            }
            $scope.arr=arr=newArr;
        }
        $scope.isShow=function(){
            var res=false;
            for(var i=0;i<arr.length;i++){
                if(arr[i].isCompleted){
                    res=true;
                    break;
                }
            }
            return res;
        }
        // 7 显示未完成任务数
        $scope.getCount=function(){
            var count=0;
            for (var i=0;i<arr.length;i++){
                if(arr[i].isCompleted===false){
                    count++;
                }
            }
            return count;
        }
        // 8 显示不同状态的任务 以及当前任务高亮处理
        $scope.isSelected=undefined;
        $scope.location=$location;
        $scope.$watch('location.url()',function(newValue,oldValue){
            $scope.isSelected=false;
            switch(newValue){
                case '/':
                    $scope.isSelected=undefined;
                    break;
                case '/active':
                    $scope.isSelected=false;
                    break;
                case '/completed':
                    $scope.isSelected=true;
                    break;
            }

        })


    }


})(angular);
