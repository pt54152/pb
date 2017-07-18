(function(angular){
	'use strict';
    angular.module('todoApp.Controller',[])
            .controller('TodoController',['$scope','$location','serviceCtr',todoHandler])
    function todoHandler($scope,$location,serviceCtr){
        // 1 展示任务列表
        var arr=serviceCtr.getData();
        $scope.arr=arr;
        // 2 添加任务
        $scope.newTodo='';
        $scope.sumbit= function () {
        	if($scope.newTodo.trim().length===0){
        		return;
        	}
          serviceCtr.addData($scope.newTodo);
	        $scope.newTodo='';
        }
        // 3 删除一条任务
        $scope.del=serviceCtr.delData;
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
            serviceCtr.completeAll($scope.isCompleteAll);
        };
        $scope.complete=function(){
            serviceCtr.complete($scope.isCompleteAll);
        }
        // 6 清除已完成任务
        $scope.delComplete=function(){
          serviceCtr.delComplete($scope.arr);  
        }
        $scope.isShow=serviceCtr.isShow;
        // 7 显示未完成任务数
        $scope.getCount=serviceCtr.getCount;
   
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

})(angular)