agr tm kisi api pr ksi static file ko render kr deta h to url same hi rhege,
to age getLogin me home ko render kr dega to url rhega www.orvide.com/api/login
jbki isko ho jana chahiye www.orvide.com/home

1) i thing api ko change krke account krdena chahiye
2)home ye sb ka api direct rhega khne ka mtlb agr koi agr message pr click krna h to api rhega /message direct .

Redirect means Whole Endpoint after domain name
suppose you are in http://localhost;4000/home,
now if have to move to an endpoint named 'room' which is inside 'home' route
redirect it this way ,
res.redirect('/home/room')