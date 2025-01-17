// -----------------fonction déploiement-----------------
$(document).on('click', '.symboDeploi', function(){
    if($('.' + this.id.slice(11) + ':visible').length > 0)
    {
        console.log('test');
        $('.' + this.id.slice(11)).slideUp();
    }
    else
    {
        $('.' + this.id.slice(11)).slideDown();
    }
})


$(document).on('click', '.classeDeploi', function(){
    console.log('test');
    if($('.' + this.id.slice(12) + ':visible').length > 0)
    {
        $('.' + this.id.slice(12)).slideUp();
    }
    else
    {
        $('.' + this.id.slice(12)).slideDown();
    }
})

    




$(document).on('click', '.boutonDeploi', function(){
    console.log(this.id.slice(12));
    console.log('test');
    if($('.' + this.id.slice(12) + ':visible').length > 0)
    {
        $('.' + this.id.slice(12)).slideUp();
    }
    else
    {
        $('.' + this.id.slice(12)).slideDown();
    }
})