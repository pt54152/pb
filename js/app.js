(function (angular) {
	'use strict';
    angular.module('todoApp',[])
            .controller('TodoController',['$scope',todoHandler])
    function todoHandler($scope){
        // 1 展示任务列表
        var arr=[
            { id: 1, name: '吃饭', isCompleted: false },
            { id: 2, name: '睡觉', isCompleted: true },
            { id: 3, name: '打豆豆', isCompleted: false },
            { id: 4, name: '豆豆是谁', isCompleted: false}
        ]
        this.arr=arr;


    }

})(angular);
