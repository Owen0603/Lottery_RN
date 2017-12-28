var validatorjs = require('validator');

class Manager {

    results={}
    formname="fullName"
    onChangeCallback=(forname)=>{}
    getResult(formname)
    {
        var results = this.results[formname]||{}
        var isValid = true
        var message = null
        var values = {}
        var hasNull = false
        var keys = Object.keys(results)
        for (let i=keys.length-1;i>=0;i--) {
            var key = keys[i]
            var result =  results[key]
            var key = results[key].key
            var value = results[key].value
            var nullable = results[key].nullable
            if(!result.isValid&&result.isValid!=null)//被筛选
            {
                isValid = false
            }
            if(!result.isValid&&result.message!=null)
            {
                message = result.message
            }
            if(!hasNull&&!nullable&&(value===null||value===''||value===undefined))
            {
                hasNull = true
            }

            values[key] = value
        }
        return {
            isValid,
            message,
            values,
            hasNull,
        }
    }
    initResultForKey(validate,key,value,nullable,formname=this.formname)
    {
        this.formname = formname;
        var isValid = null;///这个输入框是否可以通过审核
        var results = this.results[formname] || {}
        var message = null
        results[key] = {
            isValid,
            message,
            key,
            value,
            nullable,
        }
    }
    updateResultForKey(validate,key,value,nullable,formname=this.formname)//validate为限制数组
    {
        var isValid = null;///这个输入框是否可以通过审核
        var results = this.results[formname] || {}
        var message = null
        for (let i = 0; i < validate.length; i++) {//每个输入框可能有多个限制
            if (!validate[i].validator || validate[i].validator === 'undefined') { continue; }

            var args = validate[i].arguments;
            args = !Array.isArray(args) ? [ args ] : args;
            var clonedArgs = args.slice(0);
            clonedArgs.unshift(value);


            validate[i].message = validate[i].message || '';

            validate[i].nullable = validate[i].nullable || true;

            message = validate[i].message//错误提示信息

            if (typeof validate[i].validator === 'function') {
                isValid = validate[i].validator.apply(null, clonedArgs);
            } else {
                if (typeof validatorjs[validate[i].validator] === 'undefined') {
                    console.warn('GiftedForm Error: Validator is not correct for: '+k);
                    continue;
                }

                if (validate[i].validator === 'isLength') {
                    if (typeof clonedArgs[0] === 'string') {
                        clonedArgs[0] = clonedArgs[0].trim();
                    }
                }

                // Validator ONLY accepts string arguments.
                if (clonedArgs[0] === null || clonedArgs[0] === undefined) {
                    clonedArgs[0] = '';
                } else {
                    clonedArgs[0] = String(clonedArgs[0]);
                }

                isValid = validatorjs[validate[i].validator].apply(null, clonedArgs);
            }
        }
        results[key] = {
            isValid,
            message,
            key,
            value,
            nullable,
        }
        this.onChangeCallback(this.getResult(formname))
    }
    getValueForKey(key,formname){
        var results = this.results[formname]||{}
        var result = results[key]||{}
        return result.value||null
    }
    clearCache(formname){
        this.results[formname] = {}
    }
}
module.exports = new Manager();