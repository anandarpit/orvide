describe('some test', function(){
    var value = 0;
    it('should pass a value', function(done){
        value = 5;
        done();
    });
    it('and then double it', function(done){
        console.log(value * 2); // 10
        done();
    });
});