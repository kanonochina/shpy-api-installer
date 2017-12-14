var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require("request");
const selector = require('./configSelector');
const products = require('./6');

server.listen(4000);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/products/index.html');
});

io.on('connection', function (socket) {

    // socket.emit('news', { hello: 'world' });


    socket.on('my other event', function (data) {
        console.log(data.url, data.api, data.secret, data.addproducts, data.installtheme, data.addpages); //will go to client
        //    call function here
        run(data.url, data.api, data.secret, data.storename, data.domainname, data.addproducts, data.installtheme, data.addpages);


/*      


  */      
        
        
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        
        
        
        





        function run(urlstore, user, pword, storename, domainname, addproducts, installtheme, addpages) {
            var storeurl = urlstore,
                userapi = user,
                paswordapi = pword;


            function shopifyCreatePage(method, pathapi, storeurl, userapi, paswordapi, title, html, template) {
                if (domainname != "") {
                    html = html.replace(/replace_storename.com/g, domainname);
                }
                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/' + pathapi, body: {
                        page: {
                            title: title,
                            body_html: html,
                            template_suffix: template,
                            published: true
                        }
                    },
                    json: true
                };
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    setTimeout(function() {
                        // body
                        socket.emit('news', { hello: title + ' Page added' });
                    }, 1500);

                });
            }




            function shopifyAddProducts(method, pathapi, storeurl, userapi, paswordapi, i) {

                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/' + pathapi, body: {
                        product: products.products[i]
                    },
                    json: true
                };
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                   console.log(body.product.title + ',' + body.product.handle);
                        // socket.emit('news', { hello: body.product.title + ' ' + body.product.handle });
                   
                });
            }


          





            function shopifyCheckPage(method, pathapi, storeurl, userapi, paswordapi) {
                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/' + pathapi
                };
                if (domainname != "") {
                    request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        let resp = JSON.parse(body);

                        function filterthis(arr, find) {
                            let found_pages = arr.filter((page) => {
                                return page.body_html.includes(find) === true
                            })
                            let page = found_pages.map((page, index, pages) => {
                                return page
                            })
                            return page
                        }
                        let found = filterthis(resp.pages, "support@storename.com");
                        if (found.lenth != 0) {


                            for (let i = 0; i < found.length; i++) {
                                let rbody = found[i].body_html.replace(/replace_storename.com/g, domainname);

                                shopifyUpdatePage("PUT", storeurl, userapi, paswordapi, found[i].id, rbody);
                                console.log("replaced " + found[i].id);

                            }

                        }


                    });
                }
            }





      

         
            for (let i = 0; i < products.products.length || function(){  socket.emit('news', { hello: '<span style=\"color:green\">Done<\/span>' }); return false;}(); i++) {
                shopifyAddProducts("POST", "products.json", urlstore, userapi, paswordapi, [i]);
            }





            // shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "FAQQQQ", selector.htmlFAQ);
   

           
         


            
        }


    });
});
