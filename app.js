const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/',(req,res)=>{

    const p = fetch('https://newsdata.io/api/1/news?apikey=pub_192932771d221c5008d6b926f37815bdc55cd&language=en');
    p.then((value1)=>{
        // console.log(value1.json)
        return value1.json();
    
    }).then((value2)=>{
        articles = value2.results;
        res.render('index.ejs',{articles:articles});
      
        
    })
});

app.post('/',(req,res)=>{
    // console.log(req.body.category);
    const ur = 'https://newsdata.io/api/1/news?apikey=pub_192932771d221c5008d6b926f37815bdc55cd&language=en&category='+req.body.category;
    const l = fetch(ur);
    l.then((value1)=>{
        // console.log(value1.json)
        return value1.json();
    
    }).then((value2)=>{
        articles = value2.results;
        if(articles.length==0){
            let temp ={}
            temp.title ="Error!";
            temp.content ="Error! getting requested query please try agian later";
            articles.push(temp);
        }
        console.log(articles)
        res.render('index.ejs',{articles:articles});
      
        
    })
})

app.listen(3000);
