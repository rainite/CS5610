
/**
 * Created by Celestial on 6/2/17.
 */
(function () { // IIFE = Immediately Invoked Function Expression
    angular
        .module('BlogApp',[])
        .controller("BlogPostListController",BlogPostListController);
    function BlogPostListController($scope, $http) {
        $scope.hello = 'hello world!!!';
        $scope.post = {title:'this is the default title', body:'this is the default body'};
        $scope.posts = [];

        init();



        function findBlogPosts() {
            $http.get('/api/post')  //默认是异步的，用ajax
                .then(function(response){
                    $scope.posts = response.data;
                });
        }

        function init() {

            findBlogPosts();

        }



        //event handler
        $scope.deletePost = deletePost;
        $scope.addPost = addPost;
        $scope.selectPost = selectPost;
        $scope.updatePost = updatePost;

        function updatePost(post){
            $scope.posts[$scope.index] = angular.copy(post);
        }

        function addPost(post) {
            //这里传的是object 的reference， 所以不管点几次bottom， array里得到的值都会被覆盖（都是这个object）
            var newPost = {
                title: post.title,
                body: post.body,
                date: new Date()
            }
            $scope.posts.push(newPost);
            console.log(newPost);
        }

        function deletePost(index){
            // $scope.posts.splice(index,1);
            $http
                .delete('/api/post/' + index)
                // .then(function (response) {
                //     $scope.posts = response.data;
                //}
                .then(findBlogPosts);

        }

        function selectPost(index){
            $scope.post = angular.copy($scope.posts[index]);  //deep copy
            $scope.index = index;
        }
    }
})();
