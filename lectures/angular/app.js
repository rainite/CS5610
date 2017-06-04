module.exports = function myModule(app) {


    // findAllPosts
    app.get('/api/post',findAllPosts);
    app.get('/api/post/:index',findPostsByIndex);
    app.delete('/api/post/:index',deletePostsByIndex);
    // app.put('/api/post/:index',updatePostsByIndex);  //update



    var posts = [

        {title:'post 1', body: 'body 1'},
        {title:'post 2', body: 'body 2'},
        {title:'post 3', body: 'body 3'},
        {title:'post 4', body: 'body 4'}


    ];

    function deletePostsByIndex (req, res) {

        var index = req.param.index;
        posts.splice(index,1);
        //res.json(posts);
        res.json(200);


    }


    function findPostsByIndex(req, res){

        var index = req.params['index']; //more powerful than .index  可以放变量在里面
        res.json(posts[index]);

    }

    function findAllPosts (req,res){

        res.json(posts);
    }

};
