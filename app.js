var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require("request");
const selector = require('./configSelector');
const products = require('./products');

server.listen(4000);
console.log(products.products[0]);
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/src/index.html');
});

io.on('connection', function (socket) {

    // socket.emit('news', { hello: 'world' });


    socket.on('my other event', function (data) {
        console.log(data.url, data.api, data.secret, data.addproducts, data.installtheme, data.addpages); //will go to client
        //    call function here
        run(data.url, data.api, data.secret, data.storename, data.domainname, data.addproducts, data.installtheme, data.addpages);










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
                   
                        // socket.emit('news', { hello: body.product.title + ' Product added' });
                   
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


            function shopifyCheckPages(method, pathapi, storeurl, userapi, paswordapi) {
                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/' + pathapi
                };
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    let ress = JSON.parse(body);
                    console.log(ress);

                    function filterthis(arr, find) {
                        let found_pages = arr.filter((page) => {
                            return page.body_html.includes(find) === true
                        })
                        let page = found_pages.map((page, index, pages) => {
                            return page
                        })
                        return page
                    }
                    setTimeout(function () {
                        let found = filterthis(ress.pages, "support@storename.com");
                        // body
                        console.log(found.length);
                    }, 4000);

                });
            }


            function shopifyUpdatePage(method, storeurl, userapi, paswordapi, id, html) {
                if (domainname != "") {
                    html = html.replace(/storename.com/g, domainname);
                }
                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/pages/' + id + '.json', body: {
                        page: {
                            id: id,
                            body_html: html
                        }
                    },
                    json: true
                };
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log("Error Create Page");

                });
            }


            function shopifyInstallTheme(method, pathapi, storeurl, userapi, paswordapi) {
                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/' + pathapi, body: {
                        theme:
                            {
                                name: 'TheMMThemeAutoInstall',
                                src: 'http://themillionairemastermind.com/SCA/TheMillionaireMastermindTheme.zip',
                                role: 'main'
                            }
                    },
                    json: true
                };
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    setTimeout(function() {
                        // body
                        socket.emit('news', { hello: 'Theme Installed' });
                    }, 1500);
                });
            }


            function shopifyCreateCollection(method, pathapi, storeurl, userapi, paswordapi, collectiontitle) {
                var options = {
                    method: method, url: 'https://' + userapi + ':' + paswordapi + '@' + storeurl + '.myshopify.com/admin/' + pathapi, body:
                        {
                            smart_collection:
                                {
                                    title: collectiontitle,
                                    rules: [{ column: 'tag', relation: 'equals', condition: collectiontitle }]
                                }
                        },
                    json: true
                };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    setTimeout(function() {
                        // body
                        socket.emit('news', { hello: collectiontitle + ' Collection added' });
                    }, 1500);

                });
            }







            // shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "FAQQQQ", selector.htmlFAQ);
            // shopifyCheckPage("GET", "pages.json", urlstore, userapi, paswordapi);
            if (installtheme) {
                
                                shopifyInstallTheme("POST", "themes.json", urlstore, userapi, paswordapi);
                            }

            if (addpages) {

                shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "PRIVACY POLICY", selector.htmlPrivatePolicy);
                shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "RETURN POLICY", selector.htmlReturnPolicy);
                shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "TERMS OF SERVICES", selector.htmlTermsofService);
                shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "TRACK YOUR PACKAGE", selector.htmlTrackYourPackage);
                shopifyCreatePage("POST", "pages.json", urlstore, userapi, paswordapi, "CONTACT US", "", "contact");


            }
           
            if (addproducts) {
                
                shopifyCreateCollection("POST", "smart_collections.json", urlstore, userapi, paswordapi, "Gadgets");
                shopifyCreateCollection("POST", "smart_collections.json", urlstore, userapi, paswordapi, "Kitchen Products");
                shopifyCreateCollection("POST", "smart_collections.json", urlstore, userapi, paswordapi, "Beauty & Cosmetics");
                shopifyCreateCollection("POST", "smart_collections.json", urlstore, userapi, paswordapi, "Pet Essentials");
                shopifyCreateCollection("POST", "smart_collections.json", urlstore, userapi, paswordapi, "Home Accessories");
                    for (let i = 0; i < products.products.length || function(){  socket.emit('news', { hello: '<span style=\"color:green\">Done<\/span>' }); return false;}(); i++) {
                        shopifyAddProducts("POST", "products.json", urlstore, userapi, paswordapi, [i]);
                    }
                   
                            }


            
        }


    });
});
