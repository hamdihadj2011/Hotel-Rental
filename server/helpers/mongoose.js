module.exports={
    normalizeErrors:function(errors){
        let normalizeErrors=[]
        for(let proprety in errors){
            if(errors.hasOwnProperty(proprety)){
                normalizeErrors.push({title:proprety,detail:errors[proprety].message})
            }
        }
        return normalizeErrors
    }
}