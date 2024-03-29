const Board = require('../../../models/board')
const jwt = require('jsonwebtoken')


exports.write = (req, res) => {
    const { title, contents, author, bNum } = req.body
    const token = req.session.token;
    if(!token) {
        return res.send('not_logged')
    }
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    p.then((decoded)=>{
        if(decoded.admin)
        {
            Board.create(title,contents,author,bNum)
            .then(()=>{
                res.send('uploaded')
            })
        }
        else res.send('not_admin')
    }).catch(onError)
        // if(isAdmin)
        // {
        //     Board.create(title,contents)
        //     .then(()=>{
        //         res.send('uploaded')
        //     })
        // }
        // else res.send(req.session)
}

exports.delete = (req ,res) => {
    const { id } = req.body
    const token = req.session.token;
    if(!token) {
        return res.send('not_logged')
    }
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    p.then((decoded)=>{
        if(decoded.admin)
        {
            const { id } = req.body
            Board.deleteOne({_id:id})
            .then(()=>{
                res.send('deleted');
            })
        }
        else res.send('not_admin')
    }).catch(onError)

    // const { id } = req.body
    // Board.deleteOne({_id:id})
    // .then(()=>{
    //     res.send('deleted');
    // })
}

exports.edit = (req, res) => {
    const {id , title , contents , bNum} = req.body
    const token = req.session.token;
    if(!token) {
        return res.send('not_logged')
    }
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    p.then((decoded)=>{
        if(decoded.admin)
        {
            Board.findOneAndUpdate({_id:id,},{$set:{title:title,contents:contents,bNum:bNum}})
            .then(()=>{
                res.send('updated');
            })
        }
        else res.send('not_admin')
    }).catch(onError)


    // Board.findOneAndUpdate({_id:id,},{$set:{title:title,contents:contents}})
    // .then(()=>{
    //     res.send('updated');
    // })
}

exports.find = (req, res) => {
    Board.find(function(err, board){
        if(err) return res.send(err);
        res.json(board);
    })
}
exports.findone = (req, res) => {
    const { seq } = req.body;
    console.log(req.body);
    Board.findOne({seq:seq},function(err, board){
        if(err) return res.send(err);
        res.json(board);
    })
}
exports.findcate = (req, res) => {
    const { bNum } = req.body
    Board.find({bNum:bNum},function(err, board){
        console.log(bNum);
        if(err) return res.send(err);
        res.json(board);
    })
}

exports.findpage = (req, res) => {
    const {bNum ,limit , page} = req.body;
    if(bNum===null){
        Board.paginate({},{page:page,limit:limit},(err , result)=>{
            res.send(result);
        });
    }
    else{
        Board.paginate({bNum:bNum},{page:page,limit:limit},(err , result)=>{
            console.log(result);
            res.send(result);
        });
    }
}

exports.count = (req, res) => {
    const {bNum} = req.body;
    if(bNum===null){
        Board.countDocuments({},function(err, count){
            res.json({count:count});
        })
    }
    else{
        Board.countDocuments({bNum:bNum},function(err, count){
            res.json({count:count});
        })
    }
}

exports.search = (req,res) =>{
    const {bNum,word} = req.body;
    if(bNum===null)
    {
        Board.find({},function(err, board){
            const result =
            board.filter (x => {
                return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
            });
            res.send(result);
        })
    }
    else{
        Board.find({bNum:bNum},function(err, board){
            const result =
            board.filter (x => {
                return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
            });
            res.send(result);
        })
    }
}

exports.takeboard = (req,res) =>{
    const {bNum ,limit , page, word} = req.body;
    if(bNum===null){
        if(word!=""){
            Board.find({},function(err, board){
                const result =
                board.filter (x => {
                    return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
                });
                const l = result.length
                const r = result.slice((limit*(page-1)),(limit*page))
                const s = {docs:r,totalDocs:l}
                res.send(s);
            })
        }
        else{
            Board.paginate({},{page:page,limit:limit,sort:{_id:-1}},(err , result)=>{
                const length = result.totalDocs
                const docs = result.docs;
                const s =
                docs.filter (x => {
                    return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
                });
                const r = {docs:s,totalDocs:length}
                res.send(r);
            });
        }
    }
    else{
        Board.paginate({bNum:bNum},{page:page,limit:limit,sort:{_id:-1}},(err , result)=>{
            const length = result.totalDocs
            const docs = result.docs;
            const s =
            docs.filter (x => {
                return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
            });
            const r = {docs:s,totalDocs:length}
            res.send(r);
        });
    }
}
exports.addviews = (req,res) =>{
    const {seq} = req.body;
    Board.findOneAndUpdate({seq:seq,},{$inc:{views:1}})
    .then(()=>{
        res.send('updated');
    })
}
exports.takeboardviews = (req,res) => {
    const {bNum ,limit , page, word} = req.body;
    if(bNum===null){
        Board.paginate({},{page:page,limit:limit,sort:{views:-1}},(err , result)=>{
            const length = result.totalDocs
            const docs = result.docs;
            const s =
            docs.filter (x => {
                return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
            });
            const r = {docs:s,totalDocs:length}
            res.send(r);
        });
    }
    else{
        Board.paginate({bNum:bNum},{page:page,limit:limit,sort:{views:-1}},(err , result)=>{
            const length = result.totalDocs
            const docs = result.docs;
            const s =
            docs.filter (x => {
                return x.title.toLowerCase().includes(word.toLowerCase()) || x.contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").toLowerCase().includes(word.toLowerCase())
            });
            const r = {docs:s,totalDocs:length}
            res.send(r);
        });
    }
}